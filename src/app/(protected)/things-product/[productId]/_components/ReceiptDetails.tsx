'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import {
  buildCheckoutUrl,
  ensureStayDateRange,
  formatStayDate,
} from '@/lib/booking-pricing';
import { useBookingDate, useTravelers } from '@/stores/useData';
import { ListingItem } from '@/types/listing';
import { CalendarDays, ShoppingBagIcon, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo } from 'react';
import { FaCheckCircle, FaStar } from 'react-icons/fa';

export const ReceiptDetails = ({ listing }: { listing: ListingItem }) => {
  const { date } = useBookingDate();
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);
  const guests = Math.max(1, totalTravelers);
  const range = useMemo(() => ensureStayDateRange(date?.from, date?.to ?? date?.from), [date?.from, date?.to]);
  const unitPrice = listing.offerPrice ?? listing.price;
  const total = Math.round(unitPrice * guests * 100) / 100;
  const checkoutHref = buildCheckoutUrl({
    itemId: listing.id,
    checkIn: range.checkIn,
    checkOut: range.checkIn,
    guests,
  });

  return (
    <div className='dark:bg-dark_russian border dark:border-gray_border p-8 lg:max-w-md w-full rounded-3xl h-min'>
      <div className='flex items-center justify-between mb-8'>
        <div>
          <div className='flex gap-2 text-3xl font-bold'>
            {listing.offerPrice != null && listing.offerPrice < listing.price && (
              <h1 className='text-gray_light line-through'>${listing.price}</h1>
            )}
            <h1>${unitPrice}</h1>
            <p className='text-base font-normal self-end text-gray_text'>/person</p>
          </div>
          <div className='flex gap-2 mt-2'>
            <FaStar size={22} fill='#FFD166' />
            <p className='font-medium text-foreground'>
              {listing.rating} <span className='ml-1 text-gray_text'>({listing.reviewCount} reviews)</span>
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
            <p className='text-foreground font-medium'>{formatStayDate(range.checkIn)}</p>
          </div>

          <Separator orientation='vertical' className='h-10 bg-gray_text' />
          <User2 className='w-6 h-6' />
          <div className='flex flex-col font-poppins'>
            <p className='text-xs'>Guest</p>
            <p className='text-foreground font-medium'>
              {guests} guest{guests === 1 ? '' : 's'}
            </p>
          </div>
        </div>
      </div>
      <div className='flex flex-col gap-y-4 mt-8'>
        <div className='flex justify-between items-center'>
          <div className='flex flex-col'>
            <h1 className='font-medium'>{formatStayDate(range.checkIn)}</h1>
            <p className='text-gray_text text-xs'>Experience date · {guests} guest{guests === 1 ? '' : 's'}</p>
          </div>
          <Link href={checkoutHref} className='group'>
            <Button
              variant={'fill'}
              className='hover:bg-blue-hover dark:hover:bg-gray_border dark:text-white text-dark_bg-dark_russian hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[inset_0_0_0_2px_#3B71FE] hover:dark:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold px-6 h-12 gap-x-4 group-hover:text-white'
            >
              <p className='font-bold'>
                <span className='text-[#58C27D] group-hover:text-white'>${total}</span> total
              </p>
              <ShoppingBagIcon className='w-3 h-3' />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
