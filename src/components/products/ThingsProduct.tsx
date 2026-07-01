import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ListingItem } from '@/types/listing';
import { Clock, LucideIcon, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const AMENITY_ICONS: Record<string, LucideIcon> = {
  '12 hours': Clock,
  'Up to 10 people': User2,
};

type ThingsProductProps = {
  listings: ListingItem[];
};

export const ThingsProduct = ({ listings }: ThingsProductProps) => {
  if (listings.length === 0) {
    return (
      <p className='text-gray_text text-center py-8'>No experiences found. Run `npm run db:seed` to populate listings.</p>
    );
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='grid xl:grid-cols-2 lg:grid-cols-3 md:grid-cols-2 w-full gap-x-3 gap-y-8 mt-8'>
        {listings.map((listing) => (
          <ThingsProductCard key={listing.id} listing={listing} />
        ))}
      </div>

      <Button variant={'outline'} className='my-8 border-2 border-gray_text rounded-full'>
        <LoadingSpinner className='mr-2' />
        Show More
      </Button>
    </div>
  );
};

const ThingsProductCard = ({ listing }: { listing: ListingItem }) => {
  const isBestSelling = listing.metadata?.isBestSelling ?? false;
  const offerPrice = listing.offerPrice ?? listing.price;

  return (
    <Link
      href={'/things-product/' + listing.id}
      className='grid xl:grid-cols-2 grid-row-2 xl:max-w-[600px] w-full rounded-2xl border dark:border-gray_border border-[#E6E8EC] shadow-sm font-poppins'
    >
      <div className='w-full md:h-72 max-h-[400px] h-96 relative overflow-hidden xl:rounded-s-xl max-xl:rounded-t-xl'>
        <Image
          src={listing.image}
          alt={listing.title}
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
          <h1 className='font-medium'>{listing.title}</h1>

          <div className='border-2 self-start rounded-md border-[#58C27D] text-green-500 text-xs font-bold px-2 py-1'>
            <p className='text-[#58C27D] line-through'>
              ${listing.price} <br />
            </p>
            <p className='text-gray_light font-semibold'>${offerPrice}</p>
          </div>
        </div>

        <div className='flex justify-between text-xs text-gray_text'>
          <div className='flex gap-x-2 mt-2'>
            {listing.amenities.map((name) => {
              const Icon = AMENITY_ICONS[name] ?? Clock;
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
              {listing.description ?? 'The best small group, intimate and unique experience...'}
            </p>
          </div>
        </div>
        <div className='flex justify-between text-xs text-gray_text mt-2'>
          <p className='text-foreground font-semibold'>${listing.price} total</p>
          <p className='text-foreground font-semibold'>
            ⭐{listing.rating}
            <span className='text-gray_text font-normal text-xs'>({listing.reviewCount} reviews)</span>
          </p>
        </div>
      </div>
    </Link>
  );
};
