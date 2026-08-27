import { getNotificationPreferences } from '@/data/notification-preference';
import { createNotification } from '@/data/notification';
import { getUserById } from '@/data/user';
import { db } from '@/lib/db';
import {
  sendBookingConfirmedEmail,
  sendMessageNotificationEmail,
  sendTripReminderEmail,
} from '@/lib/mail';
import { sendSms } from '@/lib/sms';
import { sendWebPushToUser } from '@/lib/web-push';
import { NotificationType } from '@prisma/client';
import { format } from 'date-fns';

function displayName(user: {
  displayName: string | null;
  name: string | null;
  realName: string | null;
}) {
  return user.displayName || user.realName || user.name || 'A traveler';
}

async function deliverChannels(input: {
  userId: string;
  email?: string | null;
  phone?: string | null;
  prefs: {
    email: boolean;
    text: boolean;
    browser: boolean;
  };
  emailSend: () => Promise<unknown>;
  smsBody: string;
  push: { title: string; body: string; href?: string | null };
}) {
  if (input.prefs.email && input.email) {
    await input.emailSend();
  }

  if (input.prefs.text && input.phone) {
    await sendSms({ to: input.phone, body: input.smsBody });
  }

  if (input.prefs.browser) {
    await sendWebPushToUser(input.userId, input.push);
  }
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
    const href = `/messages/${input.conversationId}`;

    for (const recipientId of recipientIds) {
      await createNotification({
        userId: recipientId,
        actorId: input.senderId,
        type: NotificationType.MESSAGE,
        title: senderLabel,
        body: preview || 'Sent you a message',
        href,
        image: sender?.image ?? null,
      });

      const recipient = await getUserById(recipientId);
      if (!recipient) continue;

      const prefs = await getNotificationPreferences(recipientId);

      await deliverChannels({
        userId: recipientId,
        email: recipient.email,
        phone: recipient.phone,
        prefs: {
          email: prefs.messageEmail,
          text: prefs.messageText,
          browser: prefs.messageBrowser,
        },
        emailSend: () =>
          sendMessageNotificationEmail({
            to: recipient.email!,
            senderName: senderLabel,
            preview: input.body,
            conversationId: input.conversationId,
          }),
        smsBody: `${senderLabel}: ${preview || 'New message on RoamerRadar'}`,
        push: {
          title: senderLabel,
          body: preview || 'Sent you a message',
          href,
        },
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
        user: { select: { email: true, phone: true } },
      },
    });

    if (!booking) return;

    const href = '/my-bookings';

    await createNotification({
      userId: booking.userId,
      type: NotificationType.BOOKING,
      title: 'Booking confirmed',
      body: `${booking.title} is confirmed. View it in My Bookings.`,
      href,
      image: booking.image ?? null,
    });

    const prefs = await getNotificationPreferences(booking.userId);

    await deliverChannels({
      userId: booking.userId,
      email: booking.user.email,
      phone: booking.user.phone,
      prefs: {
        email: prefs.remindersEmail,
        text: prefs.remindersText,
        browser: prefs.remindersBrowser,
      },
      emailSend: () =>
        sendBookingConfirmedEmail({
          to: booking.user.email!,
          title: booking.title,
          bookingId: booking.id,
          amount: booking.amount,
          currency: booking.currency,
        }),
      smsBody: `RoamerRadar: ${booking.title} is confirmed.`,
      push: {
        title: 'Booking confirmed',
        body: `${booking.title} is confirmed.`,
        href,
      },
    });
  } catch (error) {
    console.error('[notifyGuestOfBookingConfirmation]', error);
  }
}

export async function notifyGuestOfTripReminder(bookingId: string) {
  try {
    const booking = await db.booking.findUnique({
      where: { id: bookingId },
      select: {
        id: true,
        title: true,
        image: true,
        checkIn: true,
        userId: true,
        reminderSentAt: true,
        user: { select: { email: true, phone: true } },
      },
    });

    if (!booking?.checkIn || booking.reminderSentAt) return;

    const checkInLabel = format(booking.checkIn, 'MMM d, yyyy');
    const href = '/my-bookings';
    const body = `${booking.title} starts on ${checkInLabel}. Pack and review your booking details.`;

    await createNotification({
      userId: booking.userId,
      type: NotificationType.REMINDER,
      title: 'Trip reminder',
      body,
      href,
      image: booking.image ?? null,
    });

    const prefs = await getNotificationPreferences(booking.userId);

    await deliverChannels({
      userId: booking.userId,
      email: booking.user.email,
      phone: booking.user.phone,
      prefs: {
        email: prefs.remindersEmail,
        text: prefs.remindersText,
        browser: prefs.remindersBrowser,
      },
      emailSend: () =>
        sendTripReminderEmail({
          to: booking.user.email!,
          title: booking.title,
          checkInLabel,
          bookingId: booking.id,
        }),
      smsBody: `RoamerRadar reminder: ${booking.title} on ${checkInLabel}.`,
      push: {
        title: 'Trip reminder',
        body,
        href,
      },
    });

    await db.booking.update({
      where: { id: booking.id },
      data: { reminderSentAt: new Date() },
    });
  } catch (error) {
    console.error('[notifyGuestOfTripReminder]', error);
  }
}
