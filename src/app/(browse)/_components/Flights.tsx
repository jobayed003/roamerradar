'use client';

import { DateRangePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useBookingDate, useFlightStore } from '@/stores/useData';
import { format } from 'date-fns';
import { CalendarRange, MapPin, Navigation, Search } from 'lucide-react';

const Flights = () => {
  const { setLocations } = useFlightStore();
  const { date } = useBookingDate();

  return (
    <div className='grid grid-cols-4 p-4 px-10 items-center'>
      <div className='flex w-[max-content]'>
        <div className='relative'>
          <Input
            className={cn(
              'bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0'
            )}
            placeholder='Flying From'
            // value={locations}
            // onChange={(e) => setLocatiosn(e.target.value)}
          />
          <MapPin className='absolute -left-8 top-3 hidden lg:block w-6 h-6 text-muted-foreground font-bold' />
          <p className='text-muted-foreground'>Flying From</p>
        </div>
        <div className='relative'>
          <Input
            className={cn(
              'bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0'
            )}
            placeholder='Flying to'
            // value={locations}
            // onChange={(e) => setLocatiosn(e.target.value)}
          />
          <Navigation className='absolute -left-8 top-3 hidden lg:block w-6 h-6 text-muted-foreground font-bold' />
          <p className='text-muted-foreground'>Going to</p>
        </div>
      </div>
      <div className='flex flex-col justify-center'>
        {/* @ts-ignore */}
        <DateRangePicker className='col-span-2'>
          <div className='grid grid-cols-2'>
            <div className='flex flex-col items-start '>
              <div className='flex items-center'>
                <CalendarRange className='hidden lg:block w-6 h-6 text-muted-foreground font-bold' />
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
                <CalendarRange className='hidden lg:block w-6 h-6 text-muted-foreground font-bold' />
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
      </div>

      <div className='flex relative px-8 mr-6'>
        <div className='absolute -right-14 top-0 rounded-full bg-blue-600 p-6 cursor-pointer'>
          <Search className='h-5 w-5' />
        </div>
      </div>
    </div>
  );
};

export default Flights;
