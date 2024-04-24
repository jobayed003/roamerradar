'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import CategoryFilter from '@/components/CategoryFilter';
import { FlightDeals } from '@/components/FlightDeals';
import LinkButton from '@/components/LinkButton';
import NearbyLocations from '@/components/NearbyLocations';
import StayProduct from '@/components/StayProduct';
import Layout from '@/components/ui/Layout';
import { Separator } from '@/components/ui/separator';

import { ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const bookingFilters = ['Stays', 'Flights', 'Cars', 'Things to do'];
const bookingSelectItems = ['Past', 'Upcoming', 'Future'];
const steps = [
  { stepName: 'stays', component: <StayProduct /> },
  { stepName: 'flights', component: <FlightDeals /> },
  { stepName: 'cars', component: <div>Cars</div> },
  { stepName: 'things', component: <div>Things</div> },
];

const MyBooking = () => {
  const param = useSearchParams().get('q')?.split(' ')[0];

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
          <h1 className='text-5xl font-bold mb-3'>Bookings</h1>
          <p className='font-medium text-gray_text font-poppins'>You added {8} items to wishlists</p>
        </div>

        <CategoryFilter filters={bookingFilters} selectItems={bookingSelectItems} />

        {steps.map((step) => step.stepName === param && step.component)}

        <NearbyLocations title='You may also like' />
      </Layout>
    </>
  );
};
export default MyBooking;
