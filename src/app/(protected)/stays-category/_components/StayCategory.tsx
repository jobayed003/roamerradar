'use client';
import Stays from '@/app/(browse)/_components/Stays';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, ChevronLeft, Home } from 'lucide-react';
import Link from 'next/link';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import { CarouselProvider } from '@/components/CarouselProvider';
import MapProvider from '@/components/map/MapProvider';
import { CarouselItem } from '@/components/ui/carousel';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn, createSearchParams, getCountryByPlaceName } from '@/lib/utils';
import { useBookingDate, useStaysStore, useTravelers } from '@/stores/useData';
import { format } from 'date-fns';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import StayProduct from './StayProduct';

const StayCategory = () => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const { location } = useStaysStore();
  const { date } = useBookingDate();
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);

  useEffect(() => {
    const url = createSearchParams({ baseUrl: '/stays-category', params: location });

    router.push(url);
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

          {/* TODO- Replace in a separate file for reuse */}
          <div className='relative'>
            {isClicked && (
              <div className='absolute rounded-xl rounded-se-none overflow-hidden -right-[28.5rem] w-[600px] h-[500px] top-12 z-[1000] border-4 border-white '>
                <MapProvider />
              </div>
            )}
          </div>
          <Button
            variant={'outline'}
            className={cn(
              'rounded-full p-4 select-none font-bold relative focus:ring-0 focus:ring-offset-0 ring-offset-0 shadow-[inset_0_0_0_2px_#353945] border-0',
              isClicked && 'bg-blue hover:bg-blue-hover'
            )}
            onClick={() => setIsClicked(!isClicked)}
          >
            Show Map
            <ChevronDown className={cn('ml-2 w-6 h-5 transition-all duration-200', isClicked && 'rotate-180')} />
          </Button>
        </div>

        <Filters />

        <div className='py-8'>
          <h1 className='text-3xl font-bold'>Explore mountains in {location}</h1>
          <BrowseCarousel />
        </div>

        <div>
          <h1 className='text-3xl font-bold'>Over 300 stays</h1>
          <StayProduct />
        </div>

        <div className='flex justify-between items-center gap-x-4 '>
          <div className='flex flex-col gap-y-4 max-w-[400px]'>
            <h1 className='text-5xl font-bold'>Join our newsletter 🎉</h1>
            <p className='text-[--text-primary] mb-10'>
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
            <div className='relative mt-8'>
              <Input
                placeholder='Enter your phone number'
                className='max-w-[300px] border-[#353945]  bg-transparent outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-full py-5'
              />
              <div className='absolute right-[6.7rem] top-2 p-1 bg-blue hover:bg-blue-hover rounded-full transition-all cursor-pointer'>
                <ArrowRight className='w-5 h-5' />
              </div>
            </div>
          </div>

          <Image alt='newsletter pic' src='/images/newsletter-pic-1.png' width={500} height={500} />
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
            <Link href={'/stays-category'} className='hover:text-blue transition-all'>
              <div className='flex flex-col justify-center gap-y-5 my-20 relative rounded-3xl'>
                <div className='w-[250px] h-full overflow-hidden rounded-3xl'>
                  <Image
                    className='hover:scale-110 duration-500'
                    src={`/images/browse-${index + 1 > 3 ? index - 2 : index + 1}.jpg`}
                    alt='nearby image'
                    width={250}
                    height={300}
                  />
                </div>
                <div className='absolute top-4 left-4 bg-foreground rounded-full text-white dark:text-[#23262F] shadow-custom font-bold font-poppins text-xs px-4 py-1 uppercase'>
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
