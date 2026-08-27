import { getListingById } from '@/data/listing';
import { isListingWishlisted } from '@/data/wishlist';
import { auth } from '@/auth';
import { ListingType } from '@prisma/client';
import { redirect } from 'next/navigation';
import FlightProduct from './_components/Product';

const FlightProductPage = async ({ params }: { params: { productId: string } }) => {
  const listing = await getListingById(params.productId);

  if (!listing || listing.type !== ListingType.FLIGHT) {
    redirect('/flights-category?notice=fare-unavailable');
  }

  const session = await auth();
  const wishlisted = await isListingWishlisted(session?.user?.id, listing.id);

  return <FlightProduct listing={listing} wishlisted={wishlisted} />;
};

export default FlightProductPage;
