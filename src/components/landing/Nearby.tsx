import { products } from '@/lib/constants';
import { Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { CarouselProvider } from '../CarouselProvider';
import { CarouselItem } from '../ui/carousel';

const Nearby = () => {
  return (
    <div className='mt-32 pb-32 relative'>
      <div className='sm:px-20 px-4 '>
        <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Explore nearby</h1>
        <p className='lg:text-2xl md:text-md text-sm my-4 text-[--text-primary] font-poppins'>
          Let&apos;s go on an adventure
        </p>

        <CarouselProvider buttonClasses='sm:absolute sm:-top-[6.5rem] right-0'>
          {Array.from({ length: 6 }).map((_, index) => (
            <CarouselItem key={index} className='pl-1 lg:basis-1/4 md:basis-1/3 min-[400px]:basis-1/2 basis-full'>
              <Link href={'/stays-category'} className='overflow-hidden'>
                <div className='flex flex-col justify-center gap-y-5 my-20 relative mx-8 min-[400px]:mx-4'>
                  <div className='w-full relative overflow-hidden rounded-xl'>
                    <Image
                      className='rounded-xl hover:scale-105 duration-500 transition-all'
                      src={`/images/browse-${index + 1 > 3 ? index - 2 : index + 1}.jpg`}
                      alt='nearby image'
                      width={250}
                      height={300}
                    />
                  </div>
                  <div className='absolute top-4 left-4 bg-foreground rounded-full text-[#23262F] shadow-custom font-bold font-poppins text-xs px-4 py-1 uppercase'>
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
              </Link>
            </CarouselItem>
          ))}
        </CarouselProvider>
      </div>

      <div className='bg-[#F4F5F6] dark:bg-[#18191D] dark:border-2 dark:border-[#23262F] rounded-2xl lg:p-20 p-5'>
        <div className='text-center py-8'>
          <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Explore nearby</h1>
          <p className='lg:text-2xl md:text-md text-sm my-4 text-[--text-primary] font-poppins -r'>
            10,789 beautiful places to go
          </p>
        </div>
        <div className='md:flex hidden flex-wrap justify-center gap-x-8 gap-y-16 my-16 md'>
          {products
            .sort((a, b) => a.placesNumber - b.placesNumber)
            .map((product) => (
              <NearbyProduct key={product.title} {...product} />
            ))}
        </div>

        <div className='md:hidden block'>
          <CarouselProvider buttonClasses='my-16'>
            {products
              .sort((a, b) => a.placesNumber - b.placesNumber)
              .map((product, index) => (
                <CarouselItem key={index} className='pl-1 md:basis-1/2 min-[400px]:basis-1/2'>
                  <NearbyProduct key={product.title} {...product} />
                </CarouselItem>
              ))}
          </CarouselProvider>
        </div>
      </div>
    </div>
  );
};

type NearbyProductProps = {
  placesNumber: number;
  image: string;
  title: string;
  time: string;
};

const NearbyProduct = ({ placesNumber, image, title, time }: NearbyProductProps) => {
  return (
    <Link
      href={`/stays-product/${placesNumber}`}
      className='block 
      bg-[#FCFCFD]
       dark:bg-[#23262F] 
       rounded-2xl p-2 pb-6 mx-2
       hover:shadow-[inset_0_0_0_1px_#B1B5C3]
       dark:hover:shadow-[inset_0_0_0_1px_#353945] 
       lg:w-[calc(20%-48px)] max-[1090px]:basis-1/4'
    >
      <div className='bg-[#F4F5F6] dark:bg-[#141416] font-bold text-xs text-[--text-primary] font-poppins px-3 py-1 rounded-full max-w-max mb-4'>
        {placesNumber}
      </div>
      <div className='flex flex-col items-center justify-center gap-y-2'>
        <Image
          src={image}
          className='rounded-full object-fill max-w-[80px] max-h-[80px] '
          width={80}
          height={80}
          alt='product image'
        />
        <div className='font-poppins text-center'>
          <h1 className='font-medium mt-4'>{title}</h1>
          <p className='text-xs text-[--text-primary]'>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default Nearby;
