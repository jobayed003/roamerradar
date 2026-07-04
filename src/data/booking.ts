import { db } from '@/lib/db';
import { BookingItem } from '@/types/booking';
import { BookingStatus } from '@prisma/client';

function toBookingItem(booking: {
  id: string;
  title: string;
  image: string | null;
  amount: number;
  currency: string;
  status: BookingStatus;
  guests: number;
  createdAt: Date;
  listingId: string | null;
  flightOfferId: string | null;
  listing: { type: import('@prisma/client').ListingType; location: string | null } | null;
}): BookingItem {
  return {
    id: booking.id,
    title: booking.title,
    image: booking.image,
    amount: booking.amount,
    currency: booking.currency,
    status: booking.status,
    guests: booking.guests,
    createdAt: booking.createdAt.toISOString(),
    listingId: booking.listingId,
    flightOfferId: booking.flightOfferId,
    listingType: booking.listing?.type ?? null,
    location: booking.listing?.location ?? null,
  };
}

export async function getUserBookings(userId: string): Promise<BookingItem[]> {
  try {
    const bookings = await db.booking.findMany({
      where: { userId },
      include: {
        listing: {
          select: {
            type: true,
            location: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return bookings.map(toBookingItem);
  } catch (error) {
    console.error('[getUserBookings]', error);
    return [];
  }
}

export async function getUserBookingCount(userId: string) {
  try {
    return await db.booking.count({ where: { userId } });
  } catch {
    return 0;
  }
}
