import { getListingsByType } from '@/data/listing';
import { ListingType } from '@prisma/client';
import Wishlist from './_components/Wishlist';

const WishlistPage = async () => {
  const [stays, flights, cars, experiences] = await Promise.all([
    getListingsByType(ListingType.STAY),
    getListingsByType(ListingType.FLIGHT),
    getListingsByType(ListingType.CAR),
    getListingsByType(ListingType.EXPERIENCE),
  ]);

  return <Wishlist stays={stays} flights={flights} cars={cars} experiences={experiences} />;
};

export default WishlistPage;
