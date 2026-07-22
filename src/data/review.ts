import { db } from '@/lib/db';
import type { ListingContext, ReviewItem } from '@/types/review';
import { userSummarySelect } from '@/data/listing';
import { BookingStatus } from '@prisma/client';

export async function getReviewsByListingId(listingId: string): Promise<ReviewItem[]> {
  try {
    const reviews = await db.review.findMany({
      where: { listingId },
      include: { user: { select: userSummarySelect } },
      orderBy: { createdAt: 'desc' },
    });

    return reviews;
  } catch {
    return [];
  }
}

export async function canUserReviewListing(userId: string | undefined, listingId: string) {
  if (!userId) return false;

  try {
    const [paidBooking, existingReview, listing] = await Promise.all([
      db.booking.findFirst({
        where: { userId, listingId, status: BookingStatus.PAID },
        select: { id: true },
      }),
      db.review.findFirst({
        where: { userId, listingId },
        select: { id: true },
      }),
      db.listing.findUnique({
        where: { id: listingId },
        select: { ownerId: true },
      }),
    ]);

    if (!paidBooking || existingReview) return false;
    if (listing?.ownerId === userId) return false;
    return true;
  } catch {
    return false;
  }
}

export type ProfileReviewItem = ReviewItem & {
  listing: ListingContext;
};

export async function getReviewsByUserId(userId: string): Promise<ProfileReviewItem[]> {
  try {
    const reviews = await db.review.findMany({
      where: { userId },
      include: {
        user: { select: userSummarySelect },
        listing: { select: { id: true, title: true, type: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return reviews;
  } catch {
    return [];
  }
}

/** Reviews left on listings owned by this user. */
export async function getReviewsAboutHost(hostId: string): Promise<ProfileReviewItem[]> {
  try {
    const reviews = await db.review.findMany({
      where: { listing: { ownerId: hostId } },
      include: {
        user: { select: userSummarySelect },
        listing: { select: { id: true, title: true, type: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return reviews;
  } catch {
    return [];
  }
}
