'use client';

import Guests from '@/components/Guests';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { useFlightStore, useTravelers } from '@/stores/useData';
import { TripOptions } from '../../../../../types';

export const TripType = () => {
  const { tripType, setTripType } = useFlightStore();
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);

  return (
    <div className='flex items-center md:gap-x-4 gap-x-1 md:p-4 pt-2 flex-wrap gap-y-4'>
      <Button
        variant={tripType === TripOptions.ROUND ? 'default' : 'transparent'}
        className={cn(
          'rounded-full border-2 border-[#E6E8EC] dark:border-[#777e90] md:text-md text-xs',
          tripType === TripOptions.ROUND && 'border-transparent'
        )}
        onClick={() => setTripType(TripOptions.ROUND)}
      >
        Round-trip
      </Button>
      <Button
        variant={tripType === TripOptions.ONEWAY ? 'default' : 'transparent'}
        className={cn(
          'rounded-full border-2 border-[#E6E8EC] dark:border-[#777e90] md:text-md text-xs',
          tripType === TripOptions.ONEWAY && 'border-transparent'
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
