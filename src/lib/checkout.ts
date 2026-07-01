import { getListingById } from '@/data/listing';
import { getOrCreateStripeCustomer } from '@/lib/stripe-customer';
import { getStripe } from '@/lib/stripe';
import { db } from '@/lib/db';
import { BookingStatus } from '@prisma/client';

export async function startCheckout(userId: string, listingId: string, guests: number = 1) {
  const listing = await getListingById(listingId);

  if (!listing) {
    return { error: 'Listing not found.' as const };
  }

  const amount = Math.round((listing.offerPrice ?? listing.price) * 100);

  if (amount <= 0) {
    return { error: 'Invalid listing price.' as const };
  }

  const customerId = await getOrCreateStripeCustomer(userId);

  const booking = await db.booking.create({
    data: {
      userId,
      listingId: listing.id,
      amount: amount / 100,
      guests,
      status: BookingStatus.PENDING,
    },
  });

  const paymentIntent = await getStripe().paymentIntents.create({
    amount,
    currency: 'usd',
    customer: customerId,
    automatic_payment_methods: { enabled: true },
    metadata: {
      bookingId: booking.id,
      listingId: listing.id,
      userId,
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
    listingTitle: listing.title,
    listingImage: listing.image,
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
