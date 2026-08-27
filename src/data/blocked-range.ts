import { dateRangesOverlap } from '@/lib/booking-availability';
import { db } from '@/lib/db';

export async function getBlockedRangesForListing(listingId: string) {
  return db.listingBlockedRange.findMany({
    where: { listingId },
    orderBy: { startDate: 'asc' },
  });
}

export async function findConflictingBlockedRange(input: {
  listingId: string;
  checkIn: Date;
  checkOut: Date;
}) {
  const ranges = await getBlockedRangesForListing(input.listingId);
  return (
    ranges.find((range) =>
      dateRangesOverlap(input.checkIn, input.checkOut, range.startDate, range.endDate)
    ) ?? null
  );
}

export async function createBlockedRange(input: {
  listingId: string;
  startDate: Date;
  endDate: Date;
  note?: string;
}) {
  return db.listingBlockedRange.create({
    data: {
      listingId: input.listingId,
      startDate: input.startDate,
      endDate: input.endDate,
      note: input.note || null,
    },
  });
}

export async function deleteBlockedRange(id: string, ownerId: string) {
  const range = await db.listingBlockedRange.findFirst({
    where: { id, listing: { ownerId } },
    select: { id: true },
  });

  if (!range) return null;

  await db.listingBlockedRange.delete({ where: { id: range.id } });
  return range;
}
