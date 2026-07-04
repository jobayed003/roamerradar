import { getListingsByType } from '@/data/listing';
import { ListingType } from '@prisma/client';
import ThingsCategory from './_components/ThingsCategory';

const ThingsCategoryPage = async () => {
  const listings = await getListingsByType(ListingType.EXPERIENCE);

  return <ThingsCategory listings={listings} />;
};

export default ThingsCategoryPage;
