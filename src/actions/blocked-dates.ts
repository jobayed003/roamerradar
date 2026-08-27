'use server';

import { createBlockedRange, deleteBlockedRange, getBlockedRangesForListing } from '@/data/blocked-range';
import { parseBookingDate } from '@/lib/booking-pricing';
import { getUnavailableRangesForListing } from '@/lib/listing-availability';
import { db } from '@/lib/db';
import { requireAuth } from '@/server/auth/require-auth';
import { ListingType } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const CreateBlockedRangeSchema = z.object({
  listingId: z.string().cuid(),
  startDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  endDate: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  note: z.string().trim().max(200).optional(),
});

async function requireOwnedStayOrCar(userId: string, listingId: string) {
  return db.listing.findFirst({
    where: {
      id: listingId,
      ownerId: userId,
      type: { in: [ListingType.STAY, ListingType.CAR] },
      placesCount: null,
    },
    select: { id: true, title: true, type: true },
  });
}

export async function fetchListingCalendar(listingId: string) {
  const authResult = await requireAuth();
  if (!authResult.ok) return { error: authResult.error };

  const listing = await requireOwnedStayOrCar(authResult.user.id, listingId);
  if (!listing) return { error: 'Listing not found.' };

  const ranges = await getUnavailableRangesForListing(listingId);
  const blocked = await getBlockedRangesForListing(listingId);

  return {
    listing,
    ranges,
    blocked: blocked.map((item) => ({
      id: item.id,
      startDate: item.startDate.toISOString().slice(0, 10),
      endDate: item.endDate.toISOString().slice(0, 10),
      note: item.note,
    })),
  };
}

export async function addBlockedDates(input: unknown) {
  const authResult = await requireAuth();
  if (!authResult.ok) return { error: authResult.error };

  const parsed = CreateBlockedRangeSchema.safeParse(input);
  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid dates.' };
  }

  const listing = await requireOwnedStayOrCar(authResult.user.id, parsed.data.listingId);
  if (!listing) return { error: 'Listing not found.' };

  const startDate = parseBookingDate(parsed.data.startDate);
  const endDate = parseBookingDate(parsed.data.endDate);
  if (!startDate || !endDate || endDate <= startDate) {
    return { error: 'End date must be after start date.' };
  }

  await createBlockedRange({
    listingId: listing.id,
    startDate,
    endDate,
    note: parsed.data.note,
  });

  revalidatePath(`/list-property/calendar`);
  revalidatePath(`/stays-product/${listing.id}`);
  revalidatePath(`/cars-product/${listing.id}`);

  return { success: 'Dates blocked.' };
}

export async function removeBlockedDates(blockedRangeId: string) {
  const authResult = await requireAuth();
  if (!authResult.ok) return { error: authResult.error };

  const removed = await deleteBlockedRange(blockedRangeId, authResult.user.id);
  if (!removed) return { error: 'Blocked range not found.' };

  revalidatePath(`/list-property/calendar`);
  return { success: 'Blocked dates removed.' };
}
