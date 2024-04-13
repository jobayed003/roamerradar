'use client';

import * as SliderPrimitive from '@radix-ui/react-slider';
import * as React from 'react';

import { cn } from '@/lib/utils';

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & {
    values?: number[];
    showLabel?: boolean;
    label?: string;
  }
>(({ className, showLabel = false, label, values, ...props }, ref) => {
  return (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className='relative h-2 w-full grow overflow-hidden rounded-full dark:bg-gray_border bg-gray-200'>
        <SliderPrimitive.Range className='absolute h-full bg-blue' />
      </SliderPrimitive.Track>

      <SliderPrimitive.Thumb className='block h-6 w-6 rounded-full border-4 dark:border-primary bg-blue transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 relative'>
        {showLabel && values && (
          <div className='absolute bottom-6 -right-6 dark:bg-gray_border bg-black text-background dark:text-foreground px-2 py-1 rounded-md'>
            {label}
            {values[0]}
          </div>
        )}
      </SliderPrimitive.Thumb>

      <SliderPrimitive.Thumb className='block h-6 w-6 rounded-full border-4 dark:border-primary bg-blue transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 relative'>
        {showLabel && values && (
          <div className='absolute bottom-6 -right-6 dark:bg-gray_border text-background px-2 py-1 rounded-md'>
            {label}
            {values[1]}
          </div>
        )}
      </SliderPrimitive.Thumb>
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
