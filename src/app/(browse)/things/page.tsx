import Landing from '@/components/landing';
import { getNearbyDestinations } from '@/data/listing';
import Things from './_components/Things';

const ThingsPage = async () => {
  const nearbyListings = await getNearbyDestinations();

  return (
    <Landing
      img='desert.jpg'
      heading='Things to do'
      className='w-full items-center text-center'
      nearbyListings={nearbyListings}
    >
      <Things />
    </Landing>
  );
};

export default ThingsPage;
