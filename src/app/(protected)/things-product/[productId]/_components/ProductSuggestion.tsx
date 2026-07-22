'use client';

import { Separator } from '@/components/ui/separator';
import type { ListingItem } from '@/types/listing';
import { Clock, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export const ProductSuggestion = ({ listing }: { listing: ListingItem }) => {
  const price = listing.offerPrice ?? listing.price;
  const oldPrice = listing.offerPrice && listing.offerPrice < listing.price ? listing.price : price;
  const amenities = (listing.amenities.length > 0 ? listing.amenities : ['Half day', 'Small group']).slice(0, 2);

  return (
    <Link
      href={`/things-product/${listing.id}`}
      className='grid grid-row-2 w-full rounded-3xl border dark:border-gray_border border-[#E6E8EC] shadow-sm font-poppins mx-4'
    >
      <div className='h-72 max-h-[400px] relative overflow-hidden rounded-t-3xl'>
        <Image
          src={listing.image}
          alt={listing.title}
          className='absolute h-full object-cover hover:scale-110 transition-all duration-1000'
          fill
        />

        {listing.isPopular && (
          <div className='absolute bg-blue uppercase font-bold font-poppins text-xs rounded-sm top-4 left-4 px-2 pt-[11px] pb-[9px] text-white'>
            Best Selling
          </div>
        )}
      </div>
      <div className='flex flex-col justify-between gap-y-4 p-6 px-4'>
        <div className='flex justify-between gap-x-4'>
          <h1 className='font-medium line-clamp-2'>{listing.title}</h1>

          <div className='border-2 self-start rounded-md border-[#58C27D] text-green-500 text-xs font-bold px-2 py-1'>
            {oldPrice !== price ? (
              <p className='text-[#58C27D] line-through'>${Math.round(oldPrice)}</p>
            ) : null}
            <p className='text-gray_light font-semibold'>${Math.round(price)}</p>
          </div>
        </div>

        <div className='flex justify-between text-xs text-gray_text'>
          <div className='flex gap-x-2 mt-2'>
            {amenities.map((name, index) => {
              const Icon = index === 0 ? Clock : User2;
              return (
                <div className='flex gap-x-1 items-center' key={name}>
                  <Icon className='w-4 h-4 text-gray_text' />
                  <p className='text-xs text-gray_text font-poppins'>{name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <Separator />

        <div className='flex justify-between items-center gap-x-2'>
          <Image
            src={listing.owner?.image ?? '/user.jpg'}
            alt={listing.owner?.displayName ?? 'Host'}
            width={25}
            height={25}
            className='h-8 w-8 object-cover rounded-full'
          />
          <div className='w-full'>
            <p className='text-xs text-gray_text leading-5 line-clamp-2'>
              {listing.description ?? listing.location ?? 'Popular experience nearby'}
            </p>
          </div>
        </div>
        <div className='flex justify-between text-xs text-gray_text mt-2'>
          <p className='text-foreground font-semibold'>${Math.round(price)} total</p>
          <p className='text-foreground font-semibold'>
            ⭐{listing.rating}
            <span className='text-gray_text font-normal text-xs'>({listing.reviewCount} reviews)</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
