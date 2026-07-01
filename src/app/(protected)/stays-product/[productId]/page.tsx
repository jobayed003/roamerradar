import { getListingById } from '@/data/listing';
import { notFound } from 'next/navigation';
import Product from './_components/Product';

const StayProductPage = async ({ params }: { params: { productId: string } }) => {
  const listing = await getListingById(params.productId);

  if (!listing) {
    notFound();
  }

  return <Product listing={listing} />;
};

export default StayProductPage;
