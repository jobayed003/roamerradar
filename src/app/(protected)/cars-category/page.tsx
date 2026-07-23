import { getListingsByType } from '@/data/listing';
import { getPlaceCountryMap } from '@/data/places';
import { ListingType } from '@prisma/client';
import CarsCategory from './_components/CarsCategory';

const CarsCategoryPage = async ({ searchParams }: { searchParams: { q?: string } }) => {
  const initialQuery = searchParams.q?.trim() ?? '';
  const [listings, placeCountryMap] = await Promise.all([
    getListingsByType(ListingType.CAR),
    getPlaceCountryMap(),
  ]);

  return (
    <CarsCategory
      listings={listings}
      placeCountryMap={placeCountryMap}
      initialQuery={initialQuery}
    />
  );
};

export default CarsCategoryPage;
