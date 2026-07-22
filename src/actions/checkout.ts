'use server';

import { finalizeCheckout, startCheckout } from '@/lib/checkout';
import { CuidSchema, StartCheckoutSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';

export async function createCheckoutPayment(listingId: string, options: unknown = {}) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = StartCheckoutSchema.safeParse({
    itemId: listingId,
    ...(typeof options === 'object' && options !== null ? options : {}),
  });

  if (!parsed.success) {
    return { error: parsed.error.errors[0]?.message ?? 'Invalid checkout request.' };
  }

  try {
    const { itemId, guests, checkIn, checkOut } = parsed.data;
    return await startCheckout(authResult.user.id, itemId, { guests, checkIn, checkOut });
  } catch {
    return { error: 'Unable to start checkout. Check your Stripe configuration.' };
  }
}

export async function completeCheckout(bookingId: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = CuidSchema.safeParse(bookingId);

  if (!parsed.success) {
    return { error: 'Invalid booking.' };
  }

  try {
    return await finalizeCheckout(authResult.user.id, parsed.data);
  } catch {
    return { error: 'Unable to verify payment.' };
  }
}
