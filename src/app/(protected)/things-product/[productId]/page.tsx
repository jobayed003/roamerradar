import { auth } from '@/auth';
import { getListingById, getListingsByType } from '@/data/listing';
import { canUserReviewListing, getReviewsByListingId } from '@/data/review';
import { isListingWishlisted } from '@/data/wishlist';
import { ListingType } from '@prisma/client';
import { notFound } from 'next/navigation';
import Product from './_components/Product';

const ThingsProductPage = async ({ params }: { params: { productId: string } }) => {
  const listing = await getListingById(params.productId);

  if (!listing) {
    notFound();
  }

  const session = await auth();
  const [reviews, wishlisted, canReview, related] = await Promise.all([
    getReviewsByListingId(listing.id),
    isListingWishlisted(session?.user?.id, listing.id),
    canUserReviewListing(session?.user?.id, listing.id),
    getListingsByType(ListingType.EXPERIENCE),
  ]);

  const relatedListings = related.filter((item) => item.id !== listing.id).slice(0, 6);

  return (
    <Product
      listing={listing}
      reviews={reviews}
      wishlisted={wishlisted}
      canReview={canReview}
      relatedListings={relatedListings}
    />
  );
};

export default ThingsProductPage;
