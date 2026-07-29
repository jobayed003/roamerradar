import { getNotificationPreferences } from '@/data/notification-preference';
import { createNotification } from '@/data/notification';
import { getUserById } from '@/data/user';
import { db } from '@/lib/db';
import { sendBookingConfirmedEmail, sendMessageNotificationEmail } from '@/lib/mail';
import { NotificationType } from '@prisma/client';

function displayName(user: {
  displayName: string | null;
  name: string | null;
  realName: string | null;
}) {
  return user.displayName || user.realName || user.name || 'A traveler';
}

export async function notifyRecipientOfMessage(input: {
  conversationId: string;
  senderId: string;
  body: string;
}) {
  try {
    const participants = await db.conversationParticipant.findMany({
      where: { conversationId: input.conversationId },
      select: { userId: true },
    });

    const recipientIds = participants
      .map((participant) => participant.userId)
      .filter((userId) => userId !== input.senderId);

    const sender = await getUserById(input.senderId);
    const senderLabel = sender ? displayName(sender) : 'A traveler';
    const preview = input.body.trim().slice(0, 160);

    for (const recipientId of recipientIds) {
      await createNotification({
        userId: recipientId,
        actorId: input.senderId,
        type: NotificationType.MESSAGE,
        title: senderLabel,
        body: preview || 'Sent you a message',
        href: `/messages/${input.conversationId}`,
        image: sender?.image ?? null,
      });

      const recipient = await getUserById(recipientId);
      if (!recipient?.email) continue;

      const prefs = await getNotificationPreferences(recipientId);
      if (!prefs.messageEmail) continue;

      await sendMessageNotificationEmail({
        to: recipient.email,
        senderName: senderLabel,
        preview: input.body,
        conversationId: input.conversationId,
      });
    }
  } catch (error) {
    console.error('[notifyRecipientOfMessage]', error);
  }
}

export async function notifyGuestOfBookingConfirmation(bookingId: string) {
  try {
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        title: true,
        amount: true,
        currency: true,
        image: true,
        userId: true,
        user: { select: { email: true } },
      },
    });

    if (!booking) return;

    await createNotification({
      userId: booking.userId,
      type: NotificationType.BOOKING,
      title: 'Booking confirmed',
      body: `${booking.title} is confirmed. View it in My Bookings.`,
      href: '/my-bookings',
      image: booking.image ?? null,
    });

    if (!booking.user.email) return;

    const prefs = await getNotificationPreferences(booking.userId);
    if (!prefs.remindersEmail) return;

    await sendBookingConfirmedEmail({
      to: booking.user.email,
      title: booking.title,
      bookingId: booking.id,
      amount: booking.amount,
      currency: booking.currency,
    });
  } catch (error) {
    console.error('[notifyGuestOfBookingConfirmation]', error);
  }
}
