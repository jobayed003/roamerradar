import { env, isWebPushConfigured } from '@/env';
import { db } from '@/lib/db';

type PushPayload = {
  title: string;
  body: string;
  href?: string | null;
};

export async function savePushSubscription(input: {
  userId: string;
  endpoint: string;
  p256dh: string;
  auth: string;
}) {
  return db.pushSubscription.upsert({
    where: { endpoint: input.endpoint },
    create: input,
    update: {
      userId: input.userId,
      p256dh: input.p256dh,
      auth: input.auth,
    },
  });
}

export async function deletePushSubscription(endpoint: string, userId: string) {
  await db.pushSubscription.deleteMany({ where: { endpoint, userId } });
}

export async function sendWebPushToUser(userId: string, payload: PushPayload) {
  if (!isWebPushConfigured()) {
    return { skipped: true as const, reason: 'web_push_not_configured' as const };
  }

  const subscriptions = await db.pushSubscription.findMany({ where: { userId } });
  if (subscriptions.length === 0) {
    return { skipped: true as const, reason: 'no_subscriptions' as const };
  }

  // Dynamic import keeps builds working when web-push isn't installed in some environments.
  const webpush = await import('web-push');
  webpush.setVapidDetails(
    env.WEB_PUSH_SUBJECT ?? 'mailto:support@roamerradar.com',
    env.WEB_PUSH_PUBLIC_KEY!,
    env.WEB_PUSH_PRIVATE_KEY!
  );

  const body = JSON.stringify(payload);
  let sent = 0;

  for (const subscription of subscriptions) {
    try {
      await webpush.sendNotification(
        {
          endpoint: subscription.endpoint,
          keys: { p256dh: subscription.p256dh, auth: subscription.auth },
        },
        body
      );
      sent += 1;
    } catch (error) {
      console.error('[sendWebPushToUser]', error);
      // Drop expired endpoints.
      await db.pushSubscription.delete({ where: { id: subscription.id } }).catch(() => undefined);
    }
  }

  return { sent };
}
