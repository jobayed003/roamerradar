'use server';

import { savePushSubscription, deletePushSubscription } from '@/lib/web-push';
import { env, isWebPushConfigured } from '@/env';
import { requireAuth } from '@/server/auth/require-auth';
import { z } from 'zod';

const PushSubscriptionSchema = z.object({
  endpoint: z.string().url(),
  keys: z.object({
    p256dh: z.string().min(1),
    auth: z.string().min(1),
  }),
});

export async function getWebPushPublicKey() {
  if (!isWebPushConfigured()) {
    return { configured: false as const };
  }

  return { configured: true as const, publicKey: env.WEB_PUSH_PUBLIC_KEY! };
}

export async function registerPushSubscription(input: unknown) {
  const authResult = await requireAuth();
  if (!authResult.ok) return { error: authResult.error };

  if (!isWebPushConfigured()) {
    return { error: 'Browser push is not configured on the server.' };
  }

  const parsed = PushSubscriptionSchema.safeParse(input);
  if (!parsed.success) {
    return { error: 'Invalid push subscription.' };
  }

  await savePushSubscription({
    userId: authResult.user.id,
    endpoint: parsed.data.endpoint,
    p256dh: parsed.data.keys.p256dh,
    auth: parsed.data.keys.auth,
  });

  return { success: 'Browser notifications enabled.' };
}

export async function unregisterPushSubscription(endpoint: string) {
  const authResult = await requireAuth();
  if (!authResult.ok) return { error: authResult.error };

  await deletePushSubscription(endpoint, authResult.user.id);
  return { success: 'Browser notifications disabled.' };
}
