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
import { ListingItem, ListingType } from '@/types/listing';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

const wishlistsFilter = ['Stays', 'Flights', 'Cars', 'Things to do'];

type WishlistProps = {
  listings: ListingItem[];
};

const Wishlist = ({ listings }: WishlistProps) => {
  const param = useSearchParams().get('q')?.split(' ')[0] ?? 'stays';

  const stays = listings.filter((item) => item.type === ListingType.STAY);
  const flights = listings.filter((item) => item.type === ListingType.FLIGHT);
  const cars = listings.filter((item) => item.type === ListingType.CAR);
  const experiences = listings.filter((item) => item.type === ListingType.EXPERIENCE);

  const steps = [
    { stepName: 'stays', component: <StayProducts listings={stays} />, count: stays.length },
    { stepName: 'flights', component: <FlightDeals listings={flights} />, count: flights.length },
    { stepName: 'cars', component: <CarProducts listings={cars} />, count: cars.length },
    { stepName: 'things', component: <ThingsProduct listings={experiences} />, count: experiences.length },
  ];

  const active = steps.find((step) => step.stepName === param) ?? steps[0];

  return (
    <>
      <Separator className='bg-dark_russian mb-4' />

      <Layout className='lg:px-20 px-8 pb-20'>
        <div className='flex justify-between pb-20'>
          <LinkButton href='/' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>

          <BreadcrumbProvider backRoute='/' originRoute='wishlists' />
        </div>

        <div>
          <h1 className='text-5xl font-bold mb-3'>Wishlists</h1>
          <p className='font-medium text-gray_text font-poppins'>
            You saved {listings.length} {listings.length === 1 ? 'item' : 'items'}
          </p>
        </div>

        <CategoryFilter filters={wishlistsFilter} selectItems={['Recently saved']} />

        {listings.length === 0 ? (
          <div className='rounded-3xl border dark:border-gray_border p-12 text-center mt-8'>
            <h2 className='text-xl font-bold mb-2'>Nothing saved yet</h2>
            <p className='text-gray_text text-sm max-w-md mx-auto mb-6'>
              Tap the heart on a stay, car, or experience to keep it here for later.
            </p>
            <Link href='/' className='text-blue font-bold hover:underline'>
              Browse stays
            </Link>
          </div>
        ) : active.count === 0 ? (
          <p className='text-gray_text text-center py-12 mt-4'>No saved {active.stepName} yet.</p>
        ) : (
          active.component
        )}

        <NearbyLocations title='You may also like' />
      </Layout>
    </>
  );
};

export default Wishlist;
