import Landing from '@/components/landing';
import Flights from './_components/Flights';
import TripType from './_components/TripType';

const FlightPage = () => {
  return (
    <Landing img='24.avif' heading='Fly, Sleep, Dream'>
      <div>
        <TripType />
        <Flights />
      </div>
    </Landing>
  );
};

export default FlightPage;
