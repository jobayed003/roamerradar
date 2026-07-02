import { format, parseISO } from 'date-fns';
import { FlightLeg, ListingItem, ListingType } from '@/types/listing';

const AMADEUS_BASE =
  process.env.AMADEUS_ENV === 'production' ? 'https://api.amadeus.com' : 'https://test.api.amadeus.com';

type AmadeusToken = {
  access_token: string;
  expires_in: number;
};

type AmadeusLocation = {
  iataCode?: string;
  name?: string;
};

type AmadeusSegment = {
  departure: { iataCode: string; at: string };
  arrival: { iataCode: string; at: string };
  carrierCode: string;
  number: string;
};

type AmadeusItinerary = {
  segments: AmadeusSegment[];
};

export type AmadeusFlightOffer = {
  id: string;
  itineraries: AmadeusItinerary[];
  price: {
    total: string;
    currency: string;
  };
  validatingAirlineCodes?: string[];
};

type AmadeusFlightOffersResponse = {
  data?: AmadeusFlightOffer[];
  errors?: { title?: string; detail?: string }[];
};

let tokenCache: { token: string; expiresAt: number } | null = null;

export function isAmadeusConfigured() {
  return Boolean(process.env.AMADEUS_API_KEY && process.env.AMADEUS_API_SECRET);
}

export function airlineLogo(carrierCode: string) {
  return `https://images.kiwi.com/airlines/64/${carrierCode}.png`;
}

async function getAccessToken() {
  if (!isAmadeusConfigured()) {
    throw new Error('Amadeus API credentials are not configured.');
  }

  if (tokenCache && Date.now() < tokenCache.expiresAt - 60_000) {
    return tokenCache.token;
  }

  const response = await fetch(`${AMADEUS_BASE}/v1/security/oauth2/token`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: process.env.AMADEUS_API_KEY!,
      client_secret: process.env.AMADEUS_API_SECRET!,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    throw new Error('Unable to authenticate with Amadeus.');
  }

  const data = (await response.json()) as AmadeusToken;

  tokenCache = {
    token: data.access_token,
    expiresAt: Date.now() + data.expires_in * 1000,
  };

  return data.access_token;
}

async function amadeusFetch<T>(path: string): Promise<T> {
  const token = await getAccessToken();
  const response = await fetch(`${AMADEUS_BASE}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Amadeus request failed (${response.status}).`);
  }

  return response.json() as Promise<T>;
}

export async function resolveLocationCode(keyword: string) {
  const trimmed = keyword.trim();

  if (/^[A-Za-z]{3}$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  const response = await amadeusFetch<{ data?: AmadeusLocation[] }>(
    `/v1/reference-data/locations?subType=AIRPORT,CITY&keyword=${encodeURIComponent(trimmed)}&page[limit]=1`
  );

  return response.data?.[0]?.iataCode ?? null;
}

function segmentStopLabel(segmentCount: number) {
  if (segmentCount <= 1) return 'nonstop';
  if (segmentCount === 2) return '1 stop';
  return `${segmentCount - 1} stops`;
}

function itineraryToLeg(itinerary: AmadeusItinerary): FlightLeg {
  const segments = itinerary.segments;
  const first = segments[0];
  const last = segments[segments.length - 1];

  return {
    departingLocation: first.departure.iataCode,
    takeOffTime: format(parseISO(first.departure.at), 'h:mm a'),
    arrivalLocation: last.arrival.iataCode,
    landingTime: format(parseISO(last.arrival.at), 'h:mm a'),
    logo: airlineLogo(first.carrierCode),
    type: segmentStopLabel(segments.length),
  };
}

export function mapAmadeusOfferToListing(offer: AmadeusFlightOffer): Omit<ListingItem, 'id'> {
  const legs = offer.itineraries.map(itineraryToLeg);
  const carrier = offer.itineraries[0]?.segments[0]?.carrierCode ?? 'XX';
  const origin = legs[0]?.departingLocation ?? '—';
  const destination = legs[legs.length - 1]?.arrivalLocation ?? '—';
  const price = Number.parseFloat(offer.price.total);

  return {
    type: ListingType.FLIGHT,
    title: `${origin} to ${destination} Round Trip`,
    description: `Live fare from Amadeus · ${carrier}`,
    location: `${origin} → ${destination}`,
    image: airlineLogo(carrier),
    price: Number.isFinite(price) ? price : 0,
    offerPrice: null,
    rating: 4.5,
    reviewCount: 0,
    amenities: [],
    metadata: {
      provider: 'Amadeus',
      legs,
    },
    isFeatured: false,
    isPopular: false,
    driveTime: null,
    placesCount: null,
    owner: null,
  };
}

export async function searchFlightOffers({
  originCode,
  destinationCode,
  departureDate,
  returnDate,
  adults = 1,
  max = 12,
}: {
  originCode: string;
  destinationCode: string;
  departureDate: string;
  returnDate?: string;
  adults?: number;
  max?: number;
}) {
  const params = new URLSearchParams({
    originLocationCode: originCode,
    destinationLocationCode: destinationCode,
    departureDate,
    adults: String(adults),
    currencyCode: 'USD',
    max: String(max),
    nonStop: 'false',
  });

  if (returnDate) {
    params.set('returnDate', returnDate);
  }

  const response = await amadeusFetch<AmadeusFlightOffersResponse>(
    `/v2/shopping/flight-offers?${params.toString()}`
  );

  if (response.errors?.length) {
    const message = response.errors.map((error) => error.detail ?? error.title).filter(Boolean).join(' ');
    throw new Error(message || 'No flights found for this route.');
  }

  return response.data ?? [];
}
