'use server';

import { db } from '@/lib/db';
import { CuidSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';

const ListingIdSchema = z.object({
  listingId: CuidSchema,
});

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

  const listing = await db.listing.findUnique({
    where: { id: listingId },
    select: { id: true, type: true },
  });

  if (!listing) {
    return { error: 'Listing not found.' as const };
  }

  const existing = await db.wishlistItem.findUnique({
    where: {
      userId_listingId: { userId, listingId },
    },
  });

  try {
    if (existing) {
      await db.wishlistItem.delete({ where: { id: existing.id } });
      revalidateWishlistPaths(listingId);
      return { success: 'Removed from wishlist.' as const, saved: false };
    }

    await db.wishlistItem.create({
      data: { userId, listingId },
    });
    revalidateWishlistPaths(listingId);
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
}
