import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type PreviewCardProps = {
  name: string;
  amenities: { name: string; icon: LucideIcon }[];
  img: string;
  price: number;
  offerPrice: number;
  rating: number;
  reviews: number;
  isSuperHost: boolean;
};

export const PreviewCard = ({
  name,
  amenities,
  img,
  price,
  offerPrice,
  rating,
  reviews,
  isSuperHost,
}: PreviewCardProps) => {
  return (
    <Link href={'/stays-product'} className='md:max-w-[350px] w-full rounded-3xl border border-gray_border shadow-sm '>
      <div className='w-full md:h-[240px] h-[300px] relative overflow-hidden rounded-t-xl'>
        <Image
          src={img}
          alt='location img'
          className='absolute object-cover hover:scale-110 transition-all duration-1000'
          fill
        />

        {isSuperHost && (
          <div className='absolute dark:bg-foreground bg-background uppercase font-bold font-poppins text-xs rounded-sm top-4 left-4 px-2 pt-[11px] pb-[9px] text-gray_border'>
            SuperHost
          </div>
        )}
      </div>
      <div className='flex justify-between p-6'>
        <div>
          <h1 className='font-medium'>{name}</h1>
          <div className='flex gap-x-2 mt-2'>
            {amenities.map((item) => (
              <div className='flex gap-x-1 items-center' key={item.name}>
                <item.icon className='w-3 h-3 text-gray_text' />
                <p className='text-xs text-gray_text font-poppins'>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className='border-2 self-center rounded-md border-[#58C27D] text-xs font-bold px-2 py-1'>
          <p className='line-through'>${price}</p>
          <p className='text-[#58C27D]'>${offerPrice}</p>
        </div>
      </div>

      <div className='flex justify-between py-6 mx-6 border-t border-[#E6E8EC] dark:border-gray_border text-xs text-gray_text font-poppins'>
        <p className='text-foreground font-semibold'>${offerPrice} total</p>
        <p className='text-foreground font-semibold'>
          ⭐{rating}
          <span className='text-gray_text font-normal text-xs'>({reviews} reviews)</span>
        </p>
      </div>
    </Link>
  );
};
