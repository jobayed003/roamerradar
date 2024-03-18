import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Places } from '@/lib/constants';
import { Compass } from 'lucide-react';
import { ReactNode } from 'react';

const Locations = ({
  children,
  isOpen,
  location,
  setLocation,
}: {
  isOpen: boolean;
  children: ReactNode;
  location: string;
  setLocation: (value: string) => void;
}) => {
  const allPlaces = Places.flatMap((place) => place.places);

  return (
    <Popover open={isOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className='min-w-[400px]'>
        <div className='flex flex-col gap-y-2 overflow-y-scroll scroll-m-0  max-h-[400px] hidden-scrollbar'>
          {allPlaces
            .filter((place) => !place.includes(location))
            .map((place) => (
              <div
                className='flex items-center gap-x-3 cursor-pointer hover:bg-[#2b2f3a] py-4 rounded-md text-[#2b2f3a] hover:text-[#353945] '
                key={place.length}
                onClick={() => setLocation(place)}
              >
                <Compass className='h-6 w-6 text-gray-700' />
                <h1 className='text-[--text-primary] font-medium'>{place}</h1>
              </div>
            ))}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default Locations;
