import { getDemoFlightListings } from '@/data/listing';
import {
  isDuffelConfigured,
  mapDuffelOfferToListing,
  resolveLocationCode,
  searchFlightOffers,
  type DuffelFlightOffer,
} from '@/lib/duffel';
import { isDuffelTestMode, shouldUseDemoFlights } from '@/env';
import { db } from '@/lib/db';
import { ListingItem, ListingType } from '@/types/listing';
import { parseListingMetadata } from '@/schemas';
import { addDays, format } from 'date-fns';

/** How long a cached Duffel fare stays bookable. Product pages still load after this. */
const OFFER_TTL_MINUTES = 45;

type SearchFlightsInput = {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  adults?: number;
};

export type SearchFlightsResult = {
  listings: ListingItem[];
  error?: string;
  notice?: string;
  source: 'duffel' | 'demo' | 'unavailable';
  routeLabel?: string;
  duffelTestMode?: boolean;
};

function defaultDepartureDate() {
  return format(addDays(new Date(), 14), 'yyyy-MM-dd');
}

function defaultReturnDate(departureDate: string) {
  return format(addDays(new Date(departureDate), 7), 'yyyy-MM-dd');
}

function filterDemoFlights(listings: ListingItem[], from?: string, to?: string) {
  const fromCode = from?.trim().toUpperCase();
  const toCode = to?.trim().toUpperCase();

  if (!fromCode && !toCode) {
    return listings;
  }

  const filtered = listings.filter((listing) => {
    const haystack = `${listing.title} ${listing.location ?? ''}`.toUpperCase();
    if (fromCode && !haystack.includes(fromCode)) return false;
    if (toCode && !haystack.includes(toCode)) return false;
    return true;
  });

  return filtered.length > 0 ? filtered : listings;
}

function demoRouteLabel(from?: string, to?: string) {
  const fromLabel = from?.trim();
  const toLabel = to?.trim();

  if (fromLabel && toLabel) {
    return `${fromLabel} → ${toLabel}`;
  }

  if (fromLabel) {
    return `from ${fromLabel}`;
  }

  if (toLabel) {
    return `to ${toLabel}`;
  }

  return 'Sample routes';
}

async function searchDemoFlights(
  input: SearchFlightsInput,
  notice?: string
): Promise<SearchFlightsResult> {
  const listings = filterDemoFlights(
    await getDemoFlightListings(),
    input.from,
    input.to
  );

  if (listings.length === 0) {
    return {
      listings: [],
      source: 'unavailable',
      error: 'No sample flights found. Run npm run db:seed to load demo flight data.',
    };
  }

  return {
    listings,
    source: 'demo',
    routeLabel: demoRouteLabel(input.from, input.to),
    notice:
      notice ??
      (isDuffelConfigured()
        ? 'Showing sample flights (USE_DEMO_FLIGHTS=true).'
        : 'Showing sample flights. Add DUFFEL_ACCESS_TOKEN for live Duffel search.'),
  };
}

async function cacheOffers(offers: DuffelFlightOffer[]) {
  const expiresAt = new Date(Date.now() + OFFER_TTL_MINUTES * 60_000);
  const listings: ListingItem[] = [];

  for (const offer of offers) {
    const listing = mapDuffelOfferToListing(offer);
    const record = await db.flightOffer.create({
      data: {
        price: listing.price,
        currency: offer.total_currency || 'USD',
        title: listing.title,
        image: listing.image,
        listingData: listing,
        offerData: offer,
        expiresAt,
      },
    });

    listings.push({ ...listing, id: record.id, owner: null });
  }

  return listings;
}

export async function searchFlights(input: SearchFlightsInput = {}): Promise<SearchFlightsResult> {
  const fromKeyword = input.from?.trim() || 'NYC';
  const toKeyword = input.to?.trim() || 'LON';
  const departureDate = input.departureDate || defaultDepartureDate();
  const returnDate = input.returnDate || defaultReturnDate(departureDate);

  if (shouldUseDemoFlights()) {
    return searchDemoFlights({
      ...input,
      from: fromKeyword === 'NYC' && !input.from?.trim() ? undefined : fromKeyword,
      to: toKeyword === 'LON' && !input.to?.trim() ? undefined : toKeyword,
    });
  }

  try {
    const [originCode, destinationCode] = await Promise.all([
      resolveLocationCode(fromKeyword),
      resolveLocationCode(toKeyword),
    ]);

    if (!originCode) {
      return searchDemoFlights(input, `Could not find an airport for "${fromKeyword}". Showing sample flights instead.`);
    }

    if (!destinationCode) {
      return searchDemoFlights(input, `Could not find an airport for "${toKeyword}". Showing sample flights instead.`);
    }

    const offers = await searchFlightOffers({
      originCode,
      destinationCode,
      departureDate,
      returnDate,
      adults: input.adults ?? 1,
    });

    if (offers.length === 0) {
      return searchDemoFlights(
        input,
        `No live flights found for ${originCode} → ${destinationCode}. Showing sample flights instead.`
      );
    }

    const listings = await cacheOffers(offers);
    const testMode = isDuffelTestMode();

    return {
      listings,
      source: 'duffel',
      routeLabel: `${originCode} → ${destinationCode}`,
      duffelTestMode: testMode,
      notice: testMode
        ? 'Duffel test mode — using a duffel_test_ token. Fares are real API results but for demo only.'
        : undefined,
    };
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unable to load flights right now.';
    return searchDemoFlights(input, `Live search failed (${message}). Showing sample flights instead.`);
  }
}

export async function getFlightOfferById(id: string): Promise<ListingItem | null> {
  const record = await db.flightOffer.findUnique({ where: { id } });

  if (!record) {
    return null;
  }

  const listing = record.listingData as ListingItem;
  const offerExpired = record.expiresAt < new Date();
  const metadata = parseListingMetadata({
    ...(typeof listing.metadata === 'object' && listing.metadata !== null ? listing.metadata : {}),
    offerExpired,
  });

  return {
    ...listing,
    id: record.id,
    type: ListingType.FLIGHT,
    price: record.price,
    image: record.image,
    title: record.title,
    owner: listing.owner ?? null,
    metadata,
  };
}

/** Returns the cached offer for checkout. Includes expired fares so pricing stays flat (not nightly). */
export async function getFlightOfferRecord(id: string) {
  return db.flightOffer.findUnique({ where: { id } });
}

export function isFlightOfferBookable(expiresAt: Date) {
  return expiresAt >= new Date();
}
