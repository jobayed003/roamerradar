import { auth } from '@/auth';
import { getWishlistListings } from '@/data/wishlist';
import { redirect } from 'next/navigation';
import Wishlist from './_components/Wishlist';

const WishlistPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/wishlists');
  }

  const listings = await getWishlistListings(session.user.id);

  return <Wishlist listings={listings} />;
};

export default WishlistPage;
