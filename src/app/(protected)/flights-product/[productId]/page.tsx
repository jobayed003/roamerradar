import { getListingById } from '@/data/listing';
import { ListingType } from '@prisma/client';
import { notFound } from 'next/navigation';
import FlightProduct from './_components/Product';

const FlightProductPage = async ({ params }: { params: { productId: string } }) => {
  const listing = await getListingById(params.productId);

  if (!listing || listing.type !== ListingType.FLIGHT) {
    notFound();
  }

  return <FlightProduct listing={listing} />;
};

export default FlightProductPage;
