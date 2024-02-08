'use client';

import { DateRangePicker } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useBookingDate, useFlightStore } from '@/stores/useData';
import { format } from 'date-fns';
import { CalendarRange, MapPin, Search } from 'lucide-react';
import { useEffect, useState } from 'react';

const Flights = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const { setLocations } = useFlightStore();
  const { date } = useBookingDate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='grid lg:grid-cols-4 md:grid-rows-1 grid-rows-3 gap-y-4 px-5 pb-2 items-center'>
      <div className='w-max'>
        <div className='flex items-start gap-x-4'>
          <MapPin className='mt-3  w-6 h-6 text-muted-foreground font-bold' />
          <Input
            className={cn(
              'bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0'
            )}
            placeholder='Flying From'
            // value={locations}
            // onChange={(e) => setLocatiosn(e.target.value)}
          />
        </div>
        <p className='ml-10 text-nowrap text-muted-foreground'>Flying From</p>
      </div>

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
      <div
        onClick={() => setIsClicked(!isClicked)}
        className={cn(
          'relative cursor-pointer md:col-span-1 col-span-2 rounded-2xl lg:p-4',
          isClicked && 'lg:bg-[#141416]'
        )}
      >
        <div>
          <Popover>
            <PopoverTrigger>
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
                    {date?.from ? format(date?.from, 'LLL dd, y') : 'Return'}
                  </Button>
                </div>
                <p className='ml-10 text-muted-foreground'>Return</p>
              </div>
            </PopoverTrigger>
            <PopoverContent className='w-auto p-0' align='start'>
              <Calendar mode='single' defaultMonth={date?.from} selected={date?.from} />
            </PopoverContent>
          </Popover>
        </div>
        <div className='absolute right-0 top-5 rounded-full bg-blue-600 p-5 cursor-pointer'>
          <Search className='h-5 w-5' />
        </div>
      </div>
    </div>
  );
};

export default Flights;
