'use server';

import {
  NotificationPreferenceData,
  getNotificationPreferences,
  upsertNotificationPreferences,
} from '@/data/notification-preference';
import { NotificationPreferenceSchema } from '@/schemas';
import { requireAuth } from '@/server/auth/require-auth';

export async function updateNotificationPreferences(values: NotificationPreferenceData) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = NotificationPreferenceSchema.safeParse(values);

  if (!parsed.success) {
    return { error: 'Invalid notification settings.' };
  }

  await upsertNotificationPreferences(authResult.user.id, parsed.data);

  return { success: 'Notification preferences updated.' };
}

export async function getUserNotificationPreferences() {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const preferences = await getNotificationPreferences(authResult.user.id);
  return { preferences };
}
