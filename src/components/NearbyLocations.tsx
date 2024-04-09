import { CarouselProvider } from '@/components/CarouselProvider';
import { CarouselItem } from '@/components/ui/carousel';
import { Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const nearbyLocations = [
  { title: 'Nature House', img: '/images/browse-1.jpg', offer: '20% OFF', totalHouse: 234238 },
  { title: 'Nature House', img: '/images/browse-2.jpg', offer: '20% OFF', totalHouse: 5675567 },
  { title: 'Nature House', img: '/images/browse-3.jpg', offer: 'FROM $230', totalHouse: 567559 },
  { title: 'Nature House', img: '/images/browse-4.jpg', offer: '20% OFF', totalHouse: 234236 },
  { title: 'Nature House', img: '/images/browse-5.jpg', offer: '20% OFF', totalHouse: 5675567 },
  { title: 'Nature House', img: '/images/browse-2.jpg', offer: 'FROM $230', totalHouse: 567567 },
];

const NearbyLocations = () => {
  return (
    <div className='mt-32 relative'>
      <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Explore nearby</h1>
      <p className='lg:text-2xl md:text-md text-sm my-4 text-gray_text font-poppins'>Let&apos;s go on an adventure</p>

      <CarouselProvider buttonClasses='sm:absolute sm:-top-[6.5rem] right-0'>
        {nearbyLocations.map((item, index) => (
          <CarouselItem
            key={index}
            className='flex justify-center pl-1 lg:basis-1/4 md:basis-1/3 min-[500px]:basis-1/2 basis-full'
          >
            <Link href={'/stays-category'} className='overflow-hidden'>
              <div className='flex flex-col justify-center gap-y-5 my-20 relative  mx-8 min-[400px]:mx-4'>
                <div className='w-full relative overflow-hidden rounded-xl'>
                  <Image
                    className='rounded-xl hover:scale-105 duration-500 transition-all'
                    src={item.img}
                    alt='nearby image'
                    width={250}
                    height={300}
                  />
                </div>
                <div className='absolute top-4 left-4 dark:bg-foreground bg-background rounded-full text-[#23262F] shadow-custom font-bold font-poppins text-xs px-4 py-1 uppercase'>
                  {item.offer}
                </div>

                <div>
                  <h1 className='font-medium'>{item.title}</h1>
                  <div className='flex items-center gap-1 text-gray_text mt-1'>
                    <Home className='h-4 w-4' />
                    <p className='text-xs font-poppins font-semibold mt-1'>{item.totalHouse.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </Link>
          </CarouselItem>
        ))}
      </CarouselProvider>
    </div>
  );
};

export default NearbyLocations;
