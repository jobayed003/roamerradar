import Landing from '@/components/landing';
import { getNearbyDestinations } from '@/data/listing';
import Stays from './_components/Stays';

export default async function StaysPage() {
  const nearbyListings = await getNearbyDestinations();

  return (
    <Landing img='stays.jpg' heading='Fly, Sleep, Dream' nearbyListings={nearbyListings}>
      <Stays />
    </Landing>
  );
}
