import { getListingCountByType, getListingsByType } from '@/data/listing';
import { ListingType } from '@prisma/client';
import StayCategory from './_components/StayCategory';

const StaysCategoryPage = async ({ searchParams }: { searchParams: { q?: string } }) => {
  const location = searchParams.q ?? 'Grand Canyon';
  const listings = await getListingsByType(ListingType.STAY, location);
  const totalCount = await getListingCountByType(ListingType.STAY, location);

  return <StayCategory listings={listings} totalCount={totalCount} />;
};

export default StaysCategoryPage;
