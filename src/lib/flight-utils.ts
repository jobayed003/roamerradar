import { ListingItem } from '@/types/listing';

export type StopFilter = 'nonstop' | 'oneStop' | 'twoPlusStops';

export function getFlightStopType(listing: ListingItem): StopFilter {
  const legs = listing.metadata?.legs ?? [];

  if (legs.length === 0) {
    return 'nonstop';
  }

  const hasMultiStop = legs.some((leg) => {
    const type = leg.type.toLowerCase();

    if (type.includes('2') || type.includes('3') || type.includes('+')) {
      return true;
    }

    return false;
  });

  if (hasMultiStop) {
    return 'twoPlusStops';
  }

  const hasOneStop = legs.some((leg) => leg.type.toLowerCase().includes('1 stop'));

  if (hasOneStop) {
    return 'oneStop';
  }

  return 'nonstop';
}

export function getFlightPriceBounds(listings: ListingItem[]) {
  if (listings.length === 0) {
    return { min: 500, max: 5000 };
  }

  const prices = listings.map((listing) => listing.price);
  const min = Math.floor(Math.min(...prices) / 50) * 50;
  const max = Math.ceil(Math.max(...prices) / 50) * 50;

  return { min: Math.max(min, 100), max: Math.max(max, min + 100) };
}

export function getLowestPriceByStop(listings: ListingItem[]) {
  const buckets: Record<StopFilter, number | null> = {
    nonstop: null,
    oneStop: null,
    twoPlusStops: null,
  };

  for (const listing of listings) {
    const stopType = getFlightStopType(listing);
    const current = buckets[stopType];

    if (current === null || listing.price < current) {
      buckets[stopType] = listing.price;
    }
  }

  return buckets;
}

export function filterFlightListings(
  listings: ListingItem[],
  {
    priceRange,
    stopFilters,
    flyingFrom,
    flyingTo,
  }: {
    priceRange: [number, number];
    stopFilters: StopFilter[];
    flyingFrom?: string;
    flyingTo?: string;
  }
) {
  const from = flyingFrom?.trim().toLowerCase();
  const to = flyingTo?.trim().toLowerCase();
  const [minPrice, maxPrice] = priceRange;

  return listings.filter((listing) => {
    if (listing.price < minPrice || listing.price > maxPrice) {
      return false;
    }

    if (stopFilters.length > 0) {
      const stopType = getFlightStopType(listing);

      if (!stopFilters.includes(stopType)) {
        return false;
      }
    }

    if (from) {
      const legs = listing.metadata?.legs ?? [];
      const matchesFrom =
        listing.title.toLowerCase().includes(from) ||
        legs.some((leg) => leg.departingLocation.toLowerCase().includes(from));

      if (!matchesFrom) {
        return false;
      }
    }

    if (to) {
      const legs = listing.metadata?.legs ?? [];
      const matchesTo =
        listing.title.toLowerCase().includes(to) ||
        legs.some((leg) => leg.arrivalLocation.toLowerCase().includes(to));

      if (!matchesTo) {
        return false;
      }
    }

    return true;
  });
}
