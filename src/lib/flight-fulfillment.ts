import { getFlightOfferRecord } from '@/data/flights';
import { db } from '@/lib/db';
import {
  createDuffelTestHoldOrder,
  parseCachedDuffelOffer,
  type FlightPassengerInput,
} from '@/lib/duffel';
import { isDuffelTestMode } from '@/env';
import { Prisma } from '@prisma/client';

export type DuffelFulfillmentStatus =
  | 'test_hold'
  | 'skipped_demo'
  | 'blocked_live'
  | 'missing_passengers'
  | 'error'
  | 'already_fulfilled';

function asPassengerDetails(value: unknown): FlightPassengerInput[] | null {
  if (!Array.isArray(value) || value.length === 0) return null;

  const passengers: FlightPassengerInput[] = [];

  for (const item of value) {
    if (!item || typeof item !== 'object') return null;
    const passenger = item as Partial<FlightPassengerInput>;
    if (
      typeof passenger.id !== 'string' ||
      typeof passenger.title !== 'string' ||
      typeof passenger.givenName !== 'string' ||
      typeof passenger.familyName !== 'string' ||
      typeof passenger.email !== 'string' ||
      typeof passenger.phoneNumber !== 'string' ||
      typeof passenger.bornOn !== 'string' ||
      (passenger.gender !== 'm' && passenger.gender !== 'f')
    ) {
      return null;
    }

    passengers.push({
      id: passenger.id,
      title: passenger.title as FlightPassengerInput['title'],
      givenName: passenger.givenName,
      familyName: passenger.familyName,
      email: passenger.email,
      phoneNumber: passenger.phoneNumber,
      bornOn: passenger.bornOn,
      gender: passenger.gender,
    });
  }

  return passengers;
}

async function markFulfillment(
  bookingId: string,
  data: {
    status: DuffelFulfillmentStatus;
    duffelOrderId?: string | null;
    duffelBookingReference?: string | null;
  }
) {
  await db.booking.update({
    where: { id: bookingId },
    data: {
      duffelFulfillmentStatus: data.status,
      ...(data.duffelOrderId !== undefined ? { duffelOrderId: data.duffelOrderId } : {}),
      ...(data.duffelBookingReference !== undefined
        ? { duffelBookingReference: data.duffelBookingReference }
        : {}),
    },
  });
}

/**
 * After Stripe succeeds, create a Duffel sandbox hold for flight bookings.
 * Never creates live airline tickets — live tokens and live_mode offers are blocked.
 */
export async function fulfillFlightBookingIfNeeded(bookingId: string) {
  const booking = await db.booking.findUnique({
    where: { id: bookingId },
    select: {
      id: true,
      flightOfferId: true,
      duffelOrderId: true,
      duffelFulfillmentStatus: true,
      passengerDetails: true,
    },
  });

  if (!booking?.flightOfferId) {
    return { status: 'skipped_demo' as const };
  }

  if (booking.duffelOrderId || booking.duffelFulfillmentStatus === 'test_hold') {
    return { status: 'already_fulfilled' as const };
  }

  const flightOffer = await getFlightOfferRecord(booking.flightOfferId);
  const offer = parseCachedDuffelOffer(flightOffer?.offerData);

  if (!offer) {
    await markFulfillment(booking.id, { status: 'skipped_demo' });
    return { status: 'skipped_demo' as const };
  }

  if (!isDuffelTestMode() || offer.live_mode === true) {
    await markFulfillment(booking.id, { status: 'blocked_live' });
    return { status: 'blocked_live' as const };
  }

  const passengers = asPassengerDetails(booking.passengerDetails);
  if (!passengers) {
    await markFulfillment(booking.id, { status: 'missing_passengers' });
    return { status: 'missing_passengers' as const };
  }

  try {
    const order = await createDuffelTestHoldOrder({
      offerId: offer.id,
      passengers,
    });

    await markFulfillment(booking.id, {
      status: 'test_hold',
      duffelOrderId: order.orderId,
      duffelBookingReference: order.bookingReference,
    });

    return {
      status: 'test_hold' as const,
      orderId: order.orderId,
      bookingReference: order.bookingReference,
    };
  } catch (error) {
    console.error('[fulfillFlightBookingIfNeeded]', error);
    await markFulfillment(booking.id, { status: 'error' }).catch(() => undefined);
    return {
      status: 'error' as const,
      message: error instanceof Error ? error.message : 'Duffel test order failed.',
    };
  }
}

export function passengerDetailsToJson(
  passengers: FlightPassengerInput[]
): Prisma.InputJsonValue {
  return passengers as unknown as Prisma.InputJsonValue;
}
