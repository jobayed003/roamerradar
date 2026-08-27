import { env, isDuffelConfigured, isDuffelTestMode } from '@/env';
import { isDuffelOfferId } from '@/lib/duffel-offer-id';
import { format, parseISO } from 'date-fns';
import { FlightLeg, ListingItem, ListingType } from '@/types/listing';

export { isDuffelOfferId };

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

export type DuffelOfferPassenger = {
  id: string;
  type?: string;
  given_name?: string | null;
  family_name?: string | null;
};

export type DuffelFlightOffer = {
  id: string;
  total_amount: string;
  total_currency: string;
  live_mode?: boolean;
  slices: DuffelSlice[];
  passengers?: DuffelOfferPassenger[];
  owner?: { name?: string };
  payment_requirements?: {
    requires_instant_payment?: boolean;
  };
};

export type FlightPassengerInput = {
  id: string;
  title: 'mr' | 'mrs' | 'ms' | 'miss' | 'dr';
  givenName: string;
  familyName: string;
  email: string;
  phoneNumber: string;
  bornOn: string;
  gender: 'm' | 'f';
};

type DuffelOfferRequestResponse = {
  data?: {
    offers?: DuffelFlightOffer[];
    passengers?: DuffelOfferPassenger[];
  };
  errors?: { title?: string; message?: string }[];
};

type DuffelOfferResponse = {
  data?: DuffelFlightOffer;
  errors?: { title?: string; message?: string }[];
};

type DuffelOrderResponse = {
  data?: {
    id: string;
    booking_reference?: string;
    live_mode?: boolean;
  };
  errors?: { title?: string; message?: string }[];
};

type DuffelPlacesResponse = {
  data?: DuffelPlace[];
};

export { isDuffelConfigured };

/** RoamerRadar never creates live airline tickets — only Duffel sandbox (`duffel_test_`). */
export function assertDuffelTestModeForOrders() {
  if (!isDuffelConfigured()) {
    throw new Error('Duffel is not configured.');
  }

  if (!isDuffelTestMode()) {
    throw new Error(
      'Live Duffel tokens cannot create airline orders. Use a duffel_test_ token for sandbox bookings only.'
    );
  }
}

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

export function parseCachedDuffelOffer(offerData: unknown): DuffelFlightOffer | null {
  if (!offerData || typeof offerData !== 'object') return null;
  const offer = offerData as DuffelFlightOffer;
  if (!isDuffelOfferId(offer.id)) return null;
  return offer;
}

export async function getDuffelOffer(offerId: string) {
  assertDuffelTestModeForOrders();

  const response = await duffelFetch<DuffelOfferResponse>(`/air/offers/${offerId}`);

  if (response.errors?.length) {
    const message = response.errors.map((error) => error.message ?? error.title).filter(Boolean).join(' ');
    throw new Error(message || 'Unable to refresh this fare.');
  }

  if (!response.data) {
    throw new Error('Offer not found.');
  }

  if (response.data.live_mode === true) {
    throw new Error('Refusing to book a live-mode offer. Test bookings only.');
  }

  return response.data;
}

/**
 * Creates a Duffel sandbox hold order (not a real airline ticket).
 * Hard-blocked unless the access token is `duffel_test_…`.
 */
export async function createDuffelTestHoldOrder({
  offerId,
  passengers,
}: {
  offerId: string;
  passengers: FlightPassengerInput[];
}) {
  assertDuffelTestModeForOrders();

  if (!isDuffelOfferId(offerId)) {
    throw new Error('Invalid Duffel offer id.');
  }

  const offer = await getDuffelOffer(offerId);

  if (offer.payment_requirements?.requires_instant_payment) {
    throw new Error('This fare requires instant airline payment and cannot be held as a test booking.');
  }

  const response = await duffelFetch<DuffelOrderResponse>('/air/orders', {
    method: 'POST',
    body: JSON.stringify({
      data: {
        // Hold = sandbox reservation only; omit payments so we never charge Duffel balance.
        type: 'hold',
        selected_offers: [offer.id],
        passengers: passengers.map((passenger) => ({
          id: passenger.id,
          title: passenger.title,
          gender: passenger.gender,
          given_name: passenger.givenName,
          family_name: passenger.familyName,
          email: passenger.email,
          phone_number: passenger.phoneNumber,
          born_on: passenger.bornOn,
        })),
      },
    }),
  });

  if (response.errors?.length) {
    const message = response.errors.map((error) => error.message ?? error.title).filter(Boolean).join(' ');
    throw new Error(message || 'Unable to create Duffel test order.');
  }

  if (!response.data?.id) {
    throw new Error('Duffel did not return an order id.');
  }

  if (response.data.live_mode === true) {
    throw new Error('Refusing to keep a live-mode airline order. Test bookings only.');
  }

  return {
    orderId: response.data.id,
    bookingReference: response.data.booking_reference ?? null,
    liveMode: false as const,
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
        passengers: Array.from({ length: Math.max(1, adults) }, () => ({ type: 'adult' })),
        cabin_class: 'economy',
      },
    }),
  });

  if (response.errors?.length) {
    const message = response.errors.map((error) => error.message ?? error.title).filter(Boolean).join(' ');
    throw new Error(message || 'No flights found for this route.');
  }

  const requestPassengers = response.data?.passengers ?? [];
  const offers = response.data?.offers ?? [];

  return offers.slice(0, max).map((offer) => ({
    ...offer,
    passengers:
      offer.passengers && offer.passengers.length > 0 ? offer.passengers : requestPassengers,
  }));
}
