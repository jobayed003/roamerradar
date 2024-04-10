'use client';

import Flights from '@/app/(browse)/flights/_components/Flights';
import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import CategoryFilter from '@/components/CategoryFilter';
import Panel from '@/components/Panel';
import Layout from '@/components/ui/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { createSearchParams } from '@/lib/utils';
import { useBookingDate, useFlightStore, useTravelers } from '@/stores/useData';
import { addMinutes, format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const selectItems = ['Recommended', 'Popular', 'In exchange'];
const filters = ['Cheapest', 'Best', 'With transfers'];

const FlightsCategory = () => {
  const router = useRouter();
  const [price, setPrice] = useState([3000, 0]);
  const [takeOfftime, setTakeOffTime] = useState([0, 30]);
  const [landingTime, setLandingTime] = useState([0, 30]);

  const { flyingFrom, flyingTo } = useFlightStore();
  const { date } = useBookingDate();

  const totalTravelers = useTravelers((state) => state.adults + state.children + state.toddlers);

  const travelDates = format(date?.from ?? Date.now(), 'MMM d') + ' - ' + format(date?.to ?? Date.now(), 'MMM d');

  useEffect(() => {
    const url = createSearchParams({ baseUrl: '/flights-category', params: flyingFrom });

    router.push(url.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyingFrom]);

  const dates = addMinutes(date?.from!, landingTime[0]);
  console.log(landingTime[0]);

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
            <Flights />
          </div>
        </Panel>
      </div>

      <Layout className='md:px-20 px-10 mt-72 lg:mt-0 pb-20 w-auto'>
        <div className='flex justify-between'>
          <Link href={'/'}>
            <Button variant={'outline'} className='rounded-full'>
              <ChevronLeft className='h-5 w-5 mr-3' />
              Go Home
            </Button>
          </Link>
          <BreadcrumbProvider backRoute='flights-category' originRoute='flights' />
        </div>

        <CategoryFilter filters={filters} selectItems={selectItems} className='md:flex-row-reverse' />

        <div className='flex flex-col md:flex-row  gap-x-8 items-center my-20 w-full'>
          <div className='w-full md:max-w-64 flex flex-col gap-y-6 '>
            <div className='text-xs text-[#B1B5C3] font-bold uppercase'>Price Range</div>
            <Slider
              className='px-1'
              defaultValue={[3500]}
              max={5000}
              min={1000}
              step={50}
              values={price}
              showLabel
              label='$'
              onValueChange={(value: number[]) => setPrice(value)}
            />

            <div className='flex justify-between font-bold text-sm'>
              <p>$1000</p>
              <p>$5000</p>
            </div>
            <Separator className='bg-gray_border mt-4' />

            <div className='text-xs text-[#B1B5C3] font-bold uppercase'>
              <p>Times</p>
            </div>

            <div className='text-gray_text'>
              <p className='font-medium'>Take-off</p>
              <p className='text-xs'>South Island(SIZ)</p>
            </div>
            <Slider
              defaultValue={[0, 50]}
              min={0}
              max={100}
              step={2.1}
              minStepsBetweenThumbs={1}
              values={takeOfftime}
              onValueChange={(value: number[]) => setTakeOffTime(value)}
            />

            <div className='flex justify-between font-bold text-sm'>
              <p>{takeOfftime[0]}</p>
              <p>{takeOfftime[1]}</p>
            </div>

            <div className='text-gray_text'>
              <p className='font-medium'>Landing</p>
              <p className='text-xs'>South Island(SIZ)</p>
            </div>
            <Slider
              defaultValue={[0, 50]}
              min={0}
              max={100}
              step={2.1}
              minStepsBetweenThumbs={1}
              values={landingTime}
              onValueChange={(value: number[]) => setLandingTime(value)}
            />

            <div className='flex justify-between font-bold text-sm'>
              <p>{landingTime[0] + 27.9}</p>
              <p>{landingTime[1]}</p>
            </div>

            <Separator className='bg-gray_border mt-4' />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default FlightsCategory;
