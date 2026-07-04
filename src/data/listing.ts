import { getFlightOfferById } from '@/data/flights';
import { db } from '@/lib/db';
import type { ReviewItem, UserSummary } from '@/types/review';
import { ListingItem, ListingMetadata } from '@/types/listing';
import { ListingType, Prisma } from '@prisma/client';

export const userSummarySelect = {
  id: true,
  displayName: true,
  name: true,
  realName: true,
  image: true,
  bio: true,
  website: true,
} as const;

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
  ownerId: string | null;
  owner?: UserSummary | null;
}): ListingItem {
  return {
    ...listing,
    metadata: (listing.metadata as ListingMetadata | null) ?? null,
    owner: listing.owner ?? null,
  };
}

const stayListingFilter = {
  placesCount: null,
} as const;

const nearbyDestinationFilter = {
  placesCount: { not: null },
} as const;

export async function getListingsByType(type: ListingType, location?: string) {
  try {
    const listings = await db.listing.findMany({
      where: {
        type,
        ...(type === ListingType.STAY ? stayListingFilter : {}),
        ...(location ? { location } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    return listings.map(toListingItem);
  } catch (error) {
    console.error('[getListingsByType]', error);
    return [];
  }
}

export async function getNearbyDestinations() {
  try {
    const listings = await db.listing.findMany({
      where: {
        type: ListingType.STAY,
        ...nearbyDestinationFilter,
      },
      orderBy: { placesCount: 'asc' },
    });

    return listings.map(toListingItem);
  } catch (error) {
    console.error('[getNearbyDestinations]', error);
    return [];
  }
}

export async function getListingById(id: string) {
  const flightOffer = await getFlightOfferById(id);
  if (flightOffer) {
    return flightOffer;
  }

  try {
    const listing = await db.listing.findUnique({
      where: { id },
      include: { owner: { select: userSummarySelect } },
    });
    return listing ? toListingItem(listing) : null;
  } catch {
    return null;
  }
}

export async function getListingCountByType(type: ListingType, location?: string) {
  try {
    return await db.listing.count({
      where: {
        type,
        ...(type === ListingType.STAY ? stayListingFilter : {}),
        ...(location ? { location } : {}),
      },
    });
  } catch (error) {
    console.error('[getListingCountByType]', error);
    return 0;
  }
}
