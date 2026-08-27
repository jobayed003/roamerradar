export const FLIGHT_EXTRA_OPTIONS = [
  { id: 'cabin_bag', label: 'Cabin bag', price: 35, description: 'Priority cabin baggage allowance' },
  { id: 'checked_bag', label: 'Checked bag', price: 55, description: 'One checked bag up to 23kg' },
  { id: 'seat', label: 'Seat selection', price: 25, description: 'Choose your seat at booking' },
] as const;

export type FlightExtraId = (typeof FLIGHT_EXTRA_OPTIONS)[number]['id'];

export function parseFlightExtras(values?: string[] | null) {
  if (!values?.length) return [] as FlightExtraId[];
  const allowed = new Set(FLIGHT_EXTRA_OPTIONS.map((item) => item.id));
  return values.filter((value): value is FlightExtraId => allowed.has(value as FlightExtraId));
}

/** Parse `?extras=cabin_bag,seat` from checkout URLs. */
export function parseFlightExtrasParam(value?: string | null) {
  if (!value?.trim()) return [] as FlightExtraId[];
  return parseFlightExtras(value.split(',').map((part) => part.trim()).filter(Boolean));
}


export function calculateFlightExtrasTotal(extraIds: FlightExtraId[]) {
  return FLIGHT_EXTRA_OPTIONS.filter((option) => extraIds.includes(option.id)).reduce(
    (sum, option) => sum + option.price,
    0
  );
}

export function flightExtrasPayload(extraIds: FlightExtraId[]) {
  return FLIGHT_EXTRA_OPTIONS.filter((option) => extraIds.includes(option.id)).map((option) => ({
    id: option.id,
    label: option.label,
    price: option.price,
  }));
}
