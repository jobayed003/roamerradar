import { describe, expect, it } from 'vitest';
import { dateRangesOverlap, listingNeedsDateAvailability } from '@/lib/booking-availability';
import { ListingType } from '@prisma/client';

describe('dateRangesOverlap', () => {
  it('detects overlapping stays', () => {
    expect(
      dateRangesOverlap(
        new Date('2026-08-01'),
        new Date('2026-08-05'),
        new Date('2026-08-04'),
        new Date('2026-08-07')
      )
    ).toBe(true);
  });

  it('allows back-to-back check-out / check-in on the same day', () => {
    expect(
      dateRangesOverlap(
        new Date('2026-08-01'),
        new Date('2026-08-05'),
        new Date('2026-08-05'),
        new Date('2026-08-08')
      )
    ).toBe(false);
  });

  it('returns false for fully separate ranges', () => {
    expect(
      dateRangesOverlap(
        new Date('2026-08-01'),
        new Date('2026-08-03'),
        new Date('2026-08-10'),
        new Date('2026-08-12')
      )
    ).toBe(false);
  });
});

describe('listingNeedsDateAvailability', () => {
  it('applies to stays and cars only', () => {
    expect(listingNeedsDateAvailability(ListingType.STAY)).toBe(true);
    expect(listingNeedsDateAvailability(ListingType.CAR)).toBe(true);
    expect(listingNeedsDateAvailability(ListingType.FLIGHT)).toBe(false);
    expect(listingNeedsDateAvailability(ListingType.EXPERIENCE)).toBe(false);
  });
});
