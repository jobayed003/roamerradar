'use client';

import { DateRangePicker } from '@/components/DatePicker';
import Guests from '@/components/Guests';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useBookingDate, useStaysStore } from '@/stores/useData';
import { format } from 'date-fns';
import { CalendarRange, Navigation, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const Stays = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { location, setLocation } = useStaysStore();
  const { date } = useBookingDate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='grid lg:grid-cols-4 md:grid-rows-1 grid-rows-3 gap-y-4 px-5 pb-2 items-center relative'>
      <div className='w-[90%]'>
        <div className='flex items-start gap-x-4'>
          <Navigation className='block  mt-3 w-6 h-6 text-muted-foreground font-bold' />
          <Input
            className={cn(
              'bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0'
            )}
            placeholder='Location'
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        <p className='ml-9 text-nowrap text-muted-foreground'>Where are you going?</p>
      </div>

      <DateRangePicker className='col-span-2' isRange>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col items-start'>
            <div className='flex items-center'>
              <CalendarRange className='block w-6 h-6 text-muted-foreground font-bold' />
              <Button
                id='date'
                variant={'transparent'}
                className={cn(
                  'w-auto bg-transparent justify-start text-left font-[600] hover:bg-transparent text-2xl',
                  !date && 'text-muted-foreground'
                )}
              >
                {date?.from ? format(date.from, 'LLL dd, y') : 'Check in'}
              </Button>
            </div>
            <p className='ml-10 text-muted-foreground'>Add date</p>
          </div>

          <div className='flex items-start flex-col'>
            <div className='flex items-center'>
              <CalendarRange className='block w-6 h-6 text-muted-foreground font-bold' />
              <Button
                id='date'
                variant={'transparent'}
                className={cn(
                  'w-auto bg-transparent justify-start text-left hover:bg-transparent text-2xl font-[600]',
                  !date && 'text-muted-foreground'
                )}
              >
                {date?.to ? format(date?.to, 'LLL dd, y') : 'Check out'}
              </Button>
            </div>
            <p className='ml-10 text-muted-foreground'>Add date</p>
          </div>
        </div>
      </DateRangePicker>
      <Guests />
      <div className='lg:absolute right-4 top-4 rounded-full bg-blue-600 lg:p-5 p-3 cursor-pointer text-center lg:w-auto w-full col-span-2'>
        <Search className='hidden lg:inline h-5 w-6 text-white' />
        <h1 className='lg:hidden'>Search</h1>
      </div>
    </div>
  );
};

export default Stays;
