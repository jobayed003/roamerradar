import {
  isDuffelConfigured,
  mapDuffelOfferToListing,
  resolveLocationCode,
  searchFlightOffers,
  type DuffelFlightOffer,
} from '@/lib/duffel';
import { db } from '@/lib/db';
import { ListingItem } from '@/types/listing';
import { addDays, format } from 'date-fns';

const OFFER_TTL_MINUTES = 45;

type SearchFlightsInput = {
  from?: string;
  to?: string;
  departureDate?: string;
  returnDate?: string;
  adults?: number;
};

type SearchFlightsResult = {
  listings: ListingItem[];
  error?: string;
  source: 'duffel' | 'unavailable';
  routeLabel?: string;
};

function defaultDepartureDate() {
  return format(addDays(new Date(), 14), 'yyyy-MM-dd');
}

function defaultReturnDate(departureDate: string) {
  return format(addDays(new Date(departureDate), 7), 'yyyy-MM-dd');
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
  if (!isDuffelConfigured()) {
    return {
      listings: [],
      source: 'unavailable',
      error:
        'Live flight search is not configured. Add DUFFEL_ACCESS_TOKEN to your environment. Sign up at https://duffel.com',
    };
  }

  const fromKeyword = input.from?.trim() || 'NYC';
  const toKeyword = input.to?.trim() || 'LON';
  const departureDate = input.departureDate || defaultDepartureDate();
  const returnDate = input.returnDate || defaultReturnDate(departureDate);

  try {
    const [originCode, destinationCode] = await Promise.all([
      resolveLocationCode(fromKeyword),
      resolveLocationCode(toKeyword),
    ]);

    if (!originCode) {
      return {
        listings: [],
        source: 'duffel',
        error: `Could not find an airport for "${fromKeyword}". Try a city name or 3-letter code (e.g. JFK).`,
      };
    }

    if (!destinationCode) {
      return {
        listings: [],
        source: 'duffel',
        error: `Could not find an airport for "${toKeyword}". Try a city name or 3-letter code (e.g. LHR).`,
      };
    }

    const offers = await searchFlightOffers({
      originCode,
      destinationCode,
      departureDate,
      returnDate,
      adults: input.adults ?? 1,
    });

    if (offers.length === 0) {
      return {
        listings: [],
        source: 'duffel',
        routeLabel: `${originCode} → ${destinationCode}`,
        error: 'No flights found for this route and dates. Try different airports or dates.',
      };
    }

    const listings = await cacheOffers(offers);

    return {
      listings,
      source: 'duffel',
      routeLabel: `${originCode} → ${destinationCode}`,
    };
  } catch (error) {
    return {
      listings: [],
      source: 'duffel',
      error: error instanceof Error ? error.message : 'Unable to load flights right now.',
    };
  }
}

export async function getFlightOfferById(id: string): Promise<ListingItem | null> {
  const record = await db.flightOffer.findUnique({ where: { id } });

  if (!record) {
    return null;
  }

  if (record.expiresAt < new Date()) {
    await db.flightOffer.delete({ where: { id } }).catch(() => undefined);
    return null;
  }

  const listing = record.listingData as ListingItem;

  return {
    ...listing,
    id: record.id,
    price: record.price,
    image: record.image,
    title: record.title,
    owner: listing.owner ?? null,
  };
}

export async function getFlightOfferRecord(id: string) {
  const record = await db.flightOffer.findUnique({ where: { id } });

  if (!record || record.expiresAt < new Date()) {
    return null;
  }

  return record;
}
