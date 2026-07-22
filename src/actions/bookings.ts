'use server';

import { db } from '@/lib/db';
import { getStripe, isStripeConfigured } from '@/lib/stripe';
import { CancelBookingSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';
import { BookingStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function cancelBooking(input: unknown) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = CancelBookingSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid booking.' };
  }

  const booking = await db.booking.findFirst({
    where: {
      id: parsed.data.bookingId,
      userId: authResult.user.id,
    },
  });

  if (!booking) {
    return { error: 'Booking not found.' };
  }

  if (booking.status !== BookingStatus.PAID) {
    return { error: 'Only confirmed bookings can be cancelled.' };
  }

  let stripeRefundId: string | null = null;

  if (booking.stripePaymentIntentId && isStripeConfigured()) {
    try {
      const stripe = getStripe();
      const paymentIntent = await stripe.paymentIntents.retrieve(booking.stripePaymentIntentId);

      if (paymentIntent.status === 'succeeded') {
        const refund = await stripe.refunds.create({
          payment_intent: booking.stripePaymentIntentId,
          reason: 'requested_by_customer',
        });
        stripeRefundId = refund.id;
      } else if (
        paymentIntent.status === 'requires_capture' ||
        paymentIntent.status === 'requires_action' ||
        paymentIntent.status === 'requires_confirmation' ||
        paymentIntent.status === 'requires_payment_method'
      ) {
        await stripe.paymentIntents.cancel(booking.stripePaymentIntentId);
      }
    } catch (error) {
      console.error('[cancelBooking] stripe', error);
      return { error: 'Unable to process refund. Try again or contact support.' };
    }
  }

  try {
    await db.booking.update({
      where: { id: booking.id },
      data: {
        status: BookingStatus.CANCELLED,
        cancelledAt: new Date(),
        stripeRefundId,
      },
    });
  } catch {
    return { error: 'Unable to cancel booking.' };
  }

  revalidatePath('/my-bookings');

  return {
    success: stripeRefundId
      ? 'Booking cancelled. Your refund is on the way.'
      : 'Booking cancelled.',
  };
}
