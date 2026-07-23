import { env } from '@/env';
import { db } from '@/lib/db';
import { notifyGuestOfBookingConfirmation } from '@/lib/notification-delivery';
import { getStripe } from '@/lib/stripe';
import { BookingStatus } from '@prisma/client';
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import Stripe from 'stripe';

export async function POST(req: Request) {
  const body = await req.text();
  const signature = headers().get('stripe-signature');

  if (!signature || !env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 400 });
  }

  let event: Stripe.Event;

  try {
    event = getStripe().webhooks.constructEvent(body, signature, env.STRIPE_WEBHOOK_SECRET);
  } catch {
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const bookingId = paymentIntent.metadata.bookingId;

    if (bookingId) {
      const result = await db.booking.updateMany({
        where: {
          id: bookingId,
          stripePaymentIntentId: paymentIntent.id,
          status: { not: BookingStatus.PAID },
        },
        data: { status: BookingStatus.PAID },
      });

      if (result.count > 0) {
        void notifyGuestOfBookingConfirmation(bookingId);
      }
    }
  }

  if (event.type === 'payment_intent.payment_failed') {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const bookingId = paymentIntent.metadata.bookingId;

    if (bookingId) {
      await db.booking.updateMany({
        where: { id: bookingId, stripePaymentIntentId: paymentIntent.id },
        data: { status: BookingStatus.FAILED },
      });
    }
  }

  return NextResponse.json({ received: true });
}
