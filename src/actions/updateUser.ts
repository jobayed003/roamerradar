'use server';

import { db } from '@/lib/db';
import { PersonalInfoSchema } from '@/schemas';
import * as z from 'zod';

export const updateUser = async (values: z.infer<typeof PersonalInfoSchema>, userId: string) => {
  const validateFields = PersonalInfoSchema.safeParse(values);

  if (!validateFields.success) return { error: 'Invalid Fields!' };

  const { data } = validateFields;
  if (userId === '') {
    return { error: 'User is not authorized!' };
  }

  await db.user.update({
    where: { id: userId },
    data,
  });

  return { success: 'Profile update success!' };
};
