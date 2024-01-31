'use client';

import { DatePickerWithRange } from '@/components/DatePicker';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { format } from 'date-fns';
import { CalendarRange, Navigation, User2 } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const Stays = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  return (
    <div className='flex p-4 px-10 space-x-8'>
      <div className='flex flex-col justify-center w-[25%] '>
        <div className='relative'>
          <Input
            className={cn(
              'bg-transparent outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 placeholder:text-foreground font-[600] md:text-2xl text-lg px-0 border-0'
            )}
            placeholder='Location'
          />
          <Navigation className='absolute -left-8 top-3 hidden lg:block w-6 h-6 text-muted-foreground font-bold' />
        </div>

        <p className='text-muted-foreground'>Where are you going?</p>
      </div>
      <div className='flex flex-col justify-center flex-grow'>
        {/* @ts-ignore */}
        <DatePickerWithRange setDate={setDate} date={date}>
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
                  {date?.from ? format(date?.from, 'LLL dd, y') : 'Check in'}
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
        </DatePickerWithRange>
      </div>

      <div className='flex grow-0'>
        <div className='flex flex-col items-start'>
          <div className='flex items-center'>
            <User2 className='hidden lg:block w-6 h-6 text-muted-foreground font-bold' />
            <Button
              id='date'
              variant={'transparent'}
              className={cn('w-auto bg-transparent justify-start text-left font-[600] hover:bg-transparent text-2xl')}
            >
              Travelers
            </Button>
          </div>
          <p className='ml-10 text-muted-foreground'>Travelers</p>
        </div>
      </div>
    </div>
  );
};

export default Stays;

/* 

 <div className='flex items-center'>
            <CalendarRange className='hidden lg:block w-6 h-6 text-muted-foreground font-bold' />
            <Button
              id='date'
              variant={'transparent'}
              className={cn(
                'w-auto bg-transparent justify-start text-left font-normal hover:bg-transparent',
                !date && 'text-muted-foreground'
              )}
            >
              {/* <CalendarIcon className='mr-2 h-4 w-4' /> 

              {date?.from && format(date?.from, 'LLL dd, y')}
            </Button>

            <div>
              <CalendarRange className='hidden lg:block w-6 h-6 text-muted-foreground font-bold' />
              <Button
                id='date'
                variant={'transparent'}
                className={cn(
                  'w-auto bg-transparent justify-start text-left font-normal',
                  !date && 'text-muted-foreground'
                )}
              >
                {/* <CalendarIcon className='mr-2 h-4 w-4' /> 
                {date?.to && format(date?.to, 'LLL dd, y')}
              </Button>

              <p className='text-muted-foreground'>Add date</p>
            </div>
          </div>
          
          */
