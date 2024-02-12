'use client';

import { DateRangePicker } from '@/components/DatePicker';
import Guests from '@/components/Guests';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useThingsStore } from '@/stores/useData';
import { format } from 'date-fns';
import { CalendarRange, Navigation, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const Things = () => {
  const [isMounted, setIsMounted] = useState(false);

  const { location, date, setValues } = useThingsStore();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='grid lg:grid-cols-3 md:grid-rows-1 grid-rows-3 gap-y-4 px-5 pb-2 items-center relative'>
      <div className='w-[90%] lg:col-span-1 col-span-2'>
        <div className='flex items-start gap-x-4'>
          <Navigation className='mt-3  w-6 h-6 text-muted-foreground font-bold' />
          <Input
            className={cn(
              'bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0'
            )}
            placeholder='Location'
            value={location}
            onChange={(e) => setValues({ location: e.target.value })}
          />
        </div>
        <p className='ml-9 text-nowrap text-muted-foreground'>Where are you going?</p>
      </div>

      <DateRangePicker className='lg:col-span-1 col-span-2'>
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
                {date ? format(date, 'LLL dd, y') : 'Date'}
              </Button>
            </div>
            <p className='ml-10 text-muted-foreground'>Add date</p>
          </div>
        </div>
      </DateRangePicker>

      <Guests />

      <div className='absolute right-7 lg:top-4 top-[10.4rem] rounded-full bg-blue-600 p-5 cursor-pointer text-center'>
        <Search className='h-6 w-6 text-white' />
      </div>
    </div>
  );
};

export default Things;
