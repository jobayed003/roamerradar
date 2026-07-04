'use server';

import { getUserById } from '@/data/user';
import { db } from '@/lib/db';
import { ChangePasswordSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';
import bcrypt from 'bcryptjs';
import * as z from 'zod';

export const changePassword = async (values: z.infer<typeof ChangePasswordSchema>) => {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const validateFields = ChangePasswordSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: 'Invalid fields!' };
  }

  const { currentPassword, newPassword } = validateFields.data;
  const user = await getUserById(authResult.user.id);

  if (!user?.password) {
    return { error: 'Password login is not available for this account.' };
  }

  const passwordsMatch = await bcrypt.compare(currentPassword, user.password);

  if (!passwordsMatch) {
    return { error: 'Current password is incorrect.' };
  }

  const hashedPassword = await bcrypt.hash(newPassword, 10);

  await db.user.update({
    where: { id: user.id },
    data: { password: hashedPassword },
  });

  return { success: 'Password updated successfully!' };
};
