import { getListingCountByType, getListingsByType } from '@/data/listing';
import { getPlaceCountryMap, getPlaceNames } from '@/data/places';
import { ListingType } from '@prisma/client';
import StayCategory from './_components/StayCategory';

const StaysCategoryPage = async ({ searchParams }: { searchParams: { q?: string } }) => {
  const location = searchParams.q ?? 'Grand Canyon';
  const [listings, totalCount, placeNames, placeCountryMap] = await Promise.all([
    getListingsByType(ListingType.STAY, location),
    getListingCountByType(ListingType.STAY, location),
    getPlaceNames(),
    getPlaceCountryMap(),
  ]);

  return (
    <StayCategory
      listings={listings}
      totalCount={totalCount}
      placeNames={placeNames}
      placeCountryMap={placeCountryMap}
    />
  );
};

export default StaysCategoryPage;
