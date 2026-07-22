import { BookingStatus, ListingType } from '@prisma/client';

export type BookingItem = {
  id: string;
  title: string;
  image: string | null;
  amount: number;
  currency: string;
  status: BookingStatus;
  guests: number;
  checkIn: string | null;
  checkOut: string | null;
  createdAt: string;
  listingId: string | null;
  flightOfferId: string | null;
  listingType: ListingType | null;
  location: string | null;
};

export type BookingCategory = 'all' | 'stays' | 'flights' | 'cars' | 'things';

export type BookingStatusFilter = 'all' | 'upcoming' | 'past' | 'pending';

export function getBookingProductPath(booking: BookingItem): string | null {
  if (booking.flightOfferId) {
    return `/flights-product/${booking.flightOfferId}`;
  }

  if (!booking.listingId || !booking.listingType) {
    return null;
  }

  const routes: Record<ListingType, string> = {
    [ListingType.STAY]: '/stays-product',
    [ListingType.FLIGHT]: '/flights-product',
    [ListingType.CAR]: '/cars-product',
    [ListingType.EXPERIENCE]: '/things-product',
  };

  return `${routes[booking.listingType]}/${booking.listingId}`;
}

export function getBookingCategory(booking: BookingItem): BookingCategory {
  if (booking.flightOfferId || booking.listingType === ListingType.FLIGHT) {
    return 'flights';
  }

  if (booking.listingType === ListingType.STAY) return 'stays';
  if (booking.listingType === ListingType.CAR) return 'cars';
  if (booking.listingType === ListingType.EXPERIENCE) return 'things';

  return 'all';
}

export function matchesStatusFilter(booking: BookingItem, filter: BookingStatusFilter) {
  if (filter === 'all') return true;
  if (filter === 'pending') return booking.status === BookingStatus.PENDING;

  const referenceDate = booking.checkOut ?? booking.checkIn ?? booking.createdAt;
  const isPast = new Date(referenceDate) < new Date();

  if (filter === 'upcoming') {
    return booking.status === BookingStatus.PAID && !isPast;
  }

  // past
  return (
    (booking.status === BookingStatus.PAID && isPast) ||
    booking.status === BookingStatus.CANCELLED ||
    booking.status === BookingStatus.FAILED
  );
}

export function formatBookingStatus(status: BookingStatus) {
  switch (status) {
    case BookingStatus.PAID:
      return 'Confirmed';
    case BookingStatus.PENDING:
      return 'Pending payment';
    case BookingStatus.CANCELLED:
      return 'Cancelled';
    case BookingStatus.FAILED:
      return 'Failed';
    default:
      return status;
  }
}
