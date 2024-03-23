import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Places } from '@/lib/constants';
import { Compass } from 'lucide-react';
import { ReactNode } from 'react';

const LocationsSuggestion = ({
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

  const replaceAll = /\b(?:-| |,)\b/gi;
  // @ts-ignore
  const text = location.toLowerCase().replace(replaceAll, '').trim();
  const regex = new RegExp(text, 'i');
  const filteredPlaces = allPlaces.filter((place) => regex.test(place.replace(replaceAll, '').trim()));

  return (
    <Popover open={isOpen}>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent className='min-w-[400px]'>
        <div className='flex flex-col gap-y-2 overflow-y-scroll scroll-m-0  max-h-[400px] hidden-scrollbar'>
          {filteredPlaces.map((place) => (
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

export default LocationsSuggestion;