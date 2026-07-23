import { getNotificationPreferences } from '@/data/notification-preference';
import { getUserById } from '@/data/user';
import { db } from '@/lib/db';
import { sendBookingConfirmedEmail, sendMessageNotificationEmail } from '@/lib/mail';

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

    for (const recipientId of recipientIds) {
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
        userId: true,
        user: { select: { email: true } },
      },
    });

    if (!booking?.user.email) return;

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
