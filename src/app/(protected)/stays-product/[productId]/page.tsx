import { getListingById } from '@/data/listing';
import { getReviewsByListingId } from '@/data/review';
import { notFound } from 'next/navigation';
import Product from './_components/Product';

const StayProductPage = async ({ params }: { params: { productId: string } }) => {
  const listing = await getListingById(params.productId);

  if (!listing) {
    notFound();
  }

  const reviews = await getReviewsByListingId(listing.id);

  return <Product listing={listing} reviews={reviews} />;
};

export default StayProductPage;
