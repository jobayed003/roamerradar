import { Compass } from 'lucide-react';

const LocationsSuggestion = ({
  location,
  setLocation,
  places,
}: {
  location: string;
  setLocation: (value: string) => void;
  places: string[];
}) => {
  const replaceAll = /\b(?:-| |,)\b/gi;
  const text = location.toLowerCase().replace(replaceAll, '').trim();
  const regex = new RegExp(text, 'i');

  const filteredPlaces = places.filter((place) => regex.test(place.replace(replaceAll, '').trim()));
  if (filteredPlaces.length === 0) return null;

  return (
    <div className='min-w-[400px] max-h-[400px] overflow-scroll rounded-3xl bg-black absolute bottom-24 -left-10 hidden-scrollbar p-4 px-8'>
      <div className='flex flex-col gap-y-2'>
        {filteredPlaces.map((place) => (
          <div
            className='flex items-center gap-x-3 cursor-pointer hover:bg-[#2b2f3a] py-4 rounded-md text-[#2b2f3a] hover:text-gray_border '
            key={place}
            onClick={() => setLocation(place)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setLocation(place);
              }
            }}
          >
            <Compass className='h-6 w-6 text-gray-700' />
            <h1 className='text-gray_text font-medium'>{place}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LocationsSuggestion;
