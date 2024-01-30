'use client';

import * as React from 'react';
import { DateRange } from 'react-day-picker';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';

export const DatePickerWithRange = ({
  className,
  children,
  date,
  setDate,
}: React.HTMLAttributes<HTMLDivElement> & {
  date: { from: Date | undefined; to: Date | undefined };
  setDate: React.Dispatch<React.SetStateAction<DateRange | undefined>>;
}) => {
  const [isMounted, setIsMounted] = React.useState(false);

  React.useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

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
            onSelect={setDate}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};
