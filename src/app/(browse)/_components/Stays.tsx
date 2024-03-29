'use client';

import { DateRangePicker } from '@/components/DatePicker';
import Guests from '@/components/Guests';
import LocationsSuggestion from '@/components/LocationsSuggestion';

import SearchIcon from '@/components/Search';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { dateFormat } from '@/lib/utils';
import { useBookingDate, useStaysStore } from '@/stores/useData';
import { CalendarRange, Navigation } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

const Stays = () => {
  const [isTyping, setIsTyping] = useState(false);
  const ref = useRef(null);
  const { location, setLocation } = useStaysStore();
  const { date } = useBookingDate();

  useOnClickOutside(ref, () => setIsTyping(false));
  useEffect(() => {
    if (location) setIsTyping(false);
  }, [location]);

  const query = location !== '' ? `?q=${location}` : '';

  return (
    <div className='grid lg:grid-cols-4 md:grid-rows-1 grid-rows-3 gap-y-4 pr-1 pl-4 pb-2 items-center relative'>
      <div className='w-[90%]'>
        <div className='flex items-start gap-x-4' ref={ref}>
          <Navigation className='block  mt-3 w-6 h-6 text-muted-foreground font-bold' />
          <Input
            className='bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-semibold md:text-2xl text-lg px-0 border-0 text-foreground relative'
            placeholder='Location'
            value={location}
            onKeyUp={(e) => {
              if (e.key === 'Escape') {
                setIsTyping(false);
              }
            }}
            onKeyUpCapture={() => setIsTyping(true)}
            onChange={(e) => setLocation(e.target.value)}
          />
          {isTyping && <LocationsSuggestion setLocation={setLocation} location={location} />}
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

      <SearchIcon className='top-4' link={`/stays-category${query}`} />
    </div>
  );
};

export default Stays;
