import { ListingItem, ListingType } from '@/types/listing';

export function toFilterSlug(label: string) {
  return label
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export function findFilterLabel(filters: string[], slugOrLabel?: string | null) {
  if (!slugOrLabel) return filters[0] ?? '';
  const normalized = toFilterSlug(slugOrLabel);
  return (
    filters.find((item) => toFilterSlug(item) === normalized || item.toLowerCase() === slugOrLabel.toLowerCase()) ??
    filters[0] ??
    ''
  );
}

export function findSortLabel(sorts: string[], slugOrLabel?: string | null) {
  if (!slugOrLabel) return sorts[0] ?? '';
  const normalized = toFilterSlug(slugOrLabel);
  return (
    sorts.find((item) => toFilterSlug(item) === normalized || item.toLowerCase() === slugOrLabel.toLowerCase()) ??
    sorts[0] ??
    ''
  );
}

function haystack(listing: ListingItem) {
  const categories = listing.metadata?.categories?.join(' ') ?? '';
  const transmission = listing.metadata?.transmission ?? '';
  const vehicleClass = listing.metadata?.vehicleClass ?? '';
  const stayKind = listing.metadata?.stayKind ?? '';
  return `${listing.title} ${listing.description ?? ''} ${listing.location ?? ''} ${listing.amenities.join(' ')} ${categories} ${transmission} ${vehicleClass} ${stayKind}`.toLowerCase();
}

export function listingMatchesFilter(listing: ListingItem, filterLabel?: string | null) {
  if (!filterLabel) return true;
  const slug = toFilterSlug(filterLabel);
  if (!slug || slug === 'all') return true;

  switch (listing.type) {
    case ListingType.STAY: {
      if (slug === 'entire-homes') {
        return (
          listing.metadata?.stayKind === 'entire' ||
          haystack(listing).includes('entire') ||
          listing.amenities.some((item) => item.toLowerCase().includes('entire'))
        );
      }
      if (slug === 'cancellation-flexibility') {
        return (
          Boolean(listing.metadata?.flexibleCancellation) ||
          haystack(listing).includes('flexible cancellation') ||
          listing.amenities.some((item) => item.toLowerCase().includes('flexible'))
        );
      }
      if (slug === 'closest-beach') {
        return (
          Boolean(listing.metadata?.beachNearby) ||
          haystack(listing).includes('beach') ||
          listing.amenities.some((item) => item.toLowerCase().includes('beach'))
        );
      }
      if (slug === 'for-long-stays') {
        return (
          Boolean(listing.metadata?.longStays) ||
          haystack(listing).includes('long stay') ||
          listing.amenities.some((item) => item.toLowerCase().includes('long stay'))
        );
      }
      return true;
    }
    case ListingType.CAR: {
      if (slug === 'automatic') {
        return (
          listing.metadata?.transmission === 'automatic' ||
          listing.amenities.some((item) => item.toLowerCase() === 'automatic')
        );
      }
      if (slug === 'manual') {
        return (
          listing.metadata?.transmission === 'manual' ||
          listing.amenities.some((item) => item.toLowerCase() === 'manual')
        );
      }
      if (slug === 'suv') {
        return (
          listing.metadata?.vehicleClass === 'suv' ||
          listing.amenities.some((item) => item.toLowerCase() === 'suv') ||
          listing.title.toLowerCase().includes('suv')
        );
      }
      if (slug === 'economy') {
        return (
          listing.metadata?.vehicleClass === 'economy' ||
          listing.amenities.some((item) => item.toLowerCase() === 'economy') ||
          listing.title.toLowerCase().includes('economy')
        );
      }
      return true;
    }
    case ListingType.EXPERIENCE: {
      const categories = (listing.metadata?.categories ?? []).map((item) => toFilterSlug(item));
      if (categories.includes(slug)) return true;
      return listing.amenities.some((item) => toFilterSlug(item) === slug) || haystack(listing).includes(slug.replace(/-/g, ' '));
    }
    default:
      return true;
  }
}

export function sortListings(listings: ListingItem[], sortLabel?: string | null) {
  const slug = toFilterSlug(sortLabel ?? '');
  const sorted = [...listings];

  if (slug === 'price-low-to-high' || slug === 'cheapest') {
    return sorted.sort((a, b) => (a.offerPrice ?? a.price) - (b.offerPrice ?? b.price));
  }

  if (slug === 'price-high-to-low') {
    return sorted.sort((a, b) => (b.offerPrice ?? b.price) - (a.offerPrice ?? a.price));
  }

  if (slug === 'on-sale' || slug === 'on-sales') {
    return sorted.sort((a, b) => Number(Boolean(b.offerPrice)) - Number(Boolean(a.offerPrice)));
  }

  if (slug === 'popular' || slug === 'best') {
    return sorted.sort((a, b) => b.rating - a.rating || b.reviewCount - a.reviewCount);
  }

  if (slug === 'newest' || slug === 'on-delivery' || slug === 'recommended') {
    return sorted;
  }

  return sorted;
}

export function applyListingBrowseOptions(
  listings: ListingItem[],
  options: { filter?: string | null; sort?: string | null; locationQuery?: string | null }
) {
  let result = listings;

  if (options.locationQuery?.trim()) {
    const query = options.locationQuery.trim().toLowerCase();
    const matched = result.filter((listing) => {
      const text = `${listing.location ?? ''} ${listing.title}`.toLowerCase();
      return (
        text.includes(query) ||
        query.split(/[\s,]+/).some((part) => part.length > 2 && text.includes(part))
      );
    });
    result = matched.length > 0 ? matched : result;
  }

  if (options.filter) {
    const filtered = result.filter((listing) => listingMatchesFilter(listing, options.filter));
    // Soft fallback: if a chip matches nothing, keep the unfiltered set so the page isn't empty.
    if (filtered.length > 0) {
      result = filtered;
    }
  }

  return sortListings(result, options.sort);
}

export function getListingProductPath(type: ListingType | string, id: string) {
  switch (type) {
    case ListingType.CAR:
    case 'CAR':
      return `/cars-product/${id}`;
    case ListingType.EXPERIENCE:
    case 'EXPERIENCE':
      return `/things-product/${id}`;
    case ListingType.FLIGHT:
    case 'FLIGHT':
      return `/flights-product/${id}`;
    case ListingType.STAY:
    case 'STAY':
    default:
      return `/stays-product/${id}`;
  }
}

export const HOSTABLE_LISTING_TYPES = [ListingType.STAY, ListingType.CAR, ListingType.EXPERIENCE] as const;
export type HostableListingType = (typeof HOSTABLE_LISTING_TYPES)[number];
