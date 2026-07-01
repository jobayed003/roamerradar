import { getListingCountByType, getListingsByType } from '@/data/listing';
import { ListingType } from '@prisma/client';
import StayCategory from './_components/StayCategory';

const StaysCategoryPage = async () => {
  const listings = await getListingsByType(ListingType.STAY);
  const totalCount = await getListingCountByType(ListingType.STAY);

  return <StayCategory listings={listings} totalCount={totalCount} />;
};

export default StaysCategoryPage;
