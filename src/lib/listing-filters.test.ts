import { describe, expect, it } from 'vitest';
import {
  applyListingBrowseOptions,
  listingMatchesFilter,
  toFilterSlug,
} from '@/lib/listing-filters';
import { ListingItem, ListingType } from '@/types/listing';

function listing(partial: Partial<ListingItem> & Pick<ListingItem, 'type' | 'title'>): ListingItem {
  return {
    id: '1',
    description: null,
    location: 'London',
    image: '/x.jpg',
    price: 100,
    offerPrice: null,
    rating: 4.5,
    reviewCount: 2,
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

describe('listing filters', () => {
  it('slugifies filter labels', () => {
    expect(toFilterSlug('Art and Culture')).toBe('art-and-culture');
  });

  it('matches car transmission filters', () => {
    const car = listing({
      type: ListingType.CAR,
      title: 'City runabout',
      metadata: { transmission: 'automatic', vehicleClass: 'economy' },
      amenities: ['Automatic', 'Economy'],
    });

    expect(listingMatchesFilter(car, 'Automatic')).toBe(true);
    expect(listingMatchesFilter(car, 'Manual')).toBe(false);
    expect(listingMatchesFilter(car, 'Economy')).toBe(true);
  });

  it('sorts by price ascending', () => {
    const sorted = applyListingBrowseOptions(
      [
        listing({ id: 'a', type: ListingType.STAY, title: 'A', price: 300 }),
        listing({ id: 'b', type: ListingType.STAY, title: 'B', price: 100, offerPrice: 80 }),
      ],
      { sort: 'Price: low to high' }
    );

    expect(sorted.map((item) => item.id)).toEqual(['b', 'a']);
  });
});
