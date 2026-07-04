import { getListingsByType } from '@/data/listing';
import { ListingType } from '@prisma/client';
import CarsCategory from './_components/CarsCategory';

const CarsCategoryPage = async () => {
  const listings = await getListingsByType(ListingType.CAR);

  return <CarsCategory listings={listings} />;
};

export default CarsCategoryPage;
