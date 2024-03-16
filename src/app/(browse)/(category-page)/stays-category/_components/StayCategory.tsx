import Stays from '@/app/(browse)/_components/Stays';
import HeroSection from '@/components/HeroSection';

const StayCategory = () => {
  return (
    <div className='px-2 lg:max-w-7xl mx-auto'>
      <HeroSection img='images/main-2.jpg' className='mt-4'>
        <Stays />
      </HeroSection>
    </div>
  );
};

export default StayCategory;
