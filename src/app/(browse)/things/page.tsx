import Landing from '@/components/landing';
import Things from './_components/Things';

const ThingsPage = () => {
  return (
    <Landing img='desert.jpg' heading='Things to do' className='w-full items-center text-center'>
      <Things />
    </Landing>
  );
};

export default ThingsPage;
