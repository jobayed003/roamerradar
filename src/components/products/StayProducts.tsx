import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Button } from '@/components/ui/button';
import { ListingItem } from '@/types/listing';
import { Clock, LucideIcon, Pizza, User2, Wifi } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const AMENITY_ICONS: Record<string, LucideIcon> = {
  'Free Wifi': Wifi,
  'Breakfast Included': Pizza,
  '12 hours': Clock,
  'Up to 10 people': User2,
};

type StayProductsProps = {
  listings: ListingItem[];
};

export const StayProducts = ({ listings }: StayProductsProps) => {
  if (listings.length === 0) {
    return <p className='text-gray_text text-center py-8'>No stays found. Run `npm run db:seed` to populate listings.</p>;
  }

  return (
    <div className='flex flex-col items-center'>
      <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6 w-full mt-8'>
        {listings.map((listing) => (
          <StayProductCard key={listing.id} listing={listing} />
        ))}
      </div>

      <Button variant={'outline'} className='my-8 border-2 border-gray_text rounded-full'>
        <LoadingSpinner className='mr-2' />
        Show More
      </Button>
    </div>
  );
};

const StayProductCard = ({ listing }: { listing: ListingItem }) => {
  const offerPrice = listing.offerPrice ?? listing.price;

  return (
    <Link href={'/stays-product/' + listing.id} className='rounded-3xl border border-gray_border shadow-sm'>
      <div className='w-full md:h-[240px] h-[300px] relative overflow-hidden rounded-t-xl'>
        <Image
          src={listing.image}
          alt={listing.title}
          className='absolute object-cover hover:scale-110 transition-all duration-1000'
          fill
        />
      </div>
      <div className='flex justify-between p-6'>
        <div>
          <h1 className='font-medium'>{listing.title}</h1>
          <div className='flex gap-x-2 mt-2'>
            {listing.amenities.map((name) => {
              const Icon = AMENITY_ICONS[name] ?? Wifi;
              return (
                <div className='flex gap-x-1 items-center' key={name}>
                  <Icon className='w-3 h-3 text-gray_text' />
                  <p className='text-xs text-gray_text font-poppins'>{name}</p>
                </div>
              );
            })}
          </div>
        </div>

        <div className='border-2 self-center rounded-md border-[#58C27D] text-xs font-bold px-2 py-1'>
          <p className='line-through'>${listing.price}</p>
          <p className='text-[#58C27D]'>${offerPrice}</p>
        </div>
      </div>

      <div className='flexf justify-between py-6 mx-6 border-t border-[#E6E8EC] dark:border-gray_border text-xs text-gray_text font-poppins'>
        <p className='text-foreground font-semibold'>${offerPrice} total</p>
        <p className='text-foreground font-semibold'>
          ⭐{listing.rating}
          <span className='text-gray_text font-normal text-xs'>({listing.reviewCount} reviews)</span>
        </p>
      </div>
    </Link>
  );
};
