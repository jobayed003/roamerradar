import { describe, expect, it, vi, beforeEach } from 'vitest';

const sendMock = vi.fn();

vi.mock('resend', () => ({
  Resend: class {
    emails = { send: sendMock };
  },
}));

vi.mock('@/env', () => ({
  env: {
    RESEND_API_KEY: 're_test',
    NEXT_PUBLIC_SITE_URL: 'http://localhost:3000',
  },
  isResendConfigured: () => true,
}));

describe('notification emails', () => {
  beforeEach(() => {
    sendMock.mockReset();
    sendMock.mockResolvedValue({ id: 'email_1' });
  });

  it('sends message notification when Resend is configured', async () => {
    const { sendMessageNotificationEmail } = await import('@/lib/mail');
    const result = await sendMessageNotificationEmail({
      to: 'guest@example.com',
      senderName: 'Host',
      preview: 'Hello there',
      conversationId: 'cmrconversation000000001',
    });

    expect(result).toEqual({ sent: true });
    expect(sendMock).toHaveBeenCalledOnce();
    expect(sendMock.mock.calls[0][0].to).toBe('guest@example.com');
    expect(sendMock.mock.calls[0][0].subject).toContain('Host');
  });

  it('sends booking confirmation email', async () => {
    const { sendBookingConfirmedEmail } = await import('@/lib/mail');
    const result = await sendBookingConfirmedEmail({
      to: 'guest@example.com',
      title: 'Mountain House',
      bookingId: 'cmrbooking00000000000001',
      amount: 250,
      currency: 'usd',
    });

    expect(result).toEqual({ sent: true });
    expect(sendMock).toHaveBeenCalledOnce();
    expect(sendMock.mock.calls[0][0].subject).toContain('Mountain House');
  });
});

describe('pref gating helpers', () => {
  it('skips message email when messageEmail is false', async () => {
    vi.resetModules();
    vi.doMock('@/data/notification-preference', () => ({
      getNotificationPreferences: async () => ({ messageEmail: false, remindersEmail: true }),
    }));
    vi.doMock('@/data/user', () => ({
      getUserById: async (id: string) =>
        id === 'sender'
          ? { id, displayName: 'Sender', name: null, realName: null, email: 's@example.com' }
          : { id, displayName: 'Recipient', name: null, realName: null, email: 'r@example.com' },
    }));
    vi.doMock('@/lib/db', () => ({
      db: {
        conversationParticipant: {
          findMany: async () => [{ userId: 'sender' }, { userId: 'recipient' }],
        },
      },
    }));
    const mailSend = vi.fn();
    vi.doMock('@/lib/mail', () => ({
      sendMessageNotificationEmail: mailSend,
      sendBookingConfirmedEmail: vi.fn(),
    }));

    const { notifyRecipientOfMessage } = await import('@/lib/notification-delivery');
    await notifyRecipientOfMessage({
      conversationId: 'c1',
      senderId: 'sender',
      body: 'hi',
    });

    expect(mailSend).not.toHaveBeenCalled();
  });
});
