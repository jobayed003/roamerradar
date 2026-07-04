import { db } from '@/lib/db';

export async function getPaymentMethodsByUserId(userId: string) {
  try {
    return await db.paymentMethod.findMany({
      where: { userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
    });
  } catch {
    return [];
  }
}

export async function getDefaultPaymentMethod(userId: string) {
  try {
    return await db.paymentMethod.findFirst({
      where: { userId, isDefault: true },
    });
  } catch {
    return null;
  }
}
