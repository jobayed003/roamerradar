import { auth } from '@/auth';

export async function requireAuth() {
  const session = await auth();

  if (!session?.user?.id) {
    return { ok: false as const, error: 'Unauthorized' };
  }

  return { ok: true as const, user: session.user };
}

export async function requireOwner(userId: string) {
  const result = await requireAuth();

  if (!result.ok) {
    return result;
  }

  if (result.user.id !== userId) {
    return { ok: false as const, error: 'Forbidden' };
  }

  return result;
}
