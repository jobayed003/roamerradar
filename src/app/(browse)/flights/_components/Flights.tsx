'use client';

import { DateRangePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useBookingDate, useFlightStore } from '@/stores/useData';
import { format } from 'date-fns';
import { CalendarRange, MapPin, Search } from 'lucide-react';
import { useEffect, useState } from 'react';
import { TripOptions } from '../../../../../types';

const Flights = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { tripType, flyingFrom, flyingTo, setLocations } = useFlightStore();

  const { date, setBookingDate } = useBookingDate();

  const isOneWay = tripType === TripOptions.ONEWAY;

  useEffect(() => {
    isOneWay && setBookingDate({ to: undefined, from: date?.from });
    setIsMounted(true);
  }, [isOneWay]);

  if (!isMounted) return null;

  return (
    <div className='grid lg:grid-cols-4 md:grid-rows-1 grid-rows-3 gap-y-4 px-5 pb-2 items-center relative'>
      <div className='w-[90%] lg:col-span-1 col-span-2'>
        <div className='flex items-start gap-x-4'>
          <MapPin className='mt-3  w-6 h-6 text-muted-foreground font-bold' />
          <Input
            className={cn(
              'bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0'
            )}
            placeholder='Flying From'
            value={flyingFrom}
            onChange={(e) => setLocations('flyingFrom', e.target.value)}
          />
        </div>
        <p className='ml-9 text-nowrap text-muted-foreground'>Flying From</p>
      </div>

      <div className='w-[90%]'>
        <div className='flex items-start gap-x-4'>
          <MapPin className='mt-3  w-6 h-6 text-muted-foreground font-bold' />
          <Input
            className={cn(
              'bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0'
            )}
            placeholder='Flying to'
            value={flyingTo}
            onChange={(e) => setLocations('flyingTo', e.target.value)}
          />
        </div>
        <p className='ml-9 text-nowrap text-muted-foreground'>Going to</p>
      </div>

      <DateRangePicker className='col-span-2' isRange={!isOneWay}>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col items-start '>
            <div className='flex items-center'>
              <CalendarRange className='w-6 h-6 text-muted-foreground font-bold' />
              <Button
                id='date'
                variant={'transparent'}
                className={
                  'w-auto bg-transparent justify-start text-left font-[600] hover:bg-transparent  md:text-2xl text-lg'
                }
              >
                {date?.from ? format(date.from, 'LLL dd, y') : 'Departure'}
              </Button>
            </div>
            <p className='ml-10 text-muted-foreground'>Departure</p>
          </div>

          <div className='flex items-start flex-col'>
            <div className='flex items-center'>
              <CalendarRange className='w-6 h-6 text-muted-foreground font-bold' />
              <Button
                id='date'
                variant={'transparent'}
                className={
                  'w-auto bg-transparent justify-start text-left hover:bg-transparent md:text-2xl text-lg  font-[600]'
                }
                disabled={tripType === TripOptions.ONEWAY}
              >
                {date?.to ? format(date?.to, 'LLL dd, y') : 'Return'}
              </Button>
            </div>
            <p className='ml-10 text-muted-foreground'>Return</p>
          </div>
        </div>
      </DateRangePicker>

      <div className='lg:absolute right-0 top-2 rounded-full bg-blue-600 lg:p-5 p-3 cursor-pointer text-center lg:w-auto w-full col-span-2'>
        <Search className='hidden lg:inline h-5 w-6 text-white' />
        <h1 className='lg:hidden'>Search</h1>
      </div>
    </div>
  );
};

export default Flights;
