'use server';

import { db } from '@/lib/db';
import { PersonalInfoSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';
import * as z from 'zod';

export const updateUser = async (values: z.infer<typeof PersonalInfoSchema>) => {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const validateFields = PersonalInfoSchema.safeParse(values);

  if (!validateFields.success) return { error: 'Invalid Fields!' };

  const { data } = validateFields;

  await db.user.update({
    where: { id: authResult.user.id },
    data,
  });

  return { success: 'Profile update success!' };
};
