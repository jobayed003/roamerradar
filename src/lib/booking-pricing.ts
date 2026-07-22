import { differenceInCalendarDays, format, isValid, parseISO, startOfDay } from 'date-fns';
import qs from 'query-string';

export type StayPricingInput = {
  nightlyRate: number;
  checkIn: Date;
  checkOut: Date;
  serviceFeeRate?: number;
};

export type StayPricingResult = {
  nights: number;
  nightlyRate: number;
  subtotal: number;
  serviceFee: number;
  total: number;
  checkIn: Date;
  checkOut: Date;
};

export function parseBookingDate(value?: string | null) {
  if (!value?.trim()) return undefined;

  const parsed = parseISO(value.trim());
  return isValid(parsed) ? startOfDay(parsed) : undefined;
}

export function getNightsBetween(checkIn: Date, checkOut: Date) {
  const nights = differenceInCalendarDays(startOfDay(checkOut), startOfDay(checkIn));
  return Math.max(1, nights);
}

export function ensureStayDateRange(checkIn?: Date, checkOut?: Date) {
  const from = checkIn ? startOfDay(checkIn) : startOfDay(new Date());
  let to = checkOut ? startOfDay(checkOut) : undefined;

  if (!to || to <= from) {
    to = new Date(from);
    to.setDate(to.getDate() + 1);
  }

  return { checkIn: from, checkOut: to, nights: getNightsBetween(from, to) };
}

export function calculateStayPricing({
  nightlyRate,
  checkIn,
  checkOut,
  serviceFeeRate = 0.07,
}: StayPricingInput): StayPricingResult {
  const range = ensureStayDateRange(checkIn, checkOut);
  const subtotal = Math.round(nightlyRate * range.nights * 100) / 100;
  const serviceFee = Math.round(subtotal * serviceFeeRate * 100) / 100;
  const total = Math.round((subtotal + serviceFee) * 100) / 100;

  return {
    nights: range.nights,
    nightlyRate,
    subtotal,
    serviceFee,
    total,
    checkIn: range.checkIn,
    checkOut: range.checkOut,
  };
}

export function formatStayDate(date: Date) {
  return format(date, 'MMM d, yyyy');
}

export function toDateParam(date: Date) {
  return format(date, 'yyyy-MM-dd');
}

export function buildCheckoutUrl({
  itemId,
  checkIn,
  checkOut,
  guests,
}: {
  itemId: string;
  checkIn?: Date;
  checkOut?: Date;
  guests?: number;
}) {
  const query: Record<string, string | number> = {};

  if (checkIn) query.checkIn = toDateParam(checkIn);
  if (checkOut) query.checkOut = toDateParam(checkOut);
  if (guests && guests > 0) query.guests = guests;

  return qs.stringifyUrl({ url: `/checkout/${itemId}`, query }, { skipNull: true, skipEmptyString: true });
}
