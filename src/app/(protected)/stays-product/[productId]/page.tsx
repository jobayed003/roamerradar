import { auth } from '@/auth';
import { getListingById } from '@/data/listing';
import { canUserReviewListing, getReviewsByListingId } from '@/data/review';
import { isListingWishlisted } from '@/data/wishlist';
import { notFound } from 'next/navigation';
import Product from './_components/Product';

const StayProductPage = async ({ params }: { params: { productId: string } }) => {
  const listing = await getListingById(params.productId);

  if (!listing) {
    notFound();
  }

  const session = await auth();
  const [reviews, wishlisted, canReview] = await Promise.all([
    getReviewsByListingId(listing.id),
    isListingWishlisted(session?.user?.id, listing.id),
    canUserReviewListing(session?.user?.id, listing.id),
  ]);

  return (
    <Product listing={listing} reviews={reviews} wishlisted={wishlisted} canReview={canReview} />
  );
};

export default StayProductPage;
