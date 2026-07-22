'use server';

import { finalizeCheckout, startCheckout, type StartCheckoutOptions } from '@/lib/checkout';
import { requireAuth } from '@/server/auth/require-auth';

export async function createCheckoutPayment(listingId: string, options: StartCheckoutOptions = {}) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  try {
    return await startCheckout(authResult.user.id, listingId, options);
  } catch {
    return { error: 'Unable to start checkout. Check your Stripe configuration.' };
  }
}

export async function completeCheckout(bookingId: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  try {
    return await finalizeCheckout(authResult.user.id, bookingId);
  } catch {
    return { error: 'Unable to verify payment.' };
  }
}
