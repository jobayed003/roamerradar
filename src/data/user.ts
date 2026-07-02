import { db } from '@/lib/db';
import { userSummarySelect } from '@/data/listing';

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

export async function searchUsers(query: string, excludeUserId?: string, limit = 10) {
  const trimmed = query.trim();

  if (trimmed.length < 2) {
    return [];
  }

  try {
    const users = await db.user.findMany({
      where: {
        AND: [
          excludeUserId ? { id: { not: excludeUserId } } : {},
          {
            OR: [
              { displayName: { contains: trimmed, mode: 'insensitive' } },
              { name: { contains: trimmed, mode: 'insensitive' } },
              { realName: { contains: trimmed, mode: 'insensitive' } },
              { email: { contains: trimmed, mode: 'insensitive' } },
            ],
          },
        ],
      },
      select: userSummarySelect,
      take: limit,
      orderBy: { displayName: 'asc' },
    });

    return users;
  } catch {
    return [];
  }
}
