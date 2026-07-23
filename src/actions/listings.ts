'use server';

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
  title: string;
  description: string;
  location: string;
  price: number;
  discountPercent: number;
  amenities: string[];
  bedrooms: number;
  livingRooms: number;
  kitchens: number;
  images: string[];
}) {
  const amenities = data.amenities.map((item) => item.trim()).filter(Boolean);
  const discountPercent = data.discountPercent ?? 0;
  const offerPrice =
    discountPercent > 0 ? Math.round(data.price * (1 - discountPercent / 100) * 100) / 100 : null;

  return {
    title: data.title,
    description: data.description || null,
    location: data.location,
    image: data.images[0],
    price: data.price,
    offerPrice,
    amenities,
    metadata: ListingMetadataSchema.parse({
      bedrooms: data.bedrooms,
      livingRooms: data.livingRooms,
      kitchens: data.kitchens,
      gallery: data.images.slice(1),
    }) as Prisma.InputJsonValue,
  };
}

function revalidateListingPaths(userId: string, listingId: string) {
  revalidatePath('/stays-category');
  revalidatePath(`/profile/${userId}`);
  revalidatePath(`/stays-product/${listingId}`);
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

  try {
    const listing = await db.listing.create({
      data: {
        type: ListingType.STAY,
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

    revalidateListingPaths(authResult.user.id, listing.id);

    return { success: 'Listing published.', listingId: listing.id };
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
    where: { id: data.listingId, ownerId: authResult.user.id, type: ListingType.STAY },
    select: { id: true },
  });

  if (!existing) {
    return { error: 'Listing not found.' };
  }

  try {
    const listing = await db.listing.update({
      where: { id: existing.id },
      data: listingWriteFields(data),
    });

    revalidateListingPaths(authResult.user.id, listing.id);

    return { success: 'Listing updated.', listingId: listing.id };
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
    select: { id: true },
  });

  if (!existing) {
    return { error: 'Listing not found.' };
  }

  try {
    await db.listing.delete({ where: { id: existing.id } });
    revalidateListingPaths(authResult.user.id, existing.id);
    return { success: 'Listing deleted.' };
  } catch {
    return { error: 'Unable to delete listing.' };
  }
}
