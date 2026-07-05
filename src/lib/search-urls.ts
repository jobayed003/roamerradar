import { format, parseISO } from 'date-fns';
import qs from 'query-string';

export type FlightsSearchParams = {
  from?: string;
  to?: string;
  departure?: string;
  return?: string;
};

export function buildFlightsSearchUrl(params: {
  from?: string;
  to?: string;
  departure?: Date;
  return?: Date;
  isOneWay?: boolean;
}) {
  const query: Record<string, string> = {};
  const from = params.from?.trim();
  const to = params.to?.trim();

  if (from) query.from = from;
  if (to) query.to = to;
  if (params.departure) query.departure = format(params.departure, 'yyyy-MM-dd');
  if (params.return && !params.isOneWay) query.return = format(params.return, 'yyyy-MM-dd');

  return qs.stringifyUrl({ url: '/flights-category', query }, { skipEmptyString: true });
}

export function parseFlightsSearchParams(params: FlightsSearchParams) {
  return {
    from: params.from?.trim() ?? '',
    to: params.to?.trim() ?? '',
    departure: params.departure ? parseISO(params.departure) : undefined,
    returnDate: params.return ? parseISO(params.return) : undefined,
  };
}
