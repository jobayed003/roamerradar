'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import CategoryFilter from '@/components/CategoryFilter';
import LinkButton from '@/components/LinkButton';
import NearbyLocations from '@/components/NearbyLocations';
import { CarProducts } from '@/components/products/CarProducts';
import { FlightDeals } from '@/components/products/FlightDeals';
import { StayProducts } from '@/components/products/StayProducts';
import Layout from '@/components/ui/Layout';
import { Separator } from '@/components/ui/separator';

import { ChevronLeft } from 'lucide-react';
import { useSearchParams } from 'next/navigation';

const wishlistsFilter = ['Stays', 'Flights', 'Cars', 'Things to do'];
const wishlistSelectItems = ['Past', 'Upcoming', 'Future'];
const steps = [
  { stepName: 'stays', component: <StayProducts /> },
  { stepName: 'flights', component: <FlightDeals /> },
  { stepName: 'cars', component: <CarProducts /> },
  { stepName: 'things', component: <StayProducts /> },
];

const Wishlist = () => {
  const param = useSearchParams().get('q')?.split(' ')[0];

  return (
    <>
      <Separator className='bg-dark_russian mb-4' />

      <Layout className='lg:px-20 px-8'>
        <div className='flex justify-between pb-20'>
          <LinkButton href='/' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>

          <BreadcrumbProvider backRoute='/' originRoute='wishlists' />
        </div>

        <div>
          <h1 className='text-5xl font-bold mb-3'>Wishlists</h1>
          <p className='font-medium text-gray_text font-poppins'>You added {8} items to wishlists</p>
        </div>

        <CategoryFilter filters={wishlistsFilter} selectItems={wishlistSelectItems} />

        {steps.map((step) => step.stepName === param && step.component)}

        <NearbyLocations title='You may also like' />
      </Layout>
    </>
  );
};
export default Wishlist;
