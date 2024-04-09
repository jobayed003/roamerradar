import { products } from '@/lib/constants';
import Image from 'next/image';
import Link from 'next/link';
import { CarouselProvider } from '../CarouselProvider';
import NearbyLocations from '../NearbyLocations';
import { CarouselItem } from '../ui/carousel';

const Nearby = () => {
  return (
    <div className='pb-32'>
      <div className='px-8'>
        <NearbyLocations />
      </div>

      <div className='bg-[#F4F5F6] dark:bg-[#18191D] dark:border-2 dark:border-[#23262F] rounded-2xl lg:p-20 p-5'>
        <div className='text-center py-8'>
          <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Explore nearby</h1>
          <p className='lg:text-2xl md:text-md text-sm my-4 text-gray_text font-poppins -r'>
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
      <div className='bg-[#F4F5F6] dark:bg-[#141416] font-bold text-xs text-gray_text font-poppins px-3 py-1 rounded-full max-w-max mb-4'>
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
          <p className='text-xs text-gray_text'>{time}</p>
        </div>
      </div>
    </Link>
  );
};

export default Nearby;
