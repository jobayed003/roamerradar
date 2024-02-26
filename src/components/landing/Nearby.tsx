import { Home } from 'lucide-react';
import Image from 'next/image';
import { CarouselProvider } from '../CarouselProvider';
import { CarouselItem } from '../ui/carousel';

const Nearby = () => {
  return (
    <div className='mt-32 pb-32 sm:px-20 px-4 relative'>
      <div className=''>
        <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Explore nearby</h1>
        <p className='lg:text-2xl md:text-md text-sm my-4 text-[--text-primary] font-poppins -r'>
          Let&apos;s go on an adventure
        </p>
      </div>

      <CarouselProvider buttonClasses='sm:absolute -top-[6.5rem] -right-[2rem]' className=''>
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index} className='pl-1 lg:basis-1/4 md:basis-1/3 min-[400px]:basis-1/2'>
            <div className='flex flex-col justify-center gap-y-5 my-20 relative mx-8 min-[400px]:mx-4'>
              <Image
                className='rounded-3xl hover:scale-105 duration-500  transition-all'
                src={`/images/browse-${index + 1 > 3 ? index - 2 : index + 1}.jpg`}
                alt='nearby image'
                width={250}
                height={300}
              />
              <div className='absolute top-4 left-8 bg-foreground rounded-full text-[#23262F] shadow-custom font-bold font-poppins text-xs px-4 py-1 uppercase'>
                20% off
              </div>

              <div>
                <h1 className='font-medium'>Nature House</h1>
                <div className='flex items-center gap-1 text-[--text-primary] mt-1'>
                  <Home className='h-4 w-4' />
                  <p className='text-xs font-poppins font-semibold mt-1'>{(index + 23 * 32332).toLocaleString()}</p>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselProvider>
    </div>
  );
};

export default Nearby;
