'use server';

import { getListingProductPath } from '@/lib/listing-filters';
import { db } from '@/lib/db';
import { CreateListingSchema, ListingMetadataSchema, UpdateListingSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';
import { ListingType, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const MAX_IMAGE_LENGTH = 3_000_000;

function validateImages(images: string[]) {
  for (const image of images) {
    if (image.startsWith('data:image/') && image.length > MAX_IMAGE_LENGTH) {
      return 'One of the photos is too large. Try a smaller image.';
    }
  }
  return null;
}

function listingWriteFields(data: {
  type: 'STAY' | 'CAR' | 'EXPERIENCE';
  title: string;
  description: string;
  location: string;
  price: number;
  discountPercent: number;
  amenities: string[];
  bedrooms: number;
  livingRooms: number;
  kitchens: number;
  transmission: 'automatic' | 'manual';
  vehicleClass: 'suv' | 'economy' | 'sedan' | 'van';
  categories: string[];
  durationHours: number;
  capacity: number;
  images: string[];
}) {
  const amenities = data.amenities.map((item) => item.trim()).filter(Boolean);
  const discountPercent = data.discountPercent ?? 0;
  const offerPrice =
    discountPercent > 0 ? Math.round(data.price * (1 - discountPercent / 100) * 100) / 100 : null;

  const metadata =
    data.type === 'STAY'
      ? ListingMetadataSchema.parse({
          bedrooms: data.bedrooms,
          livingRooms: data.livingRooms,
          kitchens: data.kitchens,
          stayKind: 'entire',
          gallery: data.images.slice(1),
        })
      : data.type === 'CAR'
        ? ListingMetadataSchema.parse({
            transmission: data.transmission,
            vehicleClass: data.vehicleClass,
            gallery: data.images.slice(1),
          })
        : ListingMetadataSchema.parse({
            categories: data.categories.length > 0 ? data.categories : ['Sightseeing'],
            durationHours: data.durationHours,
            capacity: data.capacity,
            gallery: data.images.slice(1),
          });

  const typeAmenities =
    data.type === 'CAR'
      ? Array.from(
          new Set([
            ...amenities,
            data.transmission === 'automatic' ? 'Automatic' : 'Manual',
            data.vehicleClass.toUpperCase() === 'SUV' ? 'SUV' : data.vehicleClass[0].toUpperCase() + data.vehicleClass.slice(1),
          ])
        )
      : data.type === 'EXPERIENCE'
        ? Array.from(
            new Set([
              ...amenities,
              ...data.categories,
              `${data.durationHours} hours`,
              `Up to ${data.capacity} people`,
            ])
          )
        : amenities;

  return {
    title: data.title,
    description: data.description || null,
    location: data.location,
    image: data.images[0],
    price: data.price,
    offerPrice,
    amenities: typeAmenities.slice(0, 8),
    metadata: metadata as Prisma.InputJsonValue,
  };
}

function revalidateListingPaths(userId: string, listingId: string, type: ListingType) {
  revalidatePath('/stays-category');
  revalidatePath('/cars-category');
  revalidatePath('/things-category');
  revalidatePath(`/profile/${userId}`);
  revalidatePath(getListingProductPath(type, listingId));
  revalidatePath('/list-property');
}

export async function createListing(input: unknown) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = CreateListingSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid listing details.' };
  }

  const data = parsed.data;
  const imageError = validateImages(data.images);
  if (imageError) {
    return { error: imageError };
  }

  const type = ListingType[data.type];

  try {
    const listing = await db.listing.create({
      data: {
        type,
        placesCount: null,
        rating: 0,
        reviewCount: 0,
        ownerId: authResult.user.id,
        ...listingWriteFields(data),
      },
    });

    if (data.shareOnProfile) {
      await db.post.create({
        data: {
          authorId: authResult.user.id,
          body: `Listed: ${listing.title}`,
          image: listing.image,
          listingId: listing.id,
        },
      });
    }

    revalidateListingPaths(authResult.user.id, listing.id, type);

    return {
      success: 'Listing published.',
      listingId: listing.id,
      productPath: getListingProductPath(type, listing.id),
    };
  } catch {
    return { error: 'Unable to create listing.' };
  }
}

export async function updateListing(input: unknown) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = UpdateListingSchema.safeParse(input);

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid listing details.' };
  }

  const data = parsed.data;
  const imageError = validateImages(data.images);
  if (imageError) {
    return { error: imageError };
  }

  const existing = await db.listing.findFirst({
    where: {
      id: data.listingId,
      ownerId: authResult.user.id,
      type: { in: [ListingType.STAY, ListingType.CAR, ListingType.EXPERIENCE] },
    },
    select: { id: true, type: true },
  });

  if (!existing) {
    return { error: 'Listing not found.' };
  }

  // Keep the listing type stable on edit; ignore payload type mismatches.
  const typeKey =
    existing.type === ListingType.CAR
      ? 'CAR'
      : existing.type === ListingType.EXPERIENCE
        ? 'EXPERIENCE'
        : 'STAY';

  try {
    const listing = await db.listing.update({
      where: { id: existing.id },
      data: listingWriteFields({ ...data, type: typeKey }),
    });

    revalidateListingPaths(authResult.user.id, listing.id, existing.type);

    return {
      success: 'Listing updated.',
      listingId: listing.id,
      productPath: getListingProductPath(existing.type, listing.id),
    };
  } catch {
    return { error: 'Unable to update listing.' };
  }
}

export async function deleteListing(listingId: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  if (!listingId) {
    return { error: 'Invalid listing.' };
  }

  const existing = await db.listing.findFirst({
    where: { id: listingId, ownerId: authResult.user.id },
    select: { id: true, type: true },
  });

  if (!existing) {
    return { error: 'Listing not found.' };
  }

  try {
    await db.listing.delete({ where: { id: existing.id } });
    revalidateListingPaths(authResult.user.id, existing.id, existing.type);
    return { success: 'Listing deleted.' };
  } catch {
    return { error: 'Unable to delete listing.' };
  }
}
