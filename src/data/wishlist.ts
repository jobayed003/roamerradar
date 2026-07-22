import { db } from '@/lib/db';
import { ListingItem, ListingMetadata } from '@/types/listing';
import { ListingType, Prisma } from '@prisma/client';
import { userSummarySelect } from '@/data/listing';

function toListingItem(listing: {
  id: string;
  type: ListingType;
  title: string;
  description: string | null;
  location: string | null;
  image: string;
  price: number;
  offerPrice: number | null;
  rating: number;
  reviewCount: number;
  amenities: string[];
  metadata: Prisma.JsonValue;
  isFeatured: boolean;
  isPopular: boolean;
  driveTime: string | null;
  placesCount: number | null;
  owner?: ListingItem['owner'];
}): ListingItem {
  return {
    ...listing,
    metadata: (listing.metadata as ListingMetadata | null) ?? null,
    owner: listing.owner ?? null,
  };
}

export async function getWishlistListings(userId: string): Promise<ListingItem[]> {
  try {
    const items = await db.wishlistItem.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      include: {
        listing: {
          include: { owner: { select: userSummarySelect } },
        },
      },
    });

    return items.map((item) => toListingItem(item.listing));
  } catch (error) {
    console.error('[getWishlistListings]', error);
    return [];
  }
}

export async function isListingWishlisted(userId: string | undefined, listingId: string) {
  if (!userId) return false;

  try {
    const item = await db.wishlistItem.findUnique({
      where: {
        userId_listingId: { userId, listingId },
      },
      select: { id: true },
    });
    return Boolean(item);
  } catch {
    return false;
  }
}
