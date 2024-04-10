'use client';

import { DateRangePicker } from '@/components/DatePicker';
import SearchIcon from '@/components/Search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, dateFormat } from '@/lib/utils';
import { useBookingDate, useFlightStore } from '@/stores/useData';
import { CalendarRange, MapPin } from 'lucide-react';
import { useEffect } from 'react';
import { TripOptions } from '../../../../../types';
import TripType from './TripType';

const Flights = () => {
  const { tripType, flyingFrom, flyingTo, setLocations } = useFlightStore();

  const { date, setBookingDate } = useBookingDate();

  const isOneWay = tripType === TripOptions.ONEWAY;

  useEffect(() => {
    isOneWay && setBookingDate({ to: undefined, from: date?.from });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOneWay]);

  return (
    <div>
      <TripType />
      <div className='grid lg:grid-cols-4 md:grid-rows-1 grid-rows-3 gap-y-4 px-5 pb-2 items-center relative'>
        <div className='w-[90%] lg:col-span-1 col-span-2'>
          <div className='flex items-start gap-x-4'>
            <MapPin className='mt-3  w-6 h-6 text-muted-foreground font-bold' />
            <Input
              className={cn(
                'bg-transparent placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0 text-foreground'
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
                'bg-transparent placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0 text-foreground'
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
                  {date?.from ? dateFormat(date?.from) : 'Departure'}
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
                  {date?.to ? dateFormat(date?.to) : 'Return'}
                </Button>
              </div>
              <p className='ml-10 text-muted-foreground'>Return</p>
            </div>
          </div>
        </DateRangePicker>

        <SearchIcon className='-top-1 -right-1' link='/flights-category' />
      </div>
    </div>
  );
};

export default Flights;
