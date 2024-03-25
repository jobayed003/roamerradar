'use client';
import Stays from '@/app/(browse)/_components/Stays';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import { CarouselProvider } from '@/components/CarouselProvider';
import MapProvider from '@/components/map/MapProvider';
import { CarouselItem } from '@/components/ui/carousel';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn, getCountryByPlaceName } from '@/lib/utils';
import { useBookingDate, useStaysStore, useTravelers } from '@/stores/useData';
import { format } from 'date-fns';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import StayProduct from './StayProduct';

const StayCategory = () => {
  const [isClicked, setIsClicked] = useState(false);

  const { location } = useStaysStore();
  const searchParams = useSearchParams();
  const { date } = useBookingDate();
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    params.set('q', location);
    router.push(`${pathname}?${params.toString()}`);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const travelDates = format(date?.from ?? Date.now(), 'MMM d') + ' - ' + format(date?.to ?? Date.now(), 'MMM d');

  return (
    <div className='px-2 lg:max-w-7xl mx-auto'>
      <HeroSection img='images/main-2.jpg' className='mt-4 mb-32'>
        <Stays />
      </HeroSection>

      <div className='px-20 pb-20'>
        <div className='flex items-center justify-between'>
          <Link href={'/'}>
            <Button variant={'outline'} className='rounded-full'>
              <ChevronLeft className='h-5 w-5 mr-3' />
              Go Home
            </Button>
          </Link>
          <BreadcrumbProvider
            backroute='stays-category'
            originRoute=''
            location={getCountryByPlaceName(location)}
            searchedLocation={location}
          />
        </div>
        <div className='flex justify-between mt-14'>
          <div className='font-bold'>
            <h1 className='text-5xl'>Places to stay</h1>
            <div className='flex gap-x-4 mt-3'>
              <p className='border-2 border-[#58c27d] text-[#58c27d] uppercase p-2 py-1 text-xs rounded-sm'>
                300+ stays
              </p>
              <p>
                {travelDates}, {totalTravelers} guests
              </p>
            </div>
          </div>
          <div className='relative'>
            {isClicked && (
              <div className='absolute rounded-xl rounded-se-none overflow-hidden -right-[28.5rem] w-[600px] h-[500px] top-12 z-[1000] border-4 border-white'>
                <MapProvider />
              </div>
            )}
          </div>
          <Button
            variant={'outline'}
            className={cn(
              'rounded-full p-4 select-none font-bold relative',
              isClicked && 'bg-blue-600 hover:bg-blue-600'
            )}
            onClick={() => setIsClicked(!isClicked)}
          >
            Show Map
            <ChevronDown className={cn('ml-2 w-6 h-5 transition-all duration-200', isClicked && 'rotate-180')} />
          </Button>
        </div>

        <Filters />

        <div className='py-8'>
          <div className=''>
            <h1 className='text-3xl font-bold'>Explore mountains in {location}</h1>
          </div>
          <BrowseCarousel />
        </div>

        <div className=''>
          <h1 className='text-3xl font-bold'>Over 300 stays</h1>
          <StayProduct />
        </div>
      </div>
    </div>
  );
};

const filters = ['Entire homes', 'Cancellation flexibility', 'Closest beach', 'For long stays'];

const Filters = () => {
  const [selected, setSelected] = useState(filters[0]);

  return (
    <div className='py-8'>
      <Separator className='bg-[#353945]' />

      <div className='flex justify-between items-center mt-8'>
        <div className='flex gap-x-2'>
          {filters.map((item) => (
            <div
              key={item.length}
              onClick={() => setSelected(item)}
              className={cn(
                'rounded-full px-2 py-1 font-bold text-sm bg-transparent text-[--text-primary] cursor-pointer hover:text-foreground transition-all select-none',
                selected === item && 'bg-foreground text-[#23262F] hover:text-[#23262F]'
              )}
            >
              {item}
            </div>
          ))}
        </div>

        <Select>
          <SelectTrigger className='w-[180px] focus:ring-0 focus:ring-offset-0 ring-offset-0 font-bold shadow-[inset_0_0_0_2px_#353945] border-0 rounded-xl'>
            <SelectValue placeholder='On Sales' />
          </SelectTrigger>
          <SelectContent className='font-bold shadow-[inset_0_0_0_2px_#353945] border-0 rounded-xl [&_option]:hover:bg-red'>
            <SelectItem value='On Sales'>On Sales</SelectItem>
            <SelectItem value='On Delivery'>On Delivery</SelectItem>
            <SelectItem value='In Exchange'>In Exchange</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

const BrowseCarousel = () => {
  return (
    <div className='relative'>
      <CarouselProvider buttonClasses='sm:absolute -top-[2.5rem] right-0'>
        {Array.from({ length: 6 }).map((_, index) => (
          <CarouselItem key={index} className='pl-1 lg:basis-1/4 md:basis-1/3 min-[400px]:basis-1/2'>
            <Link href={'/stays-category'}>
              <div className='flex flex-col justify-center gap-y-5 my-20 relative'>
                <Image
                  className='rounded-3xl hover:scale-105 duration-500  transition-all'
                  src={`/images/browse-${index + 1 > 3 ? index - 2 : index + 1}.jpg`}
                  alt='nearby image'
                  width={250}
                  height={300}
                />
                <div className='absolute top-4 left-4 bg-foreground rounded-full text-[#23262F] shadow-custom font-bold font-poppins text-xs px-4 py-1 uppercase'>
                  30% off
                </div>

                <div>
                  <h1 className='font-medium'>Mountain House</h1>
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
  );
};

export default StayCategory;
