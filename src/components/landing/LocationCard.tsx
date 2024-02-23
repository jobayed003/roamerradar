import { addDays, format } from 'date-fns';
import Image from 'next/image';

type LocationCardProps = {
  name: string;
  location: string;
  img: string;
  price: number;
  offerPrice: number;
  rating: number;
  availableDate: Date;
};

const LocationCard = ({ name, location, img, price, offerPrice, rating, availableDate }: LocationCardProps) => {
  const fromPlusDay = addDays(availableDate, 3);

  return (
    <div className='rounded-xl pb-8 bg-[#FCFCFD] dark:bg-[#23262F] shadow-sm'>
      <Image src={img} width={250} height={300} alt='location img' className='rounded-t-xl' />
      <div className='flex justify-between p-4'>
        <div>
          <h1 className='font-medium'>{name}</h1>
          <p className='text-xs font-poppins'>{location}</p>
        </div>

        <div className='border-2 border-[#58C27D] text-xs font-bold px-2 py-1'>
          <p className='line-through'>${price}</p>
          <p className='text-[#58C27D]'>${offerPrice}</p>
        </div>
      </div>

      <div className='flex justify-between pt-4 mx-4 border-t border-[#E6E8EC] dark:border-[#353945] text-xs text-[--text-primary]'>
        <p>
          {format(availableDate, 'LLL dd, y')} - {format(fromPlusDay, 'LLL dd, y')}
        </p>
        <p className='text-foreground font-semibold'>⭐{rating}</p>
      </div>
    </div>
  );
};

export default LocationCard;
