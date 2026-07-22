import { describe, expect, it } from 'vitest';
import { filterFlightListings, getFlightStopType } from '@/lib/flight-utils';
import { ListingItem, ListingType } from '@/types/listing';
import { BookingStatus, ListingType as PrismaListingType } from '@prisma/client';
import { getBookingCategory, matchesStatusFilter, type BookingItem } from '@/types/booking';
import { ListingMetadataSchema, StartCheckoutSchema } from '@/schemas';

function listing(partial: Partial<ListingItem> & Pick<ListingItem, 'id' | 'title' | 'price'>): ListingItem {
  return {
    type: ListingType.FLIGHT,
    description: null,
    location: null,
    image: '/images/flight.avif',
    offerPrice: null,
    rating: 4.5,
    reviewCount: 0,
    amenities: [],
    metadata: null,
    isFeatured: false,
    isPopular: false,
    driveTime: null,
    placesCount: null,
    owner: null,
    ...partial,
  };
}

describe('getFlightStopType', () => {
  it('detects nonstop and one-stop legs', () => {
    expect(
      getFlightStopType(
        listing({
          id: '1',
          title: 'A to B',
          price: 100,
          metadata: {
            legs: [
              {
                departingLocation: 'A',
                takeOffTime: '10:00',
                arrivalLocation: 'B',
                landingTime: '12:00',
                logo: '/x.png',
                type: 'Nonstop',
              },
            ],
          },
        })
      )
    ).toBe('nonstop');

    expect(
      getFlightStopType(
        listing({
          id: '2',
          title: 'A to C',
          price: 200,
          metadata: {
            legs: [
              {
                departingLocation: 'A',
                takeOffTime: '10:00',
                arrivalLocation: 'C',
                landingTime: '16:00',
                logo: '/x.png',
                type: '1 stop',
              },
            ],
          },
        })
      )
    ).toBe('oneStop');
  });
});

describe('filterFlightListings', () => {
  it('filters by price and origin keyword', () => {
    const filtered = filterFlightListings(
      [
        listing({ id: '1', title: 'NYC to LON', price: 400, location: 'NYC → LON' }),
        listing({ id: '2', title: 'LAX to TOK', price: 900, location: 'LAX → TOK' }),
      ],
      {
        priceRange: [100, 500],
        stopFilters: [],
        flyingFrom: 'NYC',
      }
    );

    expect(filtered).toHaveLength(1);
    expect(filtered[0]?.id).toBe('1');
  });
});

describe('booking helpers', () => {
  const base: BookingItem = {
    id: 'b1',
    title: 'Stay',
    image: null,
    amount: 100,
    currency: 'USD',
    status: BookingStatus.PAID,
    guests: 2,
    checkIn: '2099-01-01T00:00:00.000Z',
    checkOut: '2099-01-05T00:00:00.000Z',
    createdAt: '2026-01-01T00:00:00.000Z',
    listingId: 'l1',
    flightOfferId: null,
    listingType: PrismaListingType.STAY,
    location: 'NZ',
  };

  it('maps listing types to categories', () => {
    expect(getBookingCategory(base)).toBe('stays');
  });

  it('treats future paid bookings as upcoming', () => {
    expect(matchesStatusFilter(base, 'upcoming')).toBe(true);
    expect(matchesStatusFilter({ ...base, status: BookingStatus.CANCELLED }, 'past')).toBe(true);
  });
});

describe('schemas', () => {
  it('parses listing metadata safely', () => {
    expect(ListingMetadataSchema.parse({ bedrooms: 2, provider: 'Host' }).bedrooms).toBe(2);
    expect(ListingMetadataSchema.safeParse({ bedrooms: 'nope' }).success).toBe(false);
  });

  it('validates checkout payloads', () => {
    const parsed = StartCheckoutSchema.safeParse({
      itemId: 'cmrtest000000000000000001',
      guests: 2,
      checkIn: '2026-08-01',
    });
    expect(parsed.success).toBe(true);
  });
});
