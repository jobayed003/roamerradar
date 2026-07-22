'use client';

import Cars from '@/app/(browse)/cars/_components/Cars';
import { CategoryShell } from '@/components/category/CategoryShell';
import { CarouselProvider } from '@/components/CarouselProvider';
import NearbyLocations from '@/components/NearbyLocations';
import Panel from '@/components/Panel';
import { CarProducts } from '@/components/products/CarProducts';
import { CarouselItem } from '@/components/ui/carousel';
import { createSearchParams, getCountryByPlaceName } from '@/lib/utils';
import { ListingItem } from '@/types/listing';
import { useBookingDate, useCarStore, useTravelers } from '@/stores/useData';
import { format } from 'date-fns';
import { CarFrontIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const filters = ['Sightseeing', 'Transportation activities', 'Art and culture'];
const selectItems = ['Time of day', 'Time of week'];

const CarsCategory = ({ listings }: { listings: ListingItem[] }) => {
  const router = useRouter();
  const { pickupLocation } = useCarStore();
  const { date } = useBookingDate();
  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);

  const travelDates = format(date?.from ?? Date.now(), 'MMM d') + ' - ' + format(date?.to ?? Date.now(), 'MMM d');

  useEffect(() => {
    const url = createSearchParams({ baseUrl: '/cars-category', params: pickupLocation });
    router.push(url.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pickupLocation]);

  const pickupLocations = useMemo(
    () =>
      listings.slice(0, 8).map((listing) => ({
        id: listing.id,
        label: listing.location ?? listing.title,
        price: Math.round(listing.offerPrice ?? listing.price),
      })),
    [listings]
  );

  return (
    <div>
      <div className='h-60 w-full flex flex-col justify-center text-dark_russian p-20 pt-24 flex-shrink relative mt-4 mb-32'>
        <Image src={'/images/bg-car.jpg'} fill className={'object-cover -z-10 absolute'} alt='hero image' />
        <Panel className='lg:-bottom-16 lg:max-w-7xl 2xl:mx-auto mx-8'>
          <div className='flex flex-col lg:p-10 p-5'>
            <Cars />
          </div>
        </Panel>
      </div>

      <div className='lg:max-w-7xl mx-auto'>
        <CategoryShell
          contentClassName='md:px-20 px-10'
          breadcrumb={{
            backRoute: 'cars-category',
            originRoute: 'cars',
            location: getCountryByPlaceName(pickupLocation),
            searchedLocation: pickupLocation,
          }}
          title={`${listings.length || 0} cars found`}
          badge='Up to 25% off'
          subtitle={`${travelDates}, ${totalTravelers} guests`}
          filters={filters}
          selectItems={selectItems}
          footer={<NearbyLocations />}
        >
          <CarProducts listings={listings} />
        </CategoryShell>
      </div>

      {pickupLocations.length > 0 ? (
        <div className='text-center pb-16'>
          <h1 className='font-bold lg:text-5xl text-4xl text-wrap text-ellipsis'>Recommended pickup locations</h1>
          <p className='lg:text-2xl md:text-md text-sm my-4 text-gray_text font-poppins'>
            Based on cars currently available
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
