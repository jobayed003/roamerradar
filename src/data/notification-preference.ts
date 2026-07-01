import { db } from '@/lib/db';

export type NotificationPreferenceData = {
  messageEmail: boolean;
  messageText: boolean;
  messageBrowser: boolean;
  remindersEmail: boolean;
  remindersText: boolean;
  remindersBrowser: boolean;
};

export const defaultNotificationPreferences: NotificationPreferenceData = {
  messageEmail: true,
  messageText: false,
  messageBrowser: false,
  remindersEmail: true,
  remindersText: false,
  remindersBrowser: false,
};

export async function getNotificationPreferences(userId: string) {
  try {
    const preferences = await db.notificationPreference.findUnique({
      where: { userId },
    });

    return preferences ?? { ...defaultNotificationPreferences, userId };
  } catch {
    return { ...defaultNotificationPreferences, userId };
  }
}

export async function upsertNotificationPreferences(userId: string, data: NotificationPreferenceData) {
  return db.notificationPreference.upsert({
    where: { userId },
    create: { userId, ...data },
    update: data,
  });
}
