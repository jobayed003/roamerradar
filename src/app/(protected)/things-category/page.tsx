import { getListingsByType } from '@/data/listing';
import { getPlaceCountryMap } from '@/data/places';
import { ListingType } from '@prisma/client';
import ThingsCategory from './_components/ThingsCategory';

const ThingsCategoryPage = async () => {
  const [listings, placeCountryMap] = await Promise.all([
    getListingsByType(ListingType.EXPERIENCE),
    getPlaceCountryMap(),
  ]);

  return <ThingsCategory listings={listings} placeCountryMap={placeCountryMap} />;
};

export default ThingsCategoryPage;
