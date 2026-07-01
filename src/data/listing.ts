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

export async function getListingsByType(type: ListingType, location?: string) {
  try {
    const listings = await db.listing.findMany({
      where: {
        type,
        ...(type === ListingType.STAY ? { placesCount: null } : {}),
        ...(location ? { location } : {}),
      },
      orderBy: { createdAt: 'desc' },
    });

    return listings.map(toListingItem);
  } catch {
    return [];
  }
}

export async function getNearbyDestinations() {
  try {
    const listings = await db.listing.findMany({
      where: {
        type: ListingType.STAY,
        placesCount: { not: null },
      },
      orderBy: { placesCount: 'asc' },
    });

    return listings.map(toListingItem);
  } catch {
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

export async function getListingCountByType(type: ListingType) {
  try {
    return await db.listing.count({
      where: {
        type,
        ...(type === ListingType.STAY ? { placesCount: null } : {}),
      },
    });
  } catch {
    return 0;
  }
}
