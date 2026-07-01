import { getListingsByType } from '@/data/listing';
import { ListingType } from '@prisma/client';
import FlightsCategory from './_components/FlightsCategory';

const FlightsCategoryPage = async () => {
  const listings = await getListingsByType(ListingType.FLIGHT);

  return <FlightsCategory listings={listings} />;
};

export default FlightsCategoryPage;
