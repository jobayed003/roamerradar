'use client';

import Guests from '@/components/Guests';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFlightStore, useTravelers } from '@/stores/useData';
import { TripOptions } from '../../../../../types';

export const TripType = () => {
  const { tripType, setTripType } = useFlightStore();
  const { adults, children, toddlers } = useTravelers();

  const totalTravelers = adults + children + toddlers;
  return (
    <div className='flex items-center gap-x-4 p-4 pt-2'>
      <Button
        variant={tripType === TripOptions.ROUND ? 'default' : 'transparent'}
        className={cn(
          'rounded-full border-2 border-[#E6E8EC] dark:border-[#777e90]',
          tripType === TripOptions.ROUND && 'border-none'
        )}
        onClick={() => setTripType(TripOptions.ROUND)}
      >
        Round-trip
      </Button>
      <Button
        variant={tripType === TripOptions.ONEWAY ? 'default' : 'transparent'}
        className={cn(
          'rounded-full border-2 border-[#E6E8EC] dark:border-[#777e90]',

          tripType === TripOptions.ONEWAY && 'border-none'
        )}
        onClick={() => setTripType(TripOptions.ONEWAY)}
      >
        One-way
      </Button>
      <Guests>
        <Button variant={'transparent'} className='rounded-full border-2 border-[#E6E8EC] dark:border-[#777e90]'>
          {totalTravelers} Travelers
        </Button>
      </Guests>
    </div>
  );
};

export default TripType;
