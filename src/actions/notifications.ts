'use server';

import {
  getNotificationsForUser,
  getUnreadNotificationCount,
  markAllNotificationsRead,
  markNotificationRead,
} from '@/data/notification';
import { requireAuth } from '@/server/auth/require-auth';
import { CuidSchema } from '@/schemas';

export async function fetchNotifications() {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const [notifications, unreadCount] = await Promise.all([
    getNotificationsForUser(authResult.user.id),
    getUnreadNotificationCount(authResult.user.id),
  ]);

  return {
    notifications: notifications.map((notification) => ({
      ...notification,
      createdAt: notification.createdAt.toISOString(),
      readAt: notification.readAt?.toISOString() ?? null,
    })),
    unreadCount,
  };
}

export async function markNotificationAsRead(notificationId: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  const parsed = CuidSchema.safeParse(notificationId);
  if (!parsed.success) {
    return { error: 'Invalid notification.' };
  }

  await markNotificationRead(authResult.user.id, parsed.data);
  return { success: true };
}

export async function markAllAsRead() {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  await markAllNotificationsRead(authResult.user.id);
  return { success: true };
}
