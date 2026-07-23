import { db } from '@/lib/db';
import { BookingStatus, ListingType } from '@prisma/client';
import { startOfDay } from 'date-fns';

export function dateRangesOverlap(
  aStart: Date,
  aEnd: Date,
  bStart: Date,
  bEnd: Date
) {
  const startA = startOfDay(aStart).getTime();
  const endA = startOfDay(aEnd).getTime();
  const startB = startOfDay(bStart).getTime();
  const endB = startOfDay(bEnd).getTime();

  return startA < endB && startB < endA;
}

export function listingNeedsDateAvailability(type: ListingType) {
  return type === ListingType.STAY || type === ListingType.CAR;
}

const CONFLICT_STATUSES: BookingStatus[] = [BookingStatus.PAID];

export async function findConflictingBooking(input: {
  listingId: string;
  checkIn: Date;
  checkOut: Date;
  excludeBookingId?: string;
}) {
  const candidates = await db.booking.findMany({
    where: {
      listingId: input.listingId,
      status: { in: CONFLICT_STATUSES },
      checkIn: { not: null },
      checkOut: { not: null },
      ...(input.excludeBookingId ? { id: { not: input.excludeBookingId } } : {}),
    },
    select: {
      id: true,
      checkIn: true,
      checkOut: true,
    },
  });

  return (
    candidates.find(
      (booking) =>
        booking.checkIn &&
        booking.checkOut &&
        dateRangesOverlap(input.checkIn, input.checkOut, booking.checkIn, booking.checkOut)
    ) ?? null
  );
}

export const AVAILABILITY_ERROR =
  'Those dates are no longer available. Choose different dates and try again.' as const;
