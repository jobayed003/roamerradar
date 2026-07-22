import { searchFlights } from '@/data/flights';
import FlightsCategory from './_components/FlightsCategory';

type FlightsCategoryPageProps = {
  searchParams: {
    from?: string;
    to?: string;
    departure?: string;
    return?: string;
    notice?: string;
  };
};

const FlightsCategoryPage = async ({ searchParams }: FlightsCategoryPageProps) => {
  const result = await searchFlights({
    from: searchParams.from,
    to: searchParams.to,
    departureDate: searchParams.departure,
    returnDate: searchParams.return,
  });

  const unavailableNotice =
    searchParams.notice === 'fare-unavailable'
      ? 'That fare is no longer available. Search again for current prices.'
      : undefined;

  return (
    <FlightsCategory
      listings={result.listings}
      searchError={result.error}
      searchNotice={unavailableNotice ?? result.notice}
      routeLabel={result.routeLabel}
      source={result.source}
      duffelTestMode={result.duffelTestMode}
      initialSearch={{
        from: searchParams.from,
        to: searchParams.to,
        departure: searchParams.departure,
        return: searchParams.return,
      }}
    />
  );
};

export default FlightsCategoryPage;
