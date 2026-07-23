import { env } from '@/env';
import {
  findConflictingBooking,
  listingNeedsDateAvailability,
} from '@/lib/booking-availability';
import { db } from '@/lib/db';
import { notifyGuestOfBookingConfirmation } from '@/lib/notification-delivery';
import { getStripe } from '@/lib/stripe';
import { BookingStatus, ListingType } from '@prisma/client';
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
      const booking = await db.booking.findFirst({
        where: {
          id: bookingId,
          stripePaymentIntentId: paymentIntent.id,
          status: { not: BookingStatus.PAID },
        },
        include: { listing: { select: { type: true } } },
      });

      if (booking) {
        let markFailed = false;

        if (
          booking.listingId &&
          booking.checkIn &&
          booking.checkOut &&
          booking.listing &&
          listingNeedsDateAvailability(booking.listing.type as ListingType)
        ) {
          const conflict = await findConflictingBooking({
            listingId: booking.listingId,
            checkIn: booking.checkIn,
            checkOut: booking.checkOut,
            excludeBookingId: booking.id,
          });
          markFailed = Boolean(conflict);
        }

        await db.booking.update({
          where: { id: booking.id },
          data: { status: markFailed ? BookingStatus.FAILED : BookingStatus.PAID },
        });

        if (!markFailed) {
          void notifyGuestOfBookingConfirmation(booking.id);
        }
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
