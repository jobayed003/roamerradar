'use client';

import { Separator } from '@/components/ui/separator';
import { LucideIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type ProductSuggestion = {
  id: number;
  name: string;
  pickupLocation: string;
  img: string;
  amenities: { name: string; icon: LucideIcon }[];
  isBestSelling: boolean;
  oldPrice: number;
  newPrice: number;
  rating: number;
  reviews: number;
};

export const ProductSuggestion = ({
  id,
  name,
  img,
  amenities,
  isBestSelling,
  pickupLocation,
  oldPrice,
  newPrice,
  rating,
  reviews,
}: ProductSuggestion) => {
  return (
    <Link
      href={'/things-product/' + id}
      className='grid grid-row-2 w-full rounded-3xl border dark:border-gray_border border-[#E6E8EC] shadow-sm font-poppins mx-4'
    >
      <div className='h-72 max-h-[400px] relative overflow-hidden rounded-t-3xl'>
        <Image
          src={img}
          alt='location img'
          className='absolute h-full object-fill hover:scale-110 transition-all duration-1000'
          fill
        />

        {isBestSelling && (
          <div className='absolute bg-blue uppercase font-bold font-poppins text-xs rounded-sm top-4 left-4 px-2 pt-[11px] pb-[9px] text-white'>
            Best Selling
          </div>
        )}
      </div>
      <div className='flex flex-col justify-between gap-y-4 p-6 px-4'>
        <div className='flex justify-between gap-x-4'>
          <h1 className='font-medium'>{name}</h1>

          <div className='border-2 self-start rounded-md border-[#58C27D] text-green-500 text-xs font-bold px-2 py-1'>
            <p className='text-[#58C27D] line-through'>
              ${oldPrice} <br />
            </p>
            <p className='text-gray_light font-semibold'>${newPrice}</p>
          </div>
        </div>

        <div className='flex justify-between text-xs text-gray_text'>
          <div className='flex gap-x-2 mt-2'>
            {amenities.map((item) => (
              <div className='flex gap-x-1 items-center' key={item.name}>
                <item.icon className='w-4 h-4 text-gray_text' />
                <p className='text-xs text-gray_text font-poppins'>{item.name}</p>
              </div>
            ))}
          </div>
        </div>

        <Separator />

        <div className='flex justify-between items-center gap-x-2'>
          <div>
            <Image
              src={'/user.jpg'}
              alt='user img'
              width={25}
              height={25}
              className='h-8 w-8 object-cover rounded-full'
            />
          </div>

          <div className='w-full'>
            <p className='text-xs text-gray_text leading-5'>
              The best 16 passenger small group, intimate and unique, Milford Sound...
            </p>
          </div>
        </div>
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
