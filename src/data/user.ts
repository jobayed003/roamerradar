import { db } from '@/lib/db';

export const getUserByEmail = async (email: string) => {
  try {
    const user = await db.user.findUnique({ where: { email } });
    return user;
  } catch (error) {
    return undefined;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = (await db.user.findUnique({ where: { id } })) ?? undefined;
    return user;
  } catch (error) {
    return undefined;
  }
};
