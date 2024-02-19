import Image from 'next/image';
import { useMediaQuery } from 'usehooks-ts';
import CTAButton from '../CTAButton';

const Travel = () => {
  const matches = useMediaQuery('(max-width: 1024px)');
  return (
    <div className='lg:p-8 p-4 flex flex-col md:items-center mt-10 gap-y-10 md:gap-y-24'>
      <div className='md:text-center md:max-w-2xl max-w-xl'>
        <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>
          Travel to make memories all around the world
        </h1>
        <p className='lg:text-2xl md:text-md text-sm my-4 text-[--text-primary] font-poppins'>
          Find trips that fit a flexible lifestyle
        </p>
      </div>

      <div className='grid lg:grid-cols-2 lg:grid-rows-1 grid-rows-2 md:gap-x-8 gap-y-8'>
        <div className='flex flex-col lg:justify-between justify-evenly lg:gap-y-5'>
          <div className='flex flex-col gap-y-5'>
            <span className='w-max px-2.5 rounded-full text-white text-md font-[500] bg-[#8BC5E5]'>01</span>
            <h1 className='text-2xl font-[600]'>Find the trips that fit a flexible lifestyle</h1>
            <p>
              Experience the joy of travel without the constraints of rigid planning. Discover, explore, and live life
              on your own terms with trips that truly fit your lifestyle
            </p>
          </div>
          <div className='flex flex-col gap-y-5'>
            <span className='w-max px-2.5 rounded-full text-white text-md font-[500] bg-[#92A5EF]'>02</span>
            <h1 className='text-2xl font-[600]'>Travel with more confidence</h1>
            <p>
              Embark on your adventures with the confidence that comes from knowing you&apos;re in good hands, no matter
              where your journey takes you
            </p>
          </div>
          <div className='flex flex-col gap-y-5'>
            <span className='w-max px-2.5 rounded-full text-white text-md font-[500] bg-[#58C27D]'>03</span>

            <h1 className='text-2xl font-[600]'>See what&apos;s really included</h1>
            <p>
              Ensures transparency with no hidden costs or surprises, providing a clear outline of what you&apos;re
              signing up for. Dive in, explore the details, and focus on the thrill of your next adventure
            </p>
          </div>
          <div className='lg:w-max text-center md:mt-0 mt-8'>
            <CTAButton />
          </div>
        </div>
        <div className='flex lg:justify-end justify-center'>
          <Image
            width={matches ? 700 : 500}
            height={300}
            className='object-contain lg:max-w-[100%] rounded-3xl'
            src={'/images/travel-1.jpg'}
            alt='travel pic'
          />
        </div>
      </div>
    </div>
  );
};

export default Travel;
