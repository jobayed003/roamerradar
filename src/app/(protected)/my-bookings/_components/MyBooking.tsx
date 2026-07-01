'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import CategoryFilter from '@/components/CategoryFilter';
import LinkButton from '@/components/LinkButton';
import NearbyLocations from '@/components/NearbyLocations';
import { CarProducts } from '@/components/products/CarProducts';
import { FlightDeals } from '@/components/products/FlightDeals';
import { StayProducts } from '@/components/products/StayProducts';
import { ThingsProduct } from '@/components/products/ThingsProduct';
import Layout from '@/components/ui/Layout';
import { Separator } from '@/components/ui/separator';
import { ListingItem } from '@/types/listing';

import { ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const bookingFilters = ['Stays', 'Flights', 'Cars', 'Things to do'];
const bookingSelectItems = ['Past', 'Upcoming', 'Future'];

type MyBookingProps = {
  stays: ListingItem[];
  flights: ListingItem[];
  cars: ListingItem[];
  experiences: ListingItem[];
};

const MyBooking = ({ stays, flights, cars, experiences }: MyBookingProps) => {
  const param = useSearchParams().get('q')?.split(' ')[0];

  const steps = [
    { stepName: 'stays', component: <StayProducts listings={stays} /> },
    { stepName: 'flights', component: <FlightDeals listings={flights} /> },
    { stepName: 'cars', component: <CarProducts listings={cars} /> },
    { stepName: 'things', component: <ThingsProduct listings={experiences} /> },
  ];

  return (
    <>
      <Separator className='bg-dark_russian mb-4' />

      <Layout className='lg:px-20 px-8'>
        <div className='flex justify-between pb-20'>
          <LinkButton href='/' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>

          <BreadcrumbProvider backRoute='/' originRoute='my-bookings' />
        </div>

        <div>
          <h1 className='text-5xl font-bold mb-3'>My Bookings</h1>
          <p className='font-medium text-gray_text font-poppins'>You added {8} items to bookings</p>
        </div>

        <CategoryFilter filters={bookingFilters} selectItems={bookingSelectItems} />

        {steps.map((step) => step.stepName === param && step.component)}

        <NearbyLocations title='You may also like' />
      </Layout>
    </>
  );
};

export default MyBooking;
