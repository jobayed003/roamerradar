import Landing from '@/components/landing';
import Cars from './_components/Cars';

const CarsPage = () => {
  return (
    <Landing img='cars.jpg' heading='Car Rentals' className='w-full items-center '>
      <Cars />
    </Landing>
  );
};

export default CarsPage;
