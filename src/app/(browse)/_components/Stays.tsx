'use client';

import { DateRangePicker } from '@/components/DatePicker';
import Guests from '@/components/Guests';
import LocationsSuggestion from '@/components/LocationsSuggestion';

import SearchIcon from '@/components/Search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn, dateFormat } from '@/lib/utils';
import { useBookingDate, useStaysStore } from '@/stores/useData';
import { CalendarRange, Navigation } from 'lucide-react';
import { useEffect, useState } from 'react';

const Stays = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const { location, setLocation } = useStaysStore();
  const { date } = useBookingDate();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (location) setIsTyping(false);
  }, [location]);

  if (!isMounted) return null;

  return (
    <div className='grid lg:grid-cols-4 md:grid-rows-1 grid-rows-3 gap-y-4 pr-1 pl-4 pb-2 items-center relative'>
      <div className={cn('w-[90%]')}>
        <LocationsSuggestion isOpen={isTyping} setLocation={setLocation} location={location}>
          <div className='flex items-start gap-x-4 '>
            <Navigation className='block  mt-3 w-6 h-6 text-muted-foreground font-bold' />
            <Input
              className={cn(
                'bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-semibold md:text-2xl text-lg px-0 border-0 text-foreground'
              )}
              placeholder='Location'
              value={location}
              onKeyUpCapture={() => setIsTyping(true)}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <p className='ml-1 text-nowrap text-muted-foreground'>Where are you going?</p>
        </LocationsSuggestion>
      </div>

      <DateRangePicker className='col-span-2' isRange>
        <div className='grid grid-cols-2'>
          <div className='flex flex-col items-start'>
            <div className='flex items-center'>
              <CalendarRange className='block w-6 h-6 text-muted-foreground font-bold' />
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
              <CalendarRange className='block w-6 h-6 text-muted-foreground font-bold' />
              <Button
                id='date'
                variant={'transparent'}
                className={
                  'w-auto bg-transparent justify-start text-left hover:bg-transparent font-[600] md:text-2xl text-lg'
                }
              >
                {date?.to ? dateFormat(date.to) : 'Check out'}
              </Button>
            </div>
            <p className='ml-10 text-muted-foreground'>Add date</p>
          </div>
        </div>
      </DateRangePicker>
      <div>
        <Guests />
      </div>

      <SearchIcon className='top-4' link={`/stays-category?q=${location}`} />
    </div>
  );
};

export default Stays;
