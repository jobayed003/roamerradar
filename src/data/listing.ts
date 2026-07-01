import { ListingType, Prisma } from '@prisma/client';
import { db } from '@/lib/db';
import { ListingItem, ListingMetadata } from '@/types/listing';

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
}): ListingItem {
  return {
    ...listing,
    metadata: (listing.metadata as ListingMetadata | null) ?? null,
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
  try {
    const listing = await db.listing.findUnique({ where: { id } });
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
