import { env } from '@/env';
import { notifyGuestOfTripReminder } from '@/lib/notification-delivery';
import { db } from '@/lib/db';
import { BookingStatus } from '@prisma/client';
import { addDays, endOfDay, startOfDay } from 'date-fns';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const authHeader = request.headers.get('authorization');
  const expected = env.CRON_SECRET;

  if (!expected || authHeader !== `Bearer ${expected}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  // Remind guests whose trip starts tomorrow.
  const windowStart = startOfDay(addDays(new Date(), 1));
  const windowEnd = endOfDay(addDays(new Date(), 1));

  const bookings = await db.booking.findMany({
    where: {
      status: BookingStatus.PAID,
      reminderSentAt: null,
      checkIn: {
        gte: windowStart,
        lte: windowEnd,
      },
    },
    select: { id: true },
    take: 100,
  });

  for (const booking of bookings) {
    await notifyGuestOfTripReminder(booking.id);
  }

  return NextResponse.json({ ok: true, reminded: bookings.length });
}
