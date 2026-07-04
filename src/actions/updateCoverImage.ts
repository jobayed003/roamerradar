'use server';

import { db } from '@/lib/db';
import { requireAuth } from '@/server/auth/require-auth';
import { revalidatePath } from 'next/cache';

const MAX_COVER_IMAGE_LENGTH = 3_000_000;

export async function updateCoverImage(coverImage: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  if (!coverImage.startsWith('data:image/')) {
    return { error: 'Invalid image format.' };
  }

  if (coverImage.length > MAX_COVER_IMAGE_LENGTH) {
    return { error: 'Image is too large. Try a smaller photo.' };
  }

  try {
    await db.user.update({
      where: { id: authResult.user.id },
      data: { coverImage },
    });

    revalidatePath(`/profile/${authResult.user.id}`);

    return { success: 'Cover photo updated.' };
  } catch {
    return { error: 'Unable to save cover photo.' };
  }
}
