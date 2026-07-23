'use client';

import Cars from '@/app/(browse)/cars/_components/Cars';
import { CategoryShell } from '@/components/category/CategoryShell';
import { CarouselProvider } from '@/components/CarouselProvider';
import HeroSection from '@/components/HeroSection';
import NearbyLocations from '@/components/NearbyLocations';
import { CarProducts } from '@/components/products/CarProducts';
import { CarouselItem } from '@/components/ui/carousel';
import { createSearchParams, countryFromMap } from '@/lib/utils';
import { ListingItem } from '@/types/listing';
import { useBookingDate, useCarStore, useTravelers } from '@/stores/useData';
import { format } from 'date-fns';
import { CarFrontIcon } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef } from 'react';

const filters = ['Automatic', 'Manual', 'SUV', 'Economy'];
const selectItems = ['Price: low to high', 'Price: high to low'];

const CarsCategory = ({
  listings,
  placeCountryMap,
  initialQuery = '',
}: {
  listings: ListingItem[];
  placeCountryMap: Record<string, string>;
  initialQuery?: string;
}) => {
  const router = useRouter();
  const { pickupLocation, setLocations } = useCarStore();
  const { date } = useBookingDate();
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);
  const hydrated = useRef(false);

  useEffect(() => {
    if (initialQuery) {
      setLocations('pickupLocation', initialQuery);
    }
    hydrated.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  useEffect(() => {
    if (!hydrated.current || !pickupLocation.trim()) return;
    const url = createSearchParams({ baseUrl: '/cars-category', params: pickupLocation });
    router.replace(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupLocation]);

  const displayLocation = pickupLocation.trim() || initialQuery.trim() || 'London';
  const countryName = countryFromMap(placeCountryMap, displayLocation);
  const travelDates =
    format(date?.from ?? Date.now(), 'MMM d') + ' - ' + format(date?.to ?? Date.now(), 'MMM d');

  const filteredListings = useMemo(() => {
    const query = displayLocation.toLowerCase();
    if (!query) return listings;

    const matched = listings.filter((listing) => {
      const haystack = `${listing.location ?? ''} ${listing.title}`.toLowerCase();
      return haystack.includes(query) || query.split(/[\s,]+/).some((part) => part.length > 2 && haystack.includes(part));
    });

    return matched.length > 0 ? matched : listings;
  }, [listings, displayLocation]);

  const pickupLocations = useMemo(
    () =>
      filteredListings.slice(0, 8).map((listing) => ({
        id: listing.id,
        label: listing.location ?? listing.title,
        price: Math.round(listing.offerPrice ?? listing.price),
      })),
    [filteredListings]
  );

  return (
    <div className='px-2 lg:max-w-7xl mx-auto'>
      <HeroSection
        img='images/bg-car.jpg'
        className='mb-32'
        location={displayLocation}
        countryName={countryName || 'Car rentals'}
        imgClass='rounded-3xl'
      >
        <Cars />
      </HeroSection>

      <CategoryShell
        homeHref='/cars'
        breadcrumb={{
          backRoute: 'cars-category',
          originRoute: 'cars',
          originHref: '/cars',
          location: countryName || undefined,
          searchedLocation: displayLocation,
        }}
        title={`${filteredListings.length} cars available`}
        badge='Free cancellation'
        subtitle={`${travelDates} · ${totalTravelers} traveler${totalTravelers === 1 ? '' : 's'}`}
        filters={filters}
        selectItems={selectItems}
        footer={<NearbyLocations />}
      >
        <CarProducts listings={filteredListings} location={displayLocation} />
      </CategoryShell>

      {pickupLocations.length > 0 ? (
        <div className='text-center pb-16 px-4'>
          <h2 className='font-bold lg:text-5xl text-4xl'>Recommended pickup spots</h2>
          <p className='lg:text-2xl md:text-md text-sm my-4 text-gray_text font-poppins'>
            Based on cars currently listed near your search
          </p>

          <CarouselProvider className='my-16'>
            {pickupLocations.map((item) => (
              <CarouselItem
                key={item.id}
                className='flex justify-center xl:basis-1/6 md:basis-1/4 sm:basis-1/3 basis-full'
              >
                <PickupLocationCard {...item} />
              </CarouselItem>
            ))}
          </CarouselProvider>
        </div>
      ) : null}
    </div>
  );
};

type PickupLocationCardProps = {
  id: string;
  label: string;
  price: number;
};

const PickupLocationCard = ({ id, label, price }: PickupLocationCardProps) => {
  return (
    <Link
      href={`/cars-product/${id}`}
      className='dark:bg-dark_russian hover:dark:bg-dark_bg border dark:border-dark_russian hover:border-[#E6E6EC] rounded-3xl w-64 h-64 p-6 transition-all'
    >
      <div className='flex flex-col items-start justify-between h-full'>
        <div className='bg-[#E6E8EC] dark:bg-gray_border text-foreground text-xs font-bold rounded-full p-2 px-4 w-max'>
          Car
        </div>

        <div className='self-start text-left'>
          <CarFrontIcon className='w-8 h-8 text-gray_text' />
          <p className='font-medium text-dark_russian dark:text-white mt-6 line-clamp-2'>{label}</p>
          <p className='text-xs text-gray_text'>From USD {price} per day</p>
        </div>
      </div>
    </Link>
  );
};

export default CarsCategory;
