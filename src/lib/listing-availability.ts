import { db } from '@/lib/db';
import {
  dateRangesOverlap,
  findConflictingBooking,
  listingNeedsDateAvailability,
} from '@/lib/booking-availability';
import { findConflictingBlockedRange } from '@/data/blocked-range';
import { ListingType } from '@prisma/client';

export { dateRangesOverlap, listingNeedsDateAvailability, findConflictingBooking };
export { AVAILABILITY_ERROR } from '@/lib/booking-availability';

export const BLOCKED_DATE_ERROR =
  'Those dates are blocked by the host. Choose different dates and try again.' as const;

export async function assertListingDatesAvailable(input: {
  listingId: string;
  listingType: ListingType;
  checkIn: Date;
  checkOut: Date;
  excludeBookingId?: string;
}) {
  if (!listingNeedsDateAvailability(input.listingType)) {
    return { ok: true as const };
  }

  const blocked = await findConflictingBlockedRange({
    listingId: input.listingId,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
  });

  if (blocked) {
    return { ok: false as const, error: BLOCKED_DATE_ERROR };
  }

  const booking = await findConflictingBooking({
    listingId: input.listingId,
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    excludeBookingId: input.excludeBookingId,
  });

  if (booking) {
    return {
      ok: false as const,
      error: 'Those dates are no longer available. Choose different dates and try again.' as const,
    };
  }

  return { ok: true as const };
}

export async function getUnavailableRangesForListing(listingId: string) {
  const [blocked, bookings] = await Promise.all([
    db.listingBlockedRange.findMany({
      where: { listingId },
      select: { startDate: true, endDate: true, note: true },
      orderBy: { startDate: 'asc' },
    }),
    db.booking.findMany({
      where: {
        listingId,
        status: 'PAID',
        checkIn: { not: null },
        checkOut: { not: null },
      },
      select: { checkIn: true, checkOut: true },
    }),
  ]);

  return {
    blocked: blocked.map((range) => ({
      startDate: range.startDate.toISOString(),
      endDate: range.endDate.toISOString(),
      note: range.note,
      kind: 'blocked' as const,
    })),
    booked: bookings
      .filter((booking) => booking.checkIn && booking.checkOut)
      .map((booking) => ({
        startDate: booking.checkIn!.toISOString(),
        endDate: booking.checkOut!.toISOString(),
        kind: 'booked' as const,
      })),
  };
}
