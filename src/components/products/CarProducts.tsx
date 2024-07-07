import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Navigation, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const cars = [
  {
    id: 234,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/car-images/pic-3.jpg',
    supplier: 1,
    isPopular: false,
    price: 543,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 232,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/car-images/pic-4.jpg',
    supplier: 1,
    isPopular: true,
    price: 543,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 231,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/car-images/pic-5.jpg',
    supplier: 1,
    isPopular: false,
    price: 543,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 223,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/car-images/pic-6.jpg',
    supplier: 1,
    isPopular: true,
    price: 543,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 276,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/car-images/pic-7.jpg',
    supplier: 1,
    isPopular: false,
    price: 543,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 216,

    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/car-images/pic-8.jpg',
    supplier: 1,
    isPopular: false,
    price: 543,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 976,

    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/car-images/pic-9.jpg',
    supplier: 1,
    isPopular: false,
    price: 543,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 176,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/car-images/pic-1.jpg',
    supplier: 1,
    isPopular: true,
    price: 543,
    rating: 4.9,
    reviews: 15,
  },
];

export const CarProducts = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='flex w-full gap-x-6 gap-y-8 justify-center flex-wrap mt-8'>
        {cars.map((item) => (
          <CarsProductCard key={Math.random()} {...item} />
        ))}
      </div>

      <Button variant={'outline'} className='my-8 border-2 border-gray_text rounded-full'>
        <LoadingSpinner className='mr-2' />
        Show More
      </Button>
    </div>
  );
};

type CarProductCardProps = {
  id: number;
  name: string;
  pickupLocation: string;
  img: string;
  supplier: number;
  isPopular: boolean;
  price: number;
  rating: number;
  reviews: number;
};

const CarsProductCard = ({
  id,
  name,
  img,
  supplier,
  isPopular,
  pickupLocation,
  price,
  rating,
  reviews,
}: CarProductCardProps) => {
  return (
    <Link
      href={'/cars-product/' + id}
      className='grid md:grid-cols-2 grid-row-2 max-w-[545px] rounded-2xl border dark:border-gray_border border-[#E6E8EC] shadow-sm font-poppins'
    >
      <div className='w-full md:h-[230px] h-[300px] relative overflow-hidden rounded-s-xl'>
        <Image
          src={img}
          alt='location img'
          className='absolute object-fill hover:scale-110 transition-all duration-1000'
          fill
        />

        {isPopular && (
          <div className='absolute dark:bg-foreground bg-background uppercase font-bold font-poppins text-xs rounded-sm top-4 left-4 px-2 pt-[11px] pb-[9px] text-gray_border'>
            Popular
          </div>
        )}
      </div>
      <div className='flex flex-col justify-between p-6 px-4'>
        <div className='flex justify-between gap-x-4'>
          <h1 className='font-medium'>{name}</h1>

          <div className='border-2 self-start rounded-md border-[#58C27D] text-green-500 text-xs font-bold px-2 py-1'>
            <p className='text-[#58C27D]'>
              ${price} <br />
              <span className='text-[#B1B5C3] font-semibold'>/DAY</span>
            </p>
          </div>
        </div>

        <div className='flex justify-between text-xs text-gray_text mt-5'>
          <div className='flex gap-x-2'>
            <Navigation className='w-8 h-4' />
            <p className='text-wrap'>{pickupLocation}</p>
          </div>
          <div className='flex gap-x-2 text-nowrap'>
            <User2 className='w-4 h-4' />
            <p>{supplier} Supplier</p>
          </div>
        </div>
        <Separator />

        <div className='flex justify-between text-xs text-gray_text mt-2'>
          <p className='text-foreground font-semibold'>${price} total</p>
          <p className='text-foreground font-semibold'>
            ⭐{rating}
            <span className='text-gray_text font-normal text-xs'>({reviews} reviews)</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
