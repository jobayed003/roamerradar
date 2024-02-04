import Landing from '@/components/landing';
import Flights from '../_components/Flights';

const FlightPage = () => {
  return (
    <Landing img='24.avif' heading='Fly, Sleep, Dream'>
      <Flights />
    </Landing>
  );
};

export default FlightPage;
