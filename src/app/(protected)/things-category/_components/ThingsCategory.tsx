'use client';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';

import Things from '@/app/(browse)/things/_components/Things';
import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import { CarouselProvider } from '@/components/CarouselProvider';
import CategoryFilter from '@/components/CategoryFilter';
import MapProvider from '@/components/map/MapProvider';
import { ThingsProduct } from '@/components/products/ThingsProduct';
import { CarouselItem } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { cn, createSearchParams, getCountryByPlaceName } from '@/lib/utils';
import { useBookingDate, useThingsStore, useTravelers } from '@/stores/useData';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const filters = ['Sightseeing', 'Transportation', 'Art and Culture', 'City tour'];
const selectItems = ['Times of day', 'Time of week'];

const ThingsCategory = () => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const { location } = useThingsStore();
  const { date } = useBookingDate();
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);

  useEffect(() => {
    const url = createSearchParams({ baseUrl: '/things-category', params: location });

    router.push(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const travelDates = format(date?.from ?? Date.now(), 'MMM d') + ' - ' + format(date?.to ?? Date.now(), 'MMM d');
  const countryName = getCountryByPlaceName(location);

  return (
    <div className='px-2 lg:max-w-7xl mx-auto'>
      <HeroSection img='images/main-3.jpg' className='mb-32' location={location} countryName={countryName}>
        <Things />
      </HeroSection>

      <div className='md:px-20 px-4 pb-20 mt-72 lg:mt-0'>
        <div className='flex items-center justify-between'>
          <Link href={'/'}>
            <Button variant={'outline'} className='rounded-full'>
              <ChevronLeft className='h-5 w-5 mr-3' />
              Go Home
            </Button>
          </Link>
          <BreadcrumbProvider
            backRoute='things-category'
            originRoute='things'
            location={countryName}
            searchedLocation={location}
          />
        </div>
        <div className='flex justify-between mt-14'>
          <div className='font-bold'>
            <h1 className='text-5xl'>145+ experiences</h1>
            <div className='flex gap-x-4 mt-3'>
              <p className='border-2 border-[#58c27d] text-[#58c27d] uppercase p-2 py-1 text-xs rounded-sm font-bold'>
                Up to 25% off
              </p>
              <p>
                {travelDates}, {totalTravelers} guests
              </p>
            </div>
          </div>

          <Button
            variant={'outline'}
            className={cn(
              'rounded-full p-4 select-none font-bold relative md:flex hidden focus:ring-0 focus:ring-offset-0 ring-offset-0 shadow-[inset_0_0_0_2px_#353945] border-0',
              isClicked && 'bg-blue hover:bg-blue-hover'
            )}
            onClick={() => setIsClicked(!isClicked)}
          >
            Show Map
            <ChevronDown className={cn('ml-2 w-6 h-5 transition-all duration-200', isClicked && 'rotate-180')} />
            {isClicked && (
              <div className='absolute rounded-xl rounded-se-none overflow-hidden right-0 w-[600px] h-[500px] top-12 z-[1000] border-4 border-white '>
                <MapProvider />
              </div>
            )}
          </Button>
        </div>

        <CategoryFilter filters={filters} selectItems={selectItems} />
        <ThingsProduct />

        <div className='flex flex-col md:flex-row justify-between items-center gap-x-4 '>
          <div className='flex flex-col gap-y-4 md:max-w-[400px] mt-8'>
            <h1 className='text-5xl font-bold'>Join our newsletter 🎉</h1>
            <p className='text-gray_text mb-10'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Lorem ipsum dolor sit amet consectetur
              adipisicing elit.
            </p>

            <div className='flex flex-col gap-y-4'>
              <div className='flex gap-x-3'>
                <h1 className='bg-[#58C27D] w-10 text-center rounded-xl'>01</h1>
                <p>Get more discount</p>
              </div>
              <div className='flex gap-x-3'>
                <h1 className='bg-[#92A5EF] w-10 text-center rounded-xl'>02</h1>
                <p>Get premium travel magazine</p>
              </div>
            </div>
            <div className='mt-8 flex'>
              <Input
                placeholder='Enter your phone number'
                className='md:max-w-[300px] border-gray_border bg-transparent rounded-full py-5'
              />
              <div className='relative'>
                <div className='absolute right-1 top-2 p-1 bg-blue hover:bg-blue-hover rounded-full transition-all cursor-pointer'>
                  <ArrowRight className='w-5 h-5' />
                </div>
              </div>
            </div>
          </div>

          <Image alt='newsletter pic' src='/images/newsletter-pic-1.png' width={500} height={500} />
        </div>
      </div>
    </div>
  );
};

const BrowseCarousel = () => {
  return (
    <div className='relative'>
      <CarouselProvider buttonClasses='sm:absolute -top-[2.5rem] right-0'>
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index} className='pl-1 lg:basis-1/4 md:basis-1/3 min-[400px]:basis-1/2 basis-full'>
            <Link href={'/stays-category'} className='hover:text-blue transition-all flex flex-col items-center'>
              <div className='flex flex-col gap-y-5 my-20 relative rounded-3xl'>
                <div className='relative self-center sm:self-start overflow-hidden rounded-3xl'>
                  <Image
                    className='hover:scale-110 rounded-3xl duration-500'
                    src={`/images/browse-${index + 1 > 3 ? index - 2 : index + 1}.jpg`}
                    alt='nearby image'
                    width={250}
                    height={250}
                  />
                </div>
                <div className='absolute top-4 left-4 bg-foreground rounded-full text-white dark:text-dark_russian shadow-custom font-bold font-poppins text-xs px-4 py-1 uppercase'>
                  30% off
                </div>

                <div>
                  <h1 className='font-medium'>Mountain House</h1>
                  <div className='flex items-center gap-1 text-gray_text mt-1'>
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
  );
};

export default ThingsCategory;
