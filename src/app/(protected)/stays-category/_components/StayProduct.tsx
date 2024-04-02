import { Button } from '@/components/ui/button';
import { LucideIcon, Pizza, Wifi } from 'lucide-react';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import Link from 'next/link';
import ClipLoader from 'react-spinners/ClipLoader';

const houses = [
  {
    name: 'Entire serviced classy mountain house',
    amenities: [
      { name: 'Free Wifi', icon: Wifi },
      { name: 'Breakfast Included', icon: Pizza },
    ],
    img: '/images/browse-2.jpg',
    price: 543,
    offerPrice: 325,
    rating: 4.9,
    reviews: 15,
  },
];

const StayProduct = () => {
  const { theme } = useTheme();

  return (
    <div className='flex flex-col items-center'>
      <div className='flex gap-x-6 gap-y-8 justify-center flex-wrap mt-8'>
        {Array.from({ length: 9 }).map(() => (
          <StayProductCard key={houses[0].name} {...houses[0]} />
        ))}
      </div>

      <Button variant={'outline'} className='my-8 border-2 border-[--text-primary] rounded-full'>
        <ClipLoader color={theme === 'dark' ? 'white' : 'black'} size={25} /> Show More
      </Button>
    </div>
  );
};
type StayProductCardProps = {
  name: string;
  amenities: { name: string; icon: LucideIcon }[];
  img: string;
  price: number;
  offerPrice: number;
  rating: number;
  reviews: number;
};

const StayProductCard = ({ name, amenities, img, price, offerPrice, rating, reviews }: StayProductCardProps) => {
  return (
    <Link href={'/stays-product'} className='max-w-[350px] pb-6 rounded-xl border border-[rgb(53, 57, 69)] shadow-sm '>
      <div className='w-full h-[240px] relative overflow-hidden rounded-t-xl'>
        <Image
          src={img}
          alt='location img'
          className='absolute object-cover hover:scale-110 transition-all duration-1000'
          fill
        />
      </div>
      <div className='flex justify-between p-4 pt-6'>
        <div>
          <h1 className='font-medium'>{name}</h1>
          <div className='flex gap-x-2 mt-2'>
            {amenities.map((item) => (
              <div className='flex gap-x-1 items-center' key={item.name}>
                <item.icon className='w-3 h-3 text-[--text-primary]' />
                <p className='text-xs text-[--text-primary] font-poppins'>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='border-2 self-center border-[#58C27D] text-xs font-bold px-2 py-1'>
          <p className='line-through'>${price}</p>
          <p className='text-[#58C27D]'>${offerPrice}</p>
        </div>
      </div>

      <div className='flex justify-between pt-4 mx-4 border-t border-[#E6E8EC] dark:border-gray_border text-xs text-[--text-primary] font-poppins'>
        <p className='text-foreground font-semibold'>${offerPrice} total</p>
        <p className='text-foreground font-semibold'>
          ⭐{rating}
          <span className='text-[--text-primary] font-normal text-xs'>({reviews} reviews)</span>
        </p>
      </div>
    </Link>
  );
};

export default StayProduct;
