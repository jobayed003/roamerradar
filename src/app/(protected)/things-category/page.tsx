import { getListingsByType } from '@/data/listing';
import { getPlaceCountryMap } from '@/data/places';
import { ListingType } from '@prisma/client';
import ThingsCategory from './_components/ThingsCategory';

const ThingsCategoryPage = async ({
  searchParams,
}: {
  searchParams: { q?: string; filter?: string; sort?: string };
}) => {
  const locationQuery = searchParams.q?.trim() ?? '';
  const [listings, placeCountryMap] = await Promise.all([
    getListingsByType(ListingType.EXPERIENCE, {
      locationQuery: locationQuery || undefined,
      filter: searchParams.filter,
      sort: searchParams.sort,
    }),
    getPlaceCountryMap(),
  ]);

  return (
    <ThingsCategory
      listings={listings}
      placeCountryMap={placeCountryMap}
      initialQuery={locationQuery}
    />
  );
};

export default ThingsCategoryPage;
