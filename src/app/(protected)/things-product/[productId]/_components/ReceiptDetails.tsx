'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { useTravelers } from '@/stores/useData';
import { CalendarDays, ShoppingBagIcon, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FaCheckCircle, FaStar } from 'react-icons/fa';

export const ReceiptDetails = () => {
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);

  return (
    <div className='dark:bg-dark_russian border dark:border-gray_border p-8 lg:max-w-md w-full rounded-3xl h-min'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <div className='flex gap-2 text-3xl font-bold'>
            <h1 className='text-[#b1b5c3] line-through'>${124}</h1>
            <h1>${104}</h1>
            <p className='text-base font-normal self-end text-gray_text'>/person</p>
          </div>
          <div className='flex gap-2 mt-2'>
            <FaStar size={22} fill='#FFD166' />
            <p className='font-medium text-foreground'>
              4.8 <span className='ml-1 text-gray_text'>(234 reviews)</span>
            </p>
          </div>
        </div>
        <div className='relative'>
          <Image
            src={'/user.jpg'}
            alt='user img'
            width={60}
            height={70}
            className='rounded-full w-16 h-16 object-fill'
          />
          <div className='absolute top-0 right-0 z-50 bg-white rounded-full'>
            <FaCheckCircle className='text-green-400 bg-transparent overflow-hidden rounded-full' size={20} />
          </div>
        </div>
      </div>
      <div className='dark:bg-gray_border bg-[#F4F5F6] rounded-2xl'>
        <div className='flex items-center flex-wrap gap-4 text-gray_text p-3 py-4'>
          <CalendarDays className='w-6 h-6' />
          <div className='flex flex-col font-poppins'>
            <p className='text-xs'>Date</p>
            <p className='text-foreground font-medium'>May 15, 2024</p>
          </div>

          <Separator orientation='vertical' className='h-10 bg-gray_text' />
          <User2 className='w-6 h-6' />
          <div className='flex flex-col font-poppins'>
            <p className='text-xs'>Guest</p>
            <p className='text-foreground font-medium'>{totalTravelers} guests</p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-6 mt-8'>
        <ReceiptOffer />
        <ReceiptOffer />
        <ReceiptOffer />
        <ReceiptOffer />
      </div>
    </div>
  );
};

const ReceiptOffer = () => {
  return (
    <div className='flex justify-between'>
      <div className='flex flex-col'>
        <h1 className='font-medium'>Wed, June 23</h1>
        <p className='text-gray_text text-xs'>7.30 AM - 7.30 PM</p>
      </div>
      <Link href={'/checkout'} className='group'>
        <Button
          variant={'fill'}
          className='hover:bg-blue-hover dark:hover:bg-gray_border dark:text-white text-dark_bg-dark_russian hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[inset_0_0_0_2px_#3B71FE] hover:dark:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold px-6 h-12 gap-x-4 group-hover:text-white'
        >
          <p className='font-bold'>
            <span className='text-[#58C27D] group-hover:text-white'>$256</span> / person
          </p>
          <ShoppingBagIcon className='w-3 h-3' />
        </Button>
      </Link>
    </div>
  );
};
