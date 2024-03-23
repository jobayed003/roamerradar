'use client';
import Stays from '@/app/(browse)/_components/Stays';
import HeroSection from '@/components/HeroSection';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronLeft } from 'lucide-react';
import Link from 'next/link';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import MapProvider from '@/components/map/MapProvider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { cn, getCountryByPlaceName } from '@/lib/utils';
import { useBookingDate, useStaysStore, useTravelers } from '@/stores/useData';
import { format } from 'date-fns';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

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
              <div
                className='absolute rounded-xl overflow-hidden -right-[28.5rem] w-[500px] h-[400px]'
                style={{ top: '3rem' }}
              >
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
            <SelectItem value='On Sales' className='hover:bg-[#23262F]'>
              On Sales
            </SelectItem>
            <SelectItem value='On Delivery'>On Delivery</SelectItem>
            <SelectItem value='In Exchange'>In Exchange</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default StayCategory;
