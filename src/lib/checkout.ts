import { getFlightOfferRecord, isFlightOfferBookable } from '@/data/flights';
import { getListingById } from '@/data/listing';
import {
  calculateStayPricing,
  ensureStayDateRange,
  parseBookingDate,
} from '@/lib/booking-pricing';
import { db } from '@/lib/db';
import { getOrCreateStripeCustomer } from '@/lib/stripe-customer';
import { getStripe } from '@/lib/stripe';
import { BookingStatus, ListingType } from '@prisma/client';

export type StartCheckoutOptions = {
  guests?: number;
  checkIn?: string;
  checkOut?: string;
};

export async function startCheckout(userId: string, itemId: string, options: StartCheckoutOptions = {}) {
  const guests = Math.max(1, options.guests ?? 1);
  const flightOffer = await getFlightOfferRecord(itemId);
  const listing = flightOffer ? null : await getListingById(itemId);

  if (!flightOffer && !listing) {
    return { error: 'Listing not found.' as const };
  }

  if (flightOffer && !isFlightOfferBookable(flightOffer.expiresAt)) {
    return {
      error: 'This fare has expired. Search again for current prices.' as const,
    };
  }

  const checkInDate = parseBookingDate(options.checkIn);
  const checkOutDate = parseBookingDate(options.checkOut);

  let amountValue = 0;
  let checkIn: Date | undefined;
  let checkOut: Date | undefined;
  let nights: number | undefined;

  if (flightOffer) {
    amountValue = flightOffer.price;
    // Optional travel date for flights (departure)
    checkIn = checkInDate;
    checkOut = checkOutDate;
  } else if (listing) {
    const nightlyRate = listing.offerPrice ?? listing.price;

    if (listing.type === ListingType.FLIGHT) {
      amountValue = nightlyRate;
      checkIn = checkInDate;
      checkOut = checkOutDate;
    } else if (listing.type === ListingType.EXPERIENCE) {
      const range = ensureStayDateRange(checkInDate, checkOutDate ?? checkInDate);
      checkIn = range.checkIn;
      checkOut = range.checkIn;
      nights = 1;
      amountValue = Math.round(nightlyRate * guests * 100) / 100;
    } else {
      // STAY and CAR: price per night × nights
      const pricing = calculateStayPricing({
        nightlyRate,
        checkIn: checkInDate ?? new Date(),
        checkOut: checkOutDate ?? new Date(),
      });
      amountValue = pricing.total;
      checkIn = pricing.checkIn;
      checkOut = pricing.checkOut;
      nights = pricing.nights;
    }
  }

  const amount = Math.round(amountValue * 100);
  const currency = (flightOffer?.currency ?? 'usd').toLowerCase();
  const title = flightOffer?.title ?? listing!.title;
  const image = flightOffer?.image ?? listing!.image;

  if (amount <= 0) {
    return { error: 'Invalid listing price.' as const };
  }

  const customerId = await getOrCreateStripeCustomer(userId);

  const booking = await db.booking.create({
    data: {
      userId,
      flightOfferId: flightOffer?.id,
      listingId: listing?.id,
      amount: amount / 100,
      currency: currency.toUpperCase(),
      guests,
      checkIn: checkIn ?? null,
      checkOut: checkOut ?? null,
      status: BookingStatus.PENDING,
      title,
      image,
    },
  });

  const paymentIntent = await getStripe().paymentIntents.create({
    amount,
    currency,
    customer: customerId,
    automatic_payment_methods: { enabled: true },
    metadata: {
      bookingId: booking.id,
      itemId,
      userId,
      type: flightOffer ? 'flight' : 'listing',
      guests: String(guests),
      ...(checkIn ? { checkIn: checkIn.toISOString().slice(0, 10) } : {}),
      ...(checkOut ? { checkOut: checkOut.toISOString().slice(0, 10) } : {}),
      ...(nights ? { nights: String(nights) } : {}),
    },
  });

  await db.booking.update({
    where: { id: booking.id },
    data: { stripePaymentIntentId: paymentIntent.id },
  });

  return {
    clientSecret: paymentIntent.client_secret!,
    bookingId: booking.id,
    amount: amount / 100,
    listingTitle: title,
    listingImage: image,
    guests,
    checkIn: checkIn?.toISOString() ?? null,
    checkOut: checkOut?.toISOString() ?? null,
    nights: nights ?? null,
  };
}

export async function finalizeCheckout(userId: string, bookingId: string) {
  const booking = await db.booking.findFirst({
    where: { id: bookingId, userId },
  });

  if (!booking?.stripePaymentIntentId) {
    return { error: 'Booking not found.' as const };
  }

  const paymentIntent = await getStripe().paymentIntents.retrieve(booking.stripePaymentIntentId);

  if (paymentIntent.status === 'succeeded') {
    await db.booking.update({
      where: { id: booking.id },
      data: { status: BookingStatus.PAID },
    });

    return { success: 'Payment successful! Your booking is confirmed.', bookingId: booking.id };
  }

  if (paymentIntent.status === 'processing') {
    return { success: 'Payment is processing. We will confirm your booking shortly.' };
  }

  await db.booking.update({
    where: { id: booking.id },
    data: { status: BookingStatus.FAILED },
  });

  return { error: 'Payment was not completed.' as const };
}
