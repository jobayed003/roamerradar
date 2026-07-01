import Landing from '@/components/landing';
import { getNearbyDestinations } from '@/data/listing';
import Cars from './_components/Cars';

const CarsPage = async () => {
  const nearbyListings = await getNearbyDestinations();

  return (
    <Landing img='cars.jpg' heading='Car Rentals' className='w-full items-center ' nearbyListings={nearbyListings}>
      <Cars />
    </Landing>
  );
};

export default CarsPage;
