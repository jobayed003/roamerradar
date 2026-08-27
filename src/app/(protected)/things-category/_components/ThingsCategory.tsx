'use client';

import Things from '@/app/(browse)/things/_components/Things';
import { CategoryShell } from '@/components/category/CategoryShell';
import HeroSection from '@/components/HeroSection';
import { ThingsProduct } from '@/components/products/ThingsProduct';
import { Input } from '@/components/ui/input';
import { countryFromMap } from '@/lib/utils';
import { ListingItem } from '@/types/listing';
import { useBookingDate, useThingsStore, useTravelers } from '@/stores/useData';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useEffect, useRef } from 'react';

const filters = ['All', 'Sightseeing', 'Transportation', 'Art and Culture', 'City tour'];
const selectItems = ['Newest', 'Price: low to high', 'Price: high to low'];

const ThingsCategory = ({
  listings,
  placeCountryMap,
  initialQuery = '',
}: {
  listings: ListingItem[];
  placeCountryMap: Record<string, string>;
  initialQuery?: string;
}) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { location, setValues } = useThingsStore();
  const { date } = useBookingDate();
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);
  const hydrated = useRef(false);

  useEffect(() => {
    if (initialQuery) {
      setValues({ location: initialQuery });
    }
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  useEffect(() => {
    if (!hydrated.current) return;
    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });
    if (location.trim()) {
      query.q = location.trim();
    } else {
      delete query.q;
    }
    router.push(qs.stringifyUrl({ url: '/things-category', query }, { skipEmptyString: true }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const displayLocation = location.trim() || initialQuery.trim() || 'South Island';
  const travelDates = format(date?.from ?? Date.now(), 'MMM d') + ' - ' + format(date?.to ?? Date.now(), 'MMM d');
  const countryName = countryFromMap(placeCountryMap, displayLocation);

  return (
    <div className='px-2 lg:max-w-7xl mx-auto'>
      <HeroSection img='images/main-3.jpg' className='mb-32' location={displayLocation} countryName={countryName}>
        <Things />
      </HeroSection>

      <CategoryShell
        breadcrumb={{
          backRoute: 'things-category',
          originRoute: 'things',
          location: countryName,
          searchedLocation: displayLocation,
        }}
        title={`${listings.length || 0}+ experiences`}
        badge='Experiences'
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
          <div className='flex flex-col gap-y-4'>
            <div className='flex gap-x-3'>
              <h1 className='bg-[#58C27D] w-10 text-center rounded-xl'>02</h1>
              <p>Get premium travel magazines</p>
            </div>
          </div>
        </div>
        <div className='relative'>
          <Input
            className='bg-transparent dark:bg-transparent border-0 shadow-[inset_0_0_0_2px_#e6e8ec] dark:shadow-[inset_0_0_0_2px_#353945] rounded-full py-8'
            placeholder='Enter your phone number'
          />
          <div className='absolute right-2 top-1/2 -translate-y-1/2 bg-blue rounded-full p-4'>
            <ArrowRight className='text-white' />
          </div>
        </div>
      </div>
      <Image src='/images/newsletter.png' alt='newsletter' width={500} height={500} className='object-contain' />
    </div>
  );
}

export default ThingsCategory;
