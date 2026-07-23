'use client';

import Things from '@/app/(browse)/things/_components/Things';
import { CategoryShell } from '@/components/category/CategoryShell';
import HeroSection from '@/components/HeroSection';
import { ThingsProduct } from '@/components/products/ThingsProduct';
import { Input } from '@/components/ui/input';
import { createSearchParams, countryFromMap } from '@/lib/utils';
import { ListingItem } from '@/types/listing';
import { useBookingDate, useThingsStore, useTravelers } from '@/stores/useData';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const filters = ['Sightseeing', 'Transportation', 'Art and Culture', 'City tour'];
const selectItems = ['Times of day', 'Time of week'];

const ThingsCategory = ({
  listings,
  placeCountryMap,
}: {
  listings: ListingItem[];
  placeCountryMap: Record<string, string>;
}) => {
  const router = useRouter();
  const { location } = useThingsStore();
  const { date } = useBookingDate();
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);

  useEffect(() => {
    const url = createSearchParams({ baseUrl: '/things-category', params: location });
    router.push(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const travelDates = format(date?.from ?? Date.now(), 'MMM d') + ' - ' + format(date?.to ?? Date.now(), 'MMM d');
  const countryName = countryFromMap(placeCountryMap, location);

  return (
    <div className='px-2 lg:max-w-7xl mx-auto'>
      <HeroSection img='images/main-3.jpg' className='mb-32' location={location} countryName={countryName}>
        <Things />
      </HeroSection>

      <CategoryShell
        breadcrumb={{
          backRoute: 'things-category',
          originRoute: 'things',
          location: countryName,
          searchedLocation: location,
        }}
        title={`${listings.length || 0}+ experiences`}
        badge='Up to 25% off'
        subtitle={`${travelDates}, ${totalTravelers} guests`}
        filters={filters}
        selectItems={selectItems}
        footer={<NewsletterBlock />}
      >
        <ThingsProduct listings={listings} />
      </CategoryShell>
    </div>
  );
};

function NewsletterBlock() {
  return (
    <div className='flex flex-col md:flex-row justify-between items-center gap-x-4'>
      <div className='flex flex-col gap-y-4 md:max-w-[400px] mt-8'>
        <h1 className='text-5xl font-bold'>Join our newsletter 🎉</h1>
        <p className='text-gray_text mb-10'>
          Get travel deals, destination guides, and early access to seasonal offers.
        </p>
        <div className='flex flex-col gap-y-4'>
          <div className='flex gap-x-3'>
            <h1 className='bg-[#58C27D] w-10 text-center rounded-xl'>01</h1>
            <p>Get more discount</p>
          </div>
          <div className='flex gap-x-3'>
            <h1 className='bg-[#92A5EF] w-10 text-center rounded-xl'>02</h1>
            <p>Get premium travel magazine</p>
          </div>
        </div>
        <div className='mt-8 flex'>
          <Input
            placeholder='Enter your phone number'
            className='md:max-w-[300px] border-gray_border bg-transparent rounded-full py-5'
          />
          <div className='relative'>
            <div className='absolute right-1 top-2 p-1 bg-blue hover:bg-blue-hover rounded-full transition-all cursor-pointer'>
              <ArrowRight className='w-5 h-5' />
            </div>
          </div>
        </div>
      </div>
      <Image alt='newsletter pic' src='/images/newsletter-pic-1.png' width={500} height={500} />
    </div>
  );
}

export default ThingsCategory;
