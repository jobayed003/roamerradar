import { env, isDuffelConfigured } from '@/env';
import { format, parseISO } from 'date-fns';
import { FlightLeg, ListingItem, ListingType } from '@/types/listing';

const DUFFEL_API_BASE = 'https://api.duffel.com';

type DuffelPlace = {
  type: 'airport' | 'city';
  iata_code: string;
  name: string;
};

type DuffelCarrier = {
  iata_code?: string;
  name?: string;
};

type DuffelSegment = {
  departing_at: string;
  arriving_at: string;
  origin: { iata_code: string };
  destination: { iata_code: string };
  operating_carrier: DuffelCarrier;
  marketing_carrier?: DuffelCarrier;
};

type DuffelSlice = {
  segments: DuffelSegment[];
};

export type DuffelFlightOffer = {
  id: string;
  total_amount: string;
  total_currency: string;
  slices: DuffelSlice[];
  owner?: { name?: string };
};

type DuffelOfferRequestResponse = {
  data?: {
    offers?: DuffelFlightOffer[];
  };
  errors?: { title?: string; message?: string }[];
};

type DuffelPlacesResponse = {
  data?: DuffelPlace[];
};

export { isDuffelConfigured };

export function airlineLogo(carrierCode: string) {
  return `https://images.kiwi.com/airlines/64/${carrierCode}.png`;
}

function getDuffelHeaders() {
  if (!isDuffelConfigured()) {
    throw new Error('Duffel API token is not configured.');
  }

  return {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'Duffel-Version': 'v2',
    Authorization: `Bearer ${env.DUFFEL_ACCESS_TOKEN}`,
  };
}

async function duffelFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${DUFFEL_API_BASE}${path}`, {
    ...init,
    headers: {
      ...getDuffelHeaders(),
      ...init?.headers,
    },
    cache: 'no-store',
  });

  if (!response.ok) {
    const body = await response.text();
    throw new Error(body || `Duffel request failed (${response.status}).`);
  }

  return response.json() as Promise<T>;
}

export async function resolveLocationCode(keyword: string) {
  const trimmed = keyword.trim();

  if (/^[A-Za-z]{3}$/.test(trimmed)) {
    return trimmed.toUpperCase();
  }

  const response = await duffelFetch<DuffelPlacesResponse>(
    `/places/suggestions?query=${encodeURIComponent(trimmed)}`
  );

  return response.data?.[0]?.iata_code ?? null;
}

function segmentStopLabel(segmentCount: number) {
  if (segmentCount <= 1) return 'nonstop';
  if (segmentCount === 2) return '1 stop';
  return `${segmentCount - 1} stops`;
}

function sliceToLeg(slice: DuffelSlice): FlightLeg {
  const segments = slice.segments;
  const first = segments[0];
  const last = segments[segments.length - 1];
  const carrier =
    first.operating_carrier?.iata_code ?? first.marketing_carrier?.iata_code ?? 'XX';

  return {
    departingLocation: first.origin.iata_code,
    takeOffTime: format(parseISO(first.departing_at), 'h:mm a'),
    arrivalLocation: last.destination.iata_code,
    landingTime: format(parseISO(last.arriving_at), 'h:mm a'),
    logo: airlineLogo(carrier),
    type: segmentStopLabel(segments.length),
  };
}

export function mapDuffelOfferToListing(offer: DuffelFlightOffer): Omit<ListingItem, 'id'> {
  const legs = offer.slices.map(sliceToLeg);
  const carrier =
    offer.slices[0]?.segments[0]?.operating_carrier?.iata_code ??
    offer.slices[0]?.segments[0]?.marketing_carrier?.iata_code ??
    'XX';
  const origin = legs[0]?.departingLocation ?? '—';
  const destination = legs[legs.length - 1]?.arrivalLocation ?? '—';
  const price = Number.parseFloat(offer.total_amount);

  return {
    type: ListingType.FLIGHT,
    title: `${origin} to ${destination} Round Trip`,
    description: `Live fare from Duffel · ${carrier}`,
    location: `${origin} → ${destination}`,
    image: airlineLogo(carrier),
    price: Number.isFinite(price) ? price : 0,
    offerPrice: null,
    rating: 4.5,
    reviewCount: 0,
    amenities: [],
    metadata: {
      provider: 'Duffel',
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
  const slices = [
    {
      origin: originCode,
      destination: destinationCode,
      departure_date: departureDate,
    },
  ];

  if (returnDate) {
    slices.push({
      origin: destinationCode,
      destination: originCode,
      departure_date: returnDate,
    });
  }

  const response = await duffelFetch<DuffelOfferRequestResponse>('/air/offer_requests', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        slices,
        passengers: Array.from({ length: adults }, () => ({ type: 'adult' })),
        cabin_class: 'economy',
      },
    }),
  });

  if (response.errors?.length) {
    const message = response.errors.map((error) => error.message ?? error.title).filter(Boolean).join(' ');
    throw new Error(message || 'No flights found for this route.');
  }

  const offers = response.data?.offers ?? [];

  return offers.slice(0, max);
}
