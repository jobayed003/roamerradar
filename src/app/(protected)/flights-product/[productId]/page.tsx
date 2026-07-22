import { getListingById } from '@/data/listing';
import { ListingType } from '@prisma/client';
import { redirect } from 'next/navigation';
import FlightProduct from './_components/Product';

const FlightProductPage = async ({ params }: { params: { productId: string } }) => {
  const listing = await getListingById(params.productId);

  if (!listing || listing.type !== ListingType.FLIGHT) {
    // Cached Duffel offers used to be deleted on expiry, which left dead product URLs.
    redirect('/flights-category?notice=fare-unavailable');
  }

  return <FlightProduct listing={listing} />;
};

export default FlightProductPage;
