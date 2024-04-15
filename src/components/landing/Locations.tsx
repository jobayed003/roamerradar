import { dateFormat } from '@/lib/utils';
import { addDays } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useMediaQuery } from 'usehooks-ts';
import { Button } from '../ui/button';

const LOCATIONS = [
  {
    name: 'The Grand Resort',
    location: 'West Gregoria',
    img: 'https://images.unsplash.com/photo-1618245318763-a15156d6b23c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    price: 350,
    offerPrice: 267,
    rating: 4.6,
    availableDate: new Date(),
  },
];

const Locations = () => {
  return (
    <div className='bg-[#F4F5F6] dark:bg-background dark:border-2 dark:border-dark_russian rounded-2xl lg:p-20 p-5 mt-16'>
      <div className='text-center lg:text-left'>
        <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Go somewhere</h1>
        <p className='lg:text-2xl md:text-md text-sm my-4 text-gray_text font-poppins'>Let&apos;s go on an adventure</p>
      </div>

      <div className='flex items-center lg:justify-normal justify-center gap-x-8 gap-y-8 flex-wrap mt-16'>
        {Array.from({ length: 8 }).map(() => (
          <LocationCard key={LOCATIONS[0].name} {...LOCATIONS[0]} />
        ))}
      </div>

      <div className='text-center mt-14'>
        <Link href={'/stays-category'}>
          <Button variant={'outline'} className='rounded-full border-2 border-gray_text'>
            View All
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default Locations;

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
  const matches = useMediaQuery('(max-width: 1024px)');

  const fromPlusDay = addDays(availableDate, 3);

  return (
    <div className='rounded-xl pb-8 bg-[#FCFCFD] dark:bg-dark_russian shadow-sm'>
      <Image src={img} width={matches ? 280 : 250} height={300} alt='location img' className='rounded-t-xl' />
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

      <div className='flex justify-between pt-4 mx-4 border-t border-[#E6E8EC] dark:border-gray_border text-xs text-gray_text'>
        <p>
          {dateFormat(availableDate)} - {dateFormat(fromPlusDay)}
        </p>
        <p className='text-foreground font-semibold'>⭐{rating}</p>
      </div>
    </div>
  );
};
