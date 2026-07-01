import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ListingItem } from '@/types/listing';
import { Navigation, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { EmptyListings } from './EmptyListings';

type CarProductsProps = {
  listings: ListingItem[];
  location?: string;
};

export const CarProducts = ({ listings, location }: CarProductsProps) => {
  if (listings.length === 0) {
    return <EmptyListings label='cars' location={location} />;
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='flex w-full gap-x-6 gap-y-8 justify-center flex-wrap mt-8'>
        {listings.map((listing) => (
          <CarsProductCard key={listing.id} listing={listing} />
        ))}
      </div>

      <Button variant={'outline'} className='my-8 border-2 border-gray_text rounded-full'>
        <LoadingSpinner className='mr-2' />
        Show More
      </Button>
    </div>
  );
};

const CarsProductCard = ({ listing }: { listing: ListingItem }) => {
  const isPopular = listing.metadata?.isPopular ?? listing.isPopular;
  const supplier = listing.metadata?.supplier ?? 1;

  return (
    <Link
      href={'/cars-product/' + listing.id}
      className='grid md:grid-cols-2 grid-row-2 max-w-[545px] rounded-2xl border dark:border-gray_border border-[#E6E8EC] shadow-sm font-poppins'
    >
      <div className='w-full md:h-[230px] h-[300px] relative overflow-hidden rounded-s-xl'>
        <Image
          src={listing.image}
          alt={listing.title}
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
          <h1 className='font-medium'>{listing.title}</h1>

          <div className='border-2 self-start rounded-md border-[#58C27D] text-green-500 text-xs font-bold px-2 py-1'>
            <p className='text-[#58C27D]'>
              ${listing.price} <br />
              <span className='text-gray_light font-semibold'>/DAY</span>
            </p>
          </div>
        </div>

        <div className='flex justify-between text-xs text-gray_text mt-5'>
          <div className='flex gap-x-2'>
            <Navigation className='w-8 h-4' />
            <p className='text-wrap'>{listing.location}</p>
          </div>
          <div className='flex gap-x-2 text-nowrap'>
            <User2 className='w-4 h-4' />
            <p>{supplier} Supplier</p>
          </div>
        </div>
        <Separator />

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
