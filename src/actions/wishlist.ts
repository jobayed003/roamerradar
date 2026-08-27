'use server';

import { db } from '@/lib/db';
import { CuidSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';
import { ListingType, Prisma } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const ListingIdSchema = z.object({
  listingId: CuidSchema,
});

async function ensureWishlistableListing(listingId: string) {
  const listing = await db.listing.findUnique({
    where: { id: listingId },
    select: { id: true, type: true },
  });

  if (listing) return listing;

  const flightOffer = await db.flightOffer.findUnique({ where: { id: listingId } });
  if (!flightOffer) return null;

  const listingData = flightOffer.listingData as {
    title?: string;
    description?: string | null;
    location?: string | null;
    image?: string;
    price?: number;
    offerPrice?: number | null;
    amenities?: string[];
    metadata?: Prisma.InputJsonValue;
  };

  return db.listing.create({
    data: {
      id: flightOffer.id,
      type: ListingType.FLIGHT,
      title: listingData.title ?? flightOffer.title,
      description: listingData.description ?? null,
      location: listingData.location ?? null,
      image: listingData.image ?? flightOffer.image,
      price: listingData.price ?? flightOffer.price,
      offerPrice: listingData.offerPrice ?? null,
      amenities: listingData.amenities ?? [],
      metadata: listingData.metadata ?? undefined,
      placesCount: null,
      rating: 4.5,
      reviewCount: 0,
    },
    select: { id: true, type: true },
  });
}

export async function toggleWishlist(input: unknown) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: 'Sign in to save listings.' as const };
  }

  const parsed = ListingIdSchema.safeParse(input);

  if (!parsed.success) {
    return { error: 'Invalid listing.' as const };
  }

  const { listingId } = parsed.data;
  const userId = authResult.user.id;

  const listing = await ensureWishlistableListing(listingId);

  if (!listing) {
    return { error: 'Listing not found.' as const };
  }

  const existing = await db.wishlistItem.findUnique({
    where: {
      userId_listingId: { userId, listingId: listing.id },
    },
  });

  try {
    if (existing) {
      await db.wishlistItem.delete({ where: { id: existing.id } });
      revalidateWishlistPaths(listing.id);
      return { success: 'Removed from wishlist.' as const, saved: false };
    }

    await db.wishlistItem.create({
      data: { userId, listingId: listing.id },
    });
    revalidateWishlistPaths(listing.id);
    return { success: 'Saved to wishlist.' as const, saved: true };
  } catch {
    return { error: 'Unable to update wishlist.' as const };
  }
}

function revalidateWishlistPaths(listingId: string) {
  revalidatePath('/wishlists');
  revalidatePath(`/stays-product/${listingId}`);
  revalidatePath(`/cars-product/${listingId}`);
  revalidatePath(`/things-product/${listingId}`);
  revalidatePath(`/flights-product/${listingId}`);
}
