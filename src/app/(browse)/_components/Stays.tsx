'use client';

import { DatePickerWithRange } from '@/components/DatePicker';
import Guests from '@/components/Guests';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { useBookingDate, useStaysStore } from '@/stores/useData';
import { format } from 'date-fns';
import { CalendarRange, Navigation, Search, User2 } from 'lucide-react';
import { useState } from 'react';

const Stays = () => {
  const [isClicked, setIsClicked] = useState(false);

  const { location, setLocation } = useStaysStore();
  const { date } = useBookingDate();

  return (
    <div className='grid lg:grid-cols-4 md:grid-rows-1 grid-rows-3 gap-y-4 p-5 items-center'>
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
        <p className='ml-10 text-nowrap text-muted-foreground'>Where are you going?</p>
      </div>

      <DatePickerWithRange className='col-span-2'>
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
      </DatePickerWithRange>
      <Guests>
        <div
          onClick={() => setIsClicked(!isClicked)}
          className={cn(
            'relative cursor-pointer md:col-span-1 col-span-2 rounded-2xl p-4',
            isClicked && 'lg:bg-[#141416]'
          )}
        >
          <div className='flex flex-col items-start'>
            <div className='flex items-center '>
              <User2 className='block w-6 h-6 text-muted-foreground font-bold' />
              <Button
                id='date'
                variant={'transparent'}
                className={cn('w-auto bg-transparent justify-start text-left font-[600] hover:bg-transparent text-2xl')}
              >
                Travelers
              </Button>
              <div className='absolute right-0 top-5 rounded-full bg-blue-600 p-5 cursor-pointer'>
                <Search className='h-5 w-5' />
              </div>
            </div>
            <p className='ml-10 text-muted-foreground'>Travelers</p>
          </div>
        </div>
      </Guests>
    </div>
  );
};

export default Stays;
