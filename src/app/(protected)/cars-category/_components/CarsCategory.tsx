'use client';
import Cars from '@/app/(browse)/cars/_components/Cars';
import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import Panel from '@/components/Panel';
import { Button } from '@/components/ui/button';
import { getCountryByPlaceName } from '@/lib/utils';
import { useCarStore } from '@/stores/useData';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

const CarsCategory = () => {
  const { pickupLocation } = useCarStore();

  return (
    <div>
      <div
        className={
          'h-60 w-full flex flex-col justify-center text-[#23262F] p-20 pt-24 flex-shrink relative mt-4 mb-32 '
        }
      >
        <Image src={'/images/bg-car.jpg'} fill className={'object-cover -z-10 absolute'} alt='hero image' />
        <Panel className='lg:-bottom-16 lg:max-w-7xl 2xl:mx-auto mx-8'>
          <div className='flex flex-col lg:p-10 p-5'>
            <Cars />
          </div>
        </Panel>
      </div>

      <div className='px-20 pb-20 lg:max-w-7xl mx-auto'>
        <div className='flex justify-between'>
          <Link href={'/'}>
            <Button variant={'outline'} className='rounded-full'>
              <ChevronLeft className='h-5 w-5 mr-3' />
              Go Home
            </Button>
          </Link>
          <BreadcrumbProvider
            backroute='cars-category'
            originRoute=''
            location={getCountryByPlaceName(pickupLocation)}
            searchedLocation={pickupLocation}
          />
        </div>
      </div>
    </div>
  );
};

export default CarsCategory;
