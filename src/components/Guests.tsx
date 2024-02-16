'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useTravelers } from '@/stores/useData';
import { MinusCircle, PlusCircle, User2 } from 'lucide-react';
import { useRef, useState } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import { Button } from './ui/button';

const Guests = ({ children }: { children?: React.ReactNode }) => {
  const [isClicked, setIsClicked] = useState(false);
  const ref = useRef(null);
  useOnClickOutside(ref, () => setIsClicked(false));
  const values = useTravelers();
  const totalTravelers = values.adults + values.children + values.toddlers;
  return (
    <Popover>
      <PopoverTrigger ref={ref}>
        {!children && (
          <div
            onClick={() => setIsClicked(!isClicked)}
            className={cn(
              'relative cursor-pointer md:col-span-1 col-span-2 rounded-2xl lg:-ml-4 lg:p-4 lg:pr-20',
              isClicked && 'shadow-custom dark:shadow-none dark:lg:bg-[#141416]'
            )}
          >
            <div className='flex flex-col items-start '>
              <div className='flex items-center '>
                <User2 className='block w-6 h-6 text-muted-foreground font-bold' />
                <Button
                  id='date'
                  variant={'transparent'}
                  className={cn(
                    'w-auto bg-transparent justify-start text-left font-[600] hover:bg-transparent md:text-2xl text-lg'
                  )}
                >
                  {totalTravelers} Travelers
                </Button>
              </div>
              <p className='ml-10 text-muted-foreground'>Travelers</p>
            </div>
          </div>
        )}
        {children}
      </PopoverTrigger>
      <PopoverContent className='w-[400px] p-4 rounded-3xl'>
        <div className='flex flex-col p-5 gap-y-8 px-4'>
          <div className='flex justify-between pb-2 border-b'>
            <div className='flex flex-col'>
              <h1 className='font-medium'>Adults</h1>
              <p className='text-muted-foreground text-[12px]'>Ages 13 or above</p>
            </div>

            <CounterButton text='adults' value={values.adults} />
          </div>
          <div className='flex justify-between pb-2 border-b'>
            <div className='flex flex-col'>
              <h1 className='font-medium'>Children</h1>
              <p className='text-muted-foreground text-[12px]'>Ages 2 - 12</p>
            </div>
            <CounterButton text='children' value={values.children} />
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <h1 className='font-medium'>Toddlers</h1>
              <p className='text-muted-foreground text-[12px]'>Under 2</p>
            </div>

            <CounterButton text='toddlers' value={values.toddlers} />
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Guests;

const CounterButton = ({ value, text }: { value: number; text: 'adults' | 'children' | 'toddlers' }) => {
  const { setTravelers } = useTravelers();

  return (
    <div className='flex gap-x-2 items-center'>
      <Button variant={'transparent'} className='p-0' disabled={value === 0} onClick={() => setTravelers(text, 'DEC')}>
        <MinusCircle className='cursor-pointer text-[#B1B5C3]' />
      </Button>
      <p className='w-[1.5rem] text-center'>{value}</p>
      <Button variant={'transparent'} className='p-0' onClick={() => setTravelers(text, 'INC')}>
        <PlusCircle className='cursor-pointer text-[#B1B5C3]' />
      </Button>
    </div>
  );
};
