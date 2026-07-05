import { searchFlights } from '@/data/flights';
import FlightsCategory from './_components/FlightsCategory';

type FlightsCategoryPageProps = {
  searchParams: {
    from?: string;
    to?: string;
    departure?: string;
    return?: string;
  };
};

const FlightsCategoryPage = async ({ searchParams }: FlightsCategoryPageProps) => {
  const result = await searchFlights({
    from: searchParams.from,
    to: searchParams.to,
    departureDate: searchParams.departure,
    returnDate: searchParams.return,
  });

  return (
    <FlightsCategory
      listings={result.listings}
      searchError={result.error}
      routeLabel={result.routeLabel}
      source={result.source}
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
