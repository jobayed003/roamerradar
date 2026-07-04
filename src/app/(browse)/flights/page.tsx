import Landing from '@/components/landing';
import { getNearbyDestinations } from '@/data/listing';
import Flights from './_components/Flights';

const FlightPage = async () => {
  const nearbyListings = await getNearbyDestinations();

  return (
    <Landing img='24.avif' heading='Fly, Sleep, Dream' nearbyListings={nearbyListings}>
      <Flights />
    </Landing>
  );
};

export default FlightPage;
