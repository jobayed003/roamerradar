import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { ListingItem } from '@/types/listing';
import { ArrowRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import { EmptyListings } from './EmptyListings';

type FlightDealsProps = {
  listings?: ListingItem[];
  hasActiveFilters?: boolean;
};

export const FlightDeals = ({ listings = [], hasActiveFilters }: FlightDealsProps) => {
  if (listings.length === 0) {
    return (
      <div className='w-full'>
        {hasActiveFilters ? (
          <div className='rounded-3xl border dark:border-gray_border p-10 text-center'>
            <h2 className='text-xl font-bold mb-2'>No flights match your filters</h2>
            <p className='text-gray_text text-sm'>Try adjusting the price range or stop preferences.</p>
          </div>
        ) : (
          <EmptyListings label='flights' />
        )}
      </div>
    );
  }

  return (
    <div className='flex flex-col gap-y-6 w-full min-w-0'>
      {listings.map((listing) => (
        <FlightCard key={listing.id} listing={listing} />
      ))}
    </div>
  );
};

const FlightCard = ({ listing }: { listing: ListingItem }) => {
  const legs = listing.metadata?.legs ?? [];
  const provider = listing.metadata?.provider ?? 'eDreams';

  return (
    <article className='flex lg:flex-row flex-col gap-x-8 gap-y-6 dark:shadow-[inset_0_0_0_1px_#353945] shadow-[inset_0_0_0_1px_#F4F5F6] hover:shadow-none hover:dark:bg-dark_russian hover:bg-[#F4F5F6] rounded-3xl p-6 sm:p-8 min-w-0 transition-colors'>
      <div className='flex flex-col gap-y-6 flex-1 min-w-0'>
        <div className='min-w-0'>
          <h2 className='font-bold text-lg truncate'>{listing.title}</h2>
          <p className='text-xs text-gray_text mt-1'>Round-trip · via {provider}</p>
        </div>

        {legs.length === 0 ? (
          <p className='text-sm text-gray_text'>Flight details unavailable.</p>
        ) : (
          legs.map((leg, index) => <FlightDetails key={`${listing.id}-${index}`} {...leg} />)
        )}
      </div>

      <Separator className='lg:hidden dark:bg-gray_border bg-[#E6E8EC]' />

      <div className='flex flex-row lg:flex-col justify-between items-end gap-4 lg:w-44 shrink-0 w-full'>
        <div className='flex items-center gap-x-1 text-gray_text text-xs'>
          <Check className='w-4 h-4 font-bold shrink-0' />
          <span className='truncate'>{provider}</span>
        </div>
        <Link href={`/flights-product/${listing.id}`} className='h-12 group w-full sm:w-auto min-w-[160px]'>
          <Button
            variant='outline'
            className='rounded-full w-full h-12 text-green-500 shadow-[0_0_0_2px_#E6E8EC_inset] dark:shadow-[0_0_0_2px_#777E90_inset] hover:shadow-none hover:dark:shadow-none font-bold hover:bg-blue-hover hover:text-white transition-all'
          >
            <p className='group-hover:hidden'>${listing.price.toLocaleString()}</p>
            <div className='hidden group-hover:flex gap-x-3 items-center justify-center'>
              <p>View deal</p>
              <ArrowRight className='w-4 h-4' />
            </div>
          </Button>
        </Link>
      </div>
    </article>
  );
};

type FlightDetailsProps = {
  departingLocation: string;
  arrivalLocation: string;
  landingTime: string;
  takeOffTime: string;
  type: string;
  logo: string;
};

const FlightDetails = ({
  logo,
  departingLocation,
  takeOffTime,
  arrivalLocation,
  landingTime,
  type,
}: FlightDetailsProps) => {
  return (
    <div className='flex flex-col sm:flex-row w-full sm:items-center gap-4 sm:gap-6 min-w-0'>
      <div className='dark:bg-gray_light bg-[#F4F5F6] p-3 rounded-lg h-16 sm:h-20 w-full sm:w-36 flex justify-center items-center shrink-0'>
        <Image
          src={logo}
          width={100}
          height={50}
          alt='Airline logo'
          className='max-h-10 w-auto object-contain'
          unoptimized={logo.startsWith('http')}
        />
      </div>

      <div className='flex justify-between sm:justify-around items-center flex-1 min-w-0 gap-2'>
        <div className='text-center min-w-0'>
          <h3 className='text-xl sm:text-2xl font-semibold truncate'>{departingLocation}</h3>
          <p className='font-medium text-gray_text text-xs sm:text-sm'>{takeOffTime}</p>
        </div>

        <div className='text-gray_text text-xs text-center px-2 shrink-0'>
          <Separator className='bg-[#E6E8EC] dark:bg-[#353945] mb-2 w-16 mx-auto' />
          <p className='capitalize'>{type}</p>
        </div>

        <div className='text-center min-w-0'>
          <h3 className='text-xl sm:text-2xl font-semibold truncate'>{arrivalLocation}</h3>
          <p className='font-medium text-gray_text text-xs sm:text-sm'>{landingTime}</p>
        </div>
      </div>
    </div>
  );
};
