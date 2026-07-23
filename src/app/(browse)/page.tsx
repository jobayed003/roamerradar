import Landing from '@/components/landing';
import { getNearbyDestinations } from '@/data/listing';
import { getPlaceNames } from '@/data/places';
import Stays from './_components/Stays';

export default async function StaysPage() {
  const [nearbyListings, placeNames] = await Promise.all([
    getNearbyDestinations(),
    getPlaceNames(),
  ]);

  return (
    <Landing img='stays.jpg' heading='Fly, Sleep, Dream' nearbyListings={nearbyListings}>
      <Stays placeNames={placeNames} />
    </Landing>
  );
}
