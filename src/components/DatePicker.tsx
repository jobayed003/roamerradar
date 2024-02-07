'use client';

import * as React from 'react';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useBookingDate } from '@/stores/useData';

export const DateRangePicker = ({ className, children }: React.HTMLAttributes<HTMLDivElement>) => {
  const date = useBookingDate((state) => state.date);
  const setBookingDate = useBookingDate((state) => state.setBookingDate);

  return (
    <div className={cn('grid gap-2', className)}>
      <Popover>
        <PopoverTrigger>{children}</PopoverTrigger>
        <PopoverContent className='w-auto p-0' align='start'>
          <Calendar
            initialFocus
            mode='range'
            defaultMonth={date?.from}
            selected={date}
            onSelect={setBookingDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
