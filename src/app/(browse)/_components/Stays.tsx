'use client';

'use client';

import { DatePickerWithRange } from '@/components/DatePicker';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { CalendarRange, Navigation } from 'lucide-react';

const Stays = () => {
  return (
    <div className='flex p-4 px-10'>
      <div className='flex flex-col justify-center'>
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
      <div className='flex flex-col justify-center'>
        <div className='relative'>
          <DatePickerWithRange />
          <CalendarRange className='absolute -left-8 top-3 hidden lg:block w-6 h-6 text-muted-foreground font-bold' />
        </div>

        <p className='text-muted-foreground'>Add date</p>
      </div>
      <div className='flex flex-col justify-center'>
        <div className='relative'>
          <DatePickerWithRange />

          <CalendarRange className='absolute -left-8 top-3 hidden lg:block w-6 h-6 text-muted-foreground font-bold' />
        </div>

        <p className='text-muted-foreground'>Add date</p>
      </div>
    </div>
  );
};

export default Stays;
