'use server';

import { db } from '@/lib/db';
import { CreateListingSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';
import { ListingType } from '@prisma/client';
import { revalidatePath } from 'next/cache';

const MAX_IMAGE_LENGTH = 3_000_000;

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

  for (const image of data.images) {
    if (image.length > MAX_IMAGE_LENGTH) {
      return { error: 'One of the photos is too large. Try a smaller image.' };
    }
  }

  const amenities = data.amenities.map((item) => item.trim()).filter(Boolean);
  const discountPercent = data.discountPercent ?? 0;
  const offerPrice =
    discountPercent > 0 ? Math.round(data.price * (1 - discountPercent / 100) * 100) / 100 : null;

  try {
    const listing = await db.listing.create({
      data: {
        type: ListingType.STAY,
        title: data.title,
        description: data.description || null,
        location: data.location,
        image: data.images[0],
        price: data.price,
        offerPrice,
        amenities,
        placesCount: null,
        rating: 0,
        reviewCount: 0,
        ownerId: authResult.user.id,
        metadata: {
          bedrooms: data.bedrooms,
          livingRooms: data.livingRooms,
          kitchens: data.kitchens,
          gallery: data.images.slice(1),
        },
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

    revalidatePath('/stays-category');
    revalidatePath(`/profile/${authResult.user.id}`);
    revalidatePath(`/stays-product/${listing.id}`);

    return { success: 'Listing published.', listingId: listing.id };
  } catch {
    return { error: 'Unable to create listing.' };
  }
}
