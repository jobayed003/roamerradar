import { env, isTwilioConfigured } from '@/env';

export async function sendSms(input: { to: string; body: string }) {
  if (!isTwilioConfigured()) {
    return { skipped: true as const, reason: 'twilio_not_configured' as const };
  }

  const to = input.to.trim();
  if (!to) {
    return { skipped: true as const, reason: 'missing_phone' as const };
  }

  const auth = Buffer.from(`${env.TWILIO_ACCOUNT_SID}:${env.TWILIO_AUTH_TOKEN}`).toString('base64');
  const body = new URLSearchParams({
    To: to,
    From: env.TWILIO_FROM_NUMBER!,
    Body: input.body.slice(0, 320),
  });

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${env.TWILIO_ACCOUNT_SID}/Messages.json`,
    {
      method: 'POST',
      headers: {
        Authorization: `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body,
    }
  );

  if (!response.ok) {
    const text = await response.text();
    console.error('[sendSms]', text);
    return { error: 'Unable to send SMS.' as const };
  }

  return { sent: true as const };
}
