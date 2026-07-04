import { getFlightOfferRecord } from '@/data/flights';
import { getListingById } from '@/data/listing';
import { getOrCreateStripeCustomer } from '@/lib/stripe-customer';
import { getStripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { BookingStatus } from '@prisma/client';

export async function startCheckout(userId: string, itemId: string, guests: number = 1) {
  const flightOffer = await getFlightOfferRecord(itemId);
  const listing = flightOffer ? null : await getListingById(itemId);

  if (!flightOffer && !listing) {
    return { error: 'Listing not found.' as const };
  }

  const amountValue = flightOffer?.price ?? listing?.offerPrice ?? listing?.price ?? 0;
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
