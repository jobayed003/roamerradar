'use client';

import { DateRangePicker } from '@/components/DatePicker';
import Locations from '@/components/Locations';
import SearchIcon from '@/components/Search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, dateFormat } from '@/lib/utils';
import { useBookingDate, useCarStore } from '@/stores/useData';
import { CalendarRange, MapPin } from 'lucide-react';
import { useState } from 'react';

const Cars = () => {
  const [isSameLocation, setIsSameLocation] = useState(true);

  const { pickupLocation, returnLocation, setLocations } = useCarStore();
  const { date } = useBookingDate();

  return (
    <div>
      <div className='flex items-center flex-wrap gap-y-4 gap-x-4 p-4 pt-2'>
        <Button
          variant={isSameLocation ? 'default' : 'transparent'}
          className={cn(
            'rounded-full border-2 border-[#E6E8EC]  dark:border-[#777e90] transition-all sm:w-auto w-full',
            isSameLocation && 'border-transparent'
          )}
          onClick={() => setIsSameLocation(true)}
        >
          Return to same location
        </Button>

        <Button
          variant={!isSameLocation ? 'default' : 'transparent'}
          className={cn(
            'rounded-full border-2 border-[#E6E8EC] dark:border-[#777e90] transition-all sm:w-auto w-full',
            !isSameLocation && 'border-transparent'
          )}
          onClick={() => setIsSameLocation(false)}
        >
          Return to different location
        </Button>
      </div>

      <div className='grid lg:grid-cols-4 md:grid-rows-1 grid-rows-3 gap-y-4 sm:px-5 pb-2 items-center relative'>
        <div className='w-[90%] lg:col-span-1 col-span-2'>

          
          <div className='flex items-start gap-x-4'>
            <MapPin className='mt-3  w-6 h-6 text-muted-foreground font-bold' />
            <Input
              className={
                'bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0 text-foreground'
              }
              placeholder='Pickup'
              value={pickupLocation}
              onChange={(e) => setLocations('pickupLocation', e.target.value)}
            />
          </div>
          <p className='ml-9 text-nowrap text-muted-foreground'>Where are you?</p>
        </div>

        <div className='w-[90%]'>
          <div className='flex items-start gap-x-4'>
            <MapPin className='mt-3  w-6 h-6 text-muted-foreground font-bold' />
            <Input
              className={cn(
                'bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0 text-foreground'
              )}
              placeholder='Return'
              value={!isSameLocation ? returnLocation : pickupLocation}
              onChange={(e) => setLocations('returnLocation', e.target.value)}
            />
          </div>
          <p className='ml-9 text-nowrap text-muted-foreground'>Where will you return it?</p>
        </div>

        <DateRangePicker className='col-span-2' isRange>
          <div className='grid grid-cols-2'>
            <div className='flex flex-col items-start '>
              <div className='flex items-center'>
                <CalendarRange className='w-6 h-6 text-muted-foreground font-bold' />
                <Button
                  id='date'
                  variant={'transparent'}
                  className={
                    'w-auto bg-transparent justify-start text-left font-[600] hover:bg-transparent md:text-2xl text-lg'
                  }
                >
                  {date?.from ? dateFormat(date.from) : 'Check in'}
                </Button>
              </div>
              <p className='ml-10 text-muted-foreground'>Add date</p>
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
                >
                  {date?.to ? dateFormat(date.to) : 'Check out'}
                </Button>
              </div>
              <p className='ml-10 text-muted-foreground'>Add date</p>
            </div>
          </div>
        </DateRangePicker>

        <SearchIcon className='top-1 -right-2' link='/cars-category' />
      </div>
    </div>
  );
};

export default Cars;
