'use server';

import { db } from '@/lib/db';
import { CreateReviewSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';
import { BookingStatus } from '@prisma/client';
import { revalidatePath } from 'next/cache';

export async function createReview(input: unknown) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: 'Sign in to leave a review.' };
  }

  const parsed = CreateReviewSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid review.' };
  }

  const { listingId, rating, body } = parsed.data;
  const userId = authResult.user.id;

  const listing = await db.listing.findUnique({
    where: { id: listingId },
    select: { id: true, ownerId: true, type: true },
  });

  if (!listing) {
    return { error: 'Listing not found.' };
  }

  if (listing.ownerId === userId) {
    return { error: 'You cannot review your own listing.' };
  }

  const paidBooking = await db.booking.findFirst({
    where: {
      userId,
      listingId,
      status: BookingStatus.PAID,
    },
    select: { id: true },
  });

  if (!paidBooking) {
    return { error: 'Book this listing before leaving a review.' };
  }

  const existing = await db.review.findFirst({
    where: { userId, listingId },
    select: { id: true },
  });

  if (existing) {
    return { error: 'You already reviewed this listing.' };
  }

  try {
    await db.review.create({
      data: { userId, listingId, rating, body },
    });

    const aggregate = await db.review.aggregate({
      where: { listingId },
      _avg: { rating: true },
      _count: { rating: true },
    });

    await db.listing.update({
      where: { id: listingId },
      data: {
        rating: Math.round((aggregate._avg.rating ?? rating) * 10) / 10,
        reviewCount: aggregate._count.rating,
      },
    });
  } catch {
    return { error: 'Unable to post review.' };
  }

  revalidatePath(`/stays-product/${listingId}`);
  revalidatePath(`/cars-product/${listingId}`);
  revalidatePath(`/things-product/${listingId}`);
  if (listing.ownerId) {
    revalidatePath(`/profile/${listing.ownerId}`);
  }
  revalidatePath(`/profile/${userId}`);

  return { success: 'Review posted.' };
}
