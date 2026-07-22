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
import { Booking, BookingStatus, ListingType } from '@prisma/client';
import Stripe from 'stripe';

export type StartCheckoutOptions = {
  guests?: number;
  checkIn?: string;
  checkOut?: string;
};

type CheckoutSuccess = {
  clientSecret: string;
  bookingId: string;
  amount: number;
  listingTitle: string;
  listingImage: string;
  guests: number;
  checkIn: string | null;
  checkOut: string | null;
  nights: number | null;
};

const PENDING_REUSE_WINDOW_MS = 60 * 60 * 1000;

const REUSABLE_PI_STATUSES = new Set<Stripe.PaymentIntent.Status>([
  'requires_payment_method',
  'requires_confirmation',
  'requires_action',
]);

function sameCalendarDay(a: Date | null | undefined, b: Date | null | undefined) {
  if (!a && !b) return true;
  if (!a || !b) return false;
  return a.toISOString().slice(0, 10) === b.toISOString().slice(0, 10);
}

function toCheckoutResult(
  booking: Booking,
  clientSecret: string,
  nights: number | null
): CheckoutSuccess {
  return {
    clientSecret,
    bookingId: booking.id,
    amount: booking.amount,
    listingTitle: booking.title,
    listingImage: booking.image ?? '',
    guests: booking.guests,
    checkIn: booking.checkIn?.toISOString() ?? null,
    checkOut: booking.checkOut?.toISOString() ?? null,
    nights,
  };
}

async function findReusablePendingBooking(input: {
  userId: string;
  listingId?: string | null;
  flightOfferId?: string | null;
  guests: number;
  checkIn?: Date;
  checkOut?: Date;
  amount: number;
}) {
  const since = new Date(Date.now() - PENDING_REUSE_WINDOW_MS);

  const candidates = await db.booking.findMany({
    where: {
      userId: input.userId,
      status: BookingStatus.PENDING,
      createdAt: { gte: since },
      guests: input.guests,
      ...(input.flightOfferId
        ? { flightOfferId: input.flightOfferId }
        : { listingId: input.listingId ?? undefined }),
    },
    orderBy: { createdAt: 'desc' },
    take: 5,
  });

  return (
    candidates.find(
      (booking) =>
        Math.abs(booking.amount - input.amount) < 0.01 &&
        sameCalendarDay(booking.checkIn, input.checkIn) &&
        sameCalendarDay(booking.checkOut, input.checkOut)
    ) ?? null
  );
}

async function markBookingFailed(bookingId: string) {
  await db.booking
    .update({
      where: { id: bookingId },
      data: { status: BookingStatus.FAILED },
    })
    .catch(() => undefined);
}

async function cancelOpenPaymentIntent(paymentIntentId: string) {
  try {
    const stripe = getStripe();
    const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId);
    if (REUSABLE_PI_STATUSES.has(paymentIntent.status) || paymentIntent.status === 'requires_capture') {
      await stripe.paymentIntents.cancel(paymentIntentId).catch(() => undefined);
    }
  } catch {
    // Best-effort cleanup only.
  }
}

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

  const existing = await findReusablePendingBooking({
    userId,
    listingId: listing?.id,
    flightOfferId: flightOffer?.id,
    guests,
    checkIn,
    checkOut,
    amount: amount / 100,
  });

  if (existing?.stripePaymentIntentId) {
    try {
      const paymentIntent = await getStripe().paymentIntents.retrieve(existing.stripePaymentIntentId);

      if (paymentIntent.status === 'succeeded') {
        await db.booking.update({
          where: { id: existing.id },
          data: { status: BookingStatus.PAID },
        });
      } else if (REUSABLE_PI_STATUSES.has(paymentIntent.status) && paymentIntent.client_secret) {
        if (paymentIntent.amount === amount && paymentIntent.currency === currency) {
          return toCheckoutResult(existing, paymentIntent.client_secret, nights ?? null);
        }

        await cancelOpenPaymentIntent(existing.stripePaymentIntentId);
        await markBookingFailed(existing.id);
      } else {
        await markBookingFailed(existing.id);
      }
    } catch {
      await markBookingFailed(existing.id);
    }
  } else if (existing) {
    await markBookingFailed(existing.id);
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

  try {
    const paymentIntent = await getStripe().paymentIntents.create(
      {
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
      },
      {
        idempotencyKey: `checkout:${userId}:${itemId}:${booking.id}`,
      }
    );

    await db.booking.update({
      where: { id: booking.id },
      data: { stripePaymentIntentId: paymentIntent.id },
    });

    return toCheckoutResult(
      { ...booking, stripePaymentIntentId: paymentIntent.id },
      paymentIntent.client_secret!,
      nights ?? null
    );
  } catch (error) {
    await markBookingFailed(booking.id);
    throw error;
  }
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
