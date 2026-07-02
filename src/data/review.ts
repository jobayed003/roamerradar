import { db } from '@/lib/db';
import type { ReviewItem } from '@/types/review';
import { userSummarySelect } from '@/data/listing';

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
