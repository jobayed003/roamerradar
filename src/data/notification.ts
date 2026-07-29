import { db } from '@/lib/db';
import { NotificationType, Prisma } from '@prisma/client';

export type NotificationItem = {
  id: string;
  type: NotificationType;
  title: string;
  body: string;
  href: string | null;
  image: string | null;
  readAt: Date | null;
  createdAt: Date;
  actor: {
    id: string;
    displayName: string | null;
    name: string | null;
    realName: string | null;
    image: string | null;
  } | null;
};

const notificationInclude = {
  actor: {
    select: {
      id: true,
      displayName: true,
      name: true,
      realName: true,
      image: true,
    },
  },
} satisfies Prisma.NotificationInclude;

export async function createNotification(input: {
  userId: string;
  actorId?: string | null;
  type: NotificationType;
  title: string;
  body: string;
  href?: string | null;
  image?: string | null;
}) {
  return db.notification.create({
    data: {
      userId: input.userId,
      actorId: input.actorId ?? null,
      type: input.type,
      title: input.title,
      body: input.body,
      href: input.href ?? null,
      image: input.image ?? null,
    },
  });
}

export async function getNotificationsForUser(userId: string, limit = 20) {
  try {
    return await db.notification.findMany({
      where: { userId },
      include: notificationInclude,
      orderBy: { createdAt: 'desc' },
      take: limit,
    });
  } catch (error) {
    console.error('[getNotificationsForUser]', error);
    return [];
  }
}

export async function getUnreadNotificationCount(userId: string) {
  try {
    return await db.notification.count({
      where: { userId, readAt: null },
    });
  } catch (error) {
    console.error('[getUnreadNotificationCount]', error);
    return 0;
  }
}

export async function markNotificationRead(userId: string, notificationId: string) {
  return db.notification.updateMany({
    where: { id: notificationId, userId, readAt: null },
    data: { readAt: new Date() },
  });
}

export async function markAllNotificationsRead(userId: string) {
  return db.notification.updateMany({
    where: { userId, readAt: null },
    data: { readAt: new Date() },
  });
}
