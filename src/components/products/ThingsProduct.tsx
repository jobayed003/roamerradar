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
    img: '/images/cars_images/pic-3.jpg',
    supplier: 1,
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 232,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/cars_images/pic-4.jpg',
    supplier: 1,
    isBestSelling: true,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 231,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/cars_images/pic-5.jpg',
    supplier: 1,
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 223,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/cars_images/pic-6.jpg',
    supplier: 1,
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 276,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/cars_images/pic-7.jpg',
    supplier: 1,
    isBestSelling: true,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 216,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/cars_images/pic-8.jpg',
    supplier: 1,
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 976,

    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/cars_images/pic-9.jpg',
    supplier: 1,
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
  {
    id: 176,
    name: 'London - Kings Cross',
    pickupLocation: '136 - 150, Pentonville Road, Kings Cross, London, UK',
    img: '/images/cars_images/pic-1.jpg',
    supplier: 1,
    isBestSelling: false,
    oldPrice: 543,
    newPrice: 234,
    rating: 4.9,
    reviews: 15,
  },
];

export const ThingsProduct = () => {
  return (
    <div className='flex flex-col items-center'>
      <div className='grid xl:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 w-full gap-x-3 gap-y-8 mt-8'>
        {cars.map((item) => (
          <ThingsProductCard key={Math.random()} {...item} />
        ))}
      </div>

      <Button variant={'outline'} className='my-8 border-2 border-gray_text rounded-full'>
        <LoadingSpinner className='mr-2' />
        Show More
      </Button>
    </div>
  );
};

type ThingsProductCardProps = {
  id: number;
  name: string;
  pickupLocation: string;
  img: string;
  supplier: number;
  isBestSelling: boolean;
  oldPrice: number;
  newPrice: number;
  rating: number;
  reviews: number;
};

const ThingsProductCard = ({
  id,
  name,
  img,
  supplier,
  isBestSelling,
  pickupLocation,
  oldPrice,
  newPrice,
  rating,
  reviews,
}: ThingsProductCardProps) => {
  return (
    <Link
      href={'/things-product/' + id}
      className='grid xl:grid-cols-2 grid-row-2 xl:max-w-[600px] w-full rounded-2xl border dark:border-gray_border border-[#E6E8EC] shadow-sm font-poppins'
    >
      <div className='w-full md:h-[230px] max-h-96 h-96 relative overflow-hidden xl:rounded-s-xl max-xl:rounded-t-xl'>
        <Image
          src={img}
          alt='location img'
          className='absolute object-fill hover:scale-110 transition-all duration-1000'
          fill
        />

        {isBestSelling && (
          <div className='absolute bg-blue uppercase font-bold font-poppins text-xs rounded-sm top-4 left-4 px-2 pt-[11px] pb-[9px] text-white'>
            Best Selling
          </div>
        )}
      </div>
      <div className='flex flex-col justify-between p-6 px-4'>
        <div className='flex justify-between gap-x-4'>
          <h1 className='font-medium'>{name}</h1>

          <div className='border-2 self-start rounded-md border-[#58C27D] text-green-500 text-xs font-bold px-2 py-1'>
            <p className='text-[#58C27D] line-through'>
              ${oldPrice} <br />
            </p>
            <p className='text-[#B1B5C3] font-semibold'>${newPrice}</p>
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
          <p className='text-foreground font-semibold'>${oldPrice} total</p>
          <p className='text-foreground font-semibold'>
            ⭐{rating}
            <span className='text-gray_text font-normal text-xs'>({reviews} reviews)</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
