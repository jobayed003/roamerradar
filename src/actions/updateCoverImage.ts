'use server';

import { db } from '@/lib/db';
import { CoverImageSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';
import { revalidatePath } from 'next/cache';

export async function updateCoverImage(coverImage: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = CoverImageSchema.safeParse(coverImage);

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid image.' };
  }

  try {
    await db.user.update({
      where: { id: authResult.user.id },
      data: { coverImage: parsed.data },
    });

    revalidatePath(`/profile/${authResult.user.id}`);

    return { success: 'Cover photo updated.' };
  } catch {
    return { error: 'Unable to save cover photo.' };
  }
}
