import { isResendConfigured, env } from '@/env';
import { Resend } from 'resend';

const domain = env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';
const FROM_EMAIL = 'onboarding@resend.dev';

function getResend() {
  if (!isResendConfigured() || !env.RESEND_API_KEY) {
    return null;
  }
  return new Resend(env.RESEND_API_KEY);
}

export const sendVerificationEmail = async (email: string, token: string) => {
  const resend = getResend();
  if (!resend) return { skipped: true as const };

  const confirmLink = `${domain}/auth/verify-email?token=${token}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: email,
    subject: 'Confirm your Email',
    html: `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body {
          font-family: 'Arial', sans-serif;
          background-color: #f4f4f4;
          margin: 0;
          padding: 20px;
        }
        .email-container {
          max-width: 600px;
          margin: auto;
          background: #ffffff;
          padding: 20px;
          text-align: center;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }
        .header {
          background-color: #17a2b8;
          color: #ffffff;
          padding: 10px;
          border-top-left-radius: 8px;
          border-top-right-radius: 8px;
        }
        .content {
          padding: 20px;
          line-height: 1.6;
        }
        .button {
          display: inline-block;
          padding: 10px 20px;
          margin-top: 20px;
          background-color: #17a2b8;
          color: #ffffff;
          text-decoration: none;
          border-radius: 5px;
          transition: background-color 0.3s ease;
        }
        .button:hover {
          background-color: #1391a8;
        }
        .footer {
          margin-top: 20px;
          padding: 10px;
          background-color: #f4f4f4;
          color: #888888;
          font-size: 12px;
        }
      </style>
    </head>
    <body>
      <div class="email-container">
        <div class="header">
          <h1>Welcome to RoamerRadar!</h1>
        </div>
        <div class="content">
          <p>Thank you for signing up with us. Please confirm your email address to start exploring.</p>
          <a href="${confirmLink}" class="button">Confirm Email</a>
        </div>
        <div class="footer">
          If you did not request this email, please ignore it.
        </div>
      </div>
    </body>
    </html>
    `,
  });

  return { sent: true as const };
};

export async function sendMessageNotificationEmail(input: {
  to: string;
  senderName: string;
  preview: string;
  conversationId: string;
}) {
  const resend = getResend();
  if (!resend) return { skipped: true as const };

  const messagesLink = `${domain}/messages/${input.conversationId}`;
  const preview = input.preview.slice(0, 160);

  await resend.emails.send({
    from: FROM_EMAIL,
    to: input.to,
    subject: `New message from ${input.senderName}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2>New message on RoamerRadar</h2>
        <p><strong>${input.senderName}</strong> sent you a message:</p>
        <p style="padding: 12px; background: #f4f4f4; border-radius: 8px;">${preview}</p>
        <p><a href="${messagesLink}">Open conversation</a></p>
      </div>
    `,
  });

  return { sent: true as const };
}

export async function sendBookingConfirmedEmail(input: {
  to: string;
  title: string;
  bookingId: string;
  amount: number;
  currency: string;
}) {
  const resend = getResend();
  if (!resend) return { skipped: true as const };

  const bookingsLink = `${domain}/my-bookings`;
  const amountLabel = `${input.currency.toUpperCase()} ${input.amount.toFixed(2)}`;

  await resend.emails.send({
    from: FROM_EMAIL,
    to: input.to,
    subject: `Booking confirmed: ${input.title}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 560px; margin: 0 auto;">
        <h2>Your booking is confirmed</h2>
        <p><strong>${input.title}</strong></p>
        <p>Total: ${amountLabel}</p>
        <p>Booking ID: ${input.bookingId}</p>
        <p><a href="${bookingsLink}">View my bookings</a></p>
      </div>
    `,
  });

  return { sent: true as const };
}
