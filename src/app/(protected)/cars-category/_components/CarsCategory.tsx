'use client';
import Cars from '@/app/(browse)/cars/_components/Cars';
import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import Panel from '@/components/Panel';
import MapProvider from '@/components/map/MapProvider';
import { Button } from '@/components/ui/button';
import { cn, createSearchParams, getCountryByPlaceName } from '@/lib/utils';
import { useBookingDate, useCarStore, useTravelers } from '@/stores/useData';
import { format } from 'date-fns';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

import CategoryFilter from '@/components/CategoryFilter';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const filters = ['Sightseeing', 'Transportation activities', 'Art and culture'];
const selectItems = ['Time of day', 'Time of week'];

const CarsCategory = () => {
  const [isClicked, setIsClicked] = useState(false);
  const router = useRouter();

  const { pickupLocation } = useCarStore();
  const { date } = useBookingDate();
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);

  const travelDates = format(date?.from ?? Date.now(), 'MMM d') + ' - ' + format(date?.to ?? Date.now(), 'MMM d');

  useEffect(() => {
    const url = createSearchParams({ baseUrl: '/cars-category', params: pickupLocation });

    router.push(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupLocation]);

  return (
    <div>
      <div
        className={
          'h-60 w-full flex flex-col justify-center text-[#23262F] p-20 pt-24 flex-shrink relative mt-4 mb-32 '
        }
      >
        <Image src={'/images/bg-car.jpg'} fill className={'object-cover -z-10 absolute'} alt='hero image' />
        <Panel className='lg:-bottom-16 lg:max-w-7xl 2xl:mx-auto mx-8'>
          <div className='flex flex-col lg:p-10 p-5'>
            <Cars />
          </div>
        </Panel>
      </div>

      <div className='md:px-20 px-10 mt-72 lg:mt-0 pb-20 lg:max-w-7xl mx-auto'>
        <div className='flex justify-between'>
          <Link href={'/'}>
            <Button variant={'outline'} className='rounded-full'>
              <ChevronLeft className='h-5 w-5 mr-3' />
              Go Home
            </Button>
          </Link>
          <BreadcrumbProvider
            backroute='cars-category'
            originRoute=''
            location={getCountryByPlaceName(pickupLocation)}
            searchedLocation={pickupLocation}
          />
        </div>

        <div className='flex justify-between mt-14'>
          <div className='font-bold'>
            <h1 className='text-5xl'>24 locations found</h1>
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
      </div>
    </div>
  );
};
export default CarsCategory;
