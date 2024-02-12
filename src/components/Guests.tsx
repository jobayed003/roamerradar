'use client';

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { cn } from '@/lib/utils';
import { useTravelers } from '@/stores/useData';
import { MinusCircle, PlusCircle, User2 } from 'lucide-react';
import { useState } from 'react';
import { Button } from './ui/button';

const Guests = ({ children }: { children?: React.ReactNode }) => {
  const [isClicked, setIsClicked] = useState(false);

  const { setTravelers, adults, children: child, toddlers } = useTravelers();

  return (
    <Popover>
      <PopoverTrigger>
        {!children && (
          <div
            onClick={() => setIsClicked(!isClicked)}
            className={cn(
              'relative cursor-pointer md:col-span-1 col-span-2 rounded-2xl lg:p-4',
              isClicked && 'lg:bg-[#141416]'
            )}
          >
            <div className='flex flex-col items-start'>
              <div className='flex items-center '>
                <User2 className='block w-6 h-6 text-muted-foreground font-bold' />
                <Button
                  id='date'
                  variant={'transparent'}
                  className={cn(
                    'w-auto bg-transparent justify-start text-left font-[600] hover:bg-transparent text-2xl'
                  )}
                >
                  Travelers
                </Button>
              </div>
              <p className='ml-10 text-muted-foreground'>Travelers</p>
            </div>
          </div>
        )}
        {children}
      </PopoverTrigger>
      <PopoverContent className='w-[400px] p-4'>
        <div className='flex flex-col p-5 gap-y-8 px-4'>
          <div className='flex justify-between pb-2 border-b'>
            <div className='flex flex-col'>
              <h1 className='font-medium'>Adults</h1>
              <p className='text-muted-foreground text-[12px]'>Ages 13 or above</p>
            </div>
            <div className='flex gap-x-2 items-center'>
              <Button
                variant={'transparent'}
                className='p-0'
                disabled={adults === 0}
                onClick={() => setTravelers('adults', 'DEC')}
              >
                <MinusCircle className='cursor-pointer' />
              </Button>
              <p className='w-[1.5rem] text-center'>{adults}</p>
              <Button variant={'transparent'} className='p-0' onClick={() => setTravelers('adults', 'INC')}>
                <PlusCircle className='cursor-pointer' />
              </Button>
            </div>
          </div>
          <div className='flex justify-between pb-2 border-b'>
            <div className='flex flex-col'>
              <h1 className='font-medium'>Children</h1>
              <p className='text-muted-foreground text-[12px]'>Ages 2 - 12</p>
            </div>
            <div className='flex gap-x-2 items-center'>
              <Button
                variant={'transparent'}
                className='p-0'
                disabled={child === 0}
                onClick={() => setTravelers('children', 'DEC')}
              >
                <MinusCircle className='cursor-pointer' />
              </Button>
              <p className='w-[1.5rem] text-center'>{child}</p>
              <Button variant={'transparent'} className='p-0' onClick={() => setTravelers('children', 'INC')}>
                <PlusCircle className='cursor-pointer' />
              </Button>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex flex-col'>
              <h1 className='font-medium'>Toddlers</h1>
              <p className='text-muted-foreground text-[12px]'>Under 2</p>
            </div>

            <div className='flex gap-x-2 items-center'>
              <Button
                variant={'transparent'}
                className='p-0'
                disabled={toddlers === 0}
                onClick={() => setTravelers('toddlers', 'DEC')}
              >
                <MinusCircle className='cursor-pointer' />
              </Button>
              <p className='w-[1.5rem] text-center'>{toddlers}</p>
              <Button variant={'transparent'} className='p-0' onClick={() => setTravelers('toddlers', 'INC')}>
                <PlusCircle className='cursor-pointer' />
              </Button>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Guests;
