'use client';

import Flights from '@/app/(browse)/flights/_components/Flights';
import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import CategoryFilter from '@/components/CategoryFilter';
import LinkButton from '@/components/LinkButton';
import Panel from '@/components/Panel';
import Layout from '@/components/ui/Layout';
import { Button } from '@/components/ui/button';
import RadioButton from '@/components/ui/radio';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import { createSearchParams } from '@/lib/utils';
import { useBookingDate, useFlightStore } from '@/stores/useData';
import { addDays, addMinutes, format } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { useMediaQuery } from 'usehooks-ts';
import { FlightCard } from './FlightCard';

const selectItems = ['Recommended', 'Popular', 'In exchange'];
const filters = ['Cheapest', 'Best', 'With transfers'];

const FlightsCategory = () => {
  const [isClicked, setIsClicked] = useState(false);

  const [price, setPrice] = useState([3000, 0]);
  const [takeOfftime, setTakeOffTime] = useState([25, 75]);
  const [landingTime, setLandingTime] = useState([25, 75]);
  const [radioValues, setRadioValues] = useState({ nonStop: true, oneStop: false, twoPlusStops: false });

  const matches = useMediaQuery('(min-width: 768px)');

  const router = useRouter();

  const { flyingFrom } = useFlightStore();
  const { date } = useBookingDate();

  const takeOffMinutesToAddStart = Math.round((takeOfftime[0] / 100) * 1440);
  const takeOffMinutesToAddEnd = Math.round((takeOfftime[1] / 100) * 1440);
  const landingMinutesToAddStart = Math.round((landingTime[0] / 100) * 1440);
  const landingMinutesToAddEnd = Math.round((landingTime[1] / 100) * 1440);

  const takeOffNextDay = addDays(date?.from!, 1);
  const landingNextDay = addDays(date?.to!, 1);

  const takeoffStart = addMinutes(takeOffNextDay.setHours(0, 0, 0, 0), takeOffMinutesToAddStart);
  const takeoffEnd = addMinutes(takeOffNextDay.setHours(24)!, takeOffMinutesToAddEnd);

  const landingStart = addMinutes(landingNextDay.setHours(0, 0, 0, 0), landingMinutesToAddStart);
  const landingEnd = addMinutes(landingNextDay.setHours(24)!, landingMinutesToAddEnd);

  useEffect(() => {
    const url = createSearchParams({ baseUrl: '/flights-category', params: flyingFrom });

    router.push(url.toLowerCase());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [flyingFrom]);

  useEffect(() => {
    if (matches) setIsClicked(true);
  }, [matches]);

  return (
    <div>
      <div
        className={
          'h-60 w-full flex flex-col justify-center text-dark_russian p-20 pt-24 flex-shrink relative mt-4 mb-32 '
        }
      >
        <Image src={'/images/bg-car.jpg'} fill className={'object-cover -z-10 absolute'} alt='hero image' />
        <Panel className='lg:-bottom-16 lg:max-w-7xl 2xl:mx-auto mx-8'>
          <div className='flex flex-col lg:p-10 p-5'>
            <Flights />
          </div>
        </Panel>
      </div>

      <Layout className='lg:px-20 px-10 mt-72 lg:mt-0 pb-20 w-auto'>
        <div className='flex justify-between'>
          <LinkButton href='/' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>

          <BreadcrumbProvider backRoute='flights-category' originRoute='flights' />
        </div>

        <CategoryFilter filters={filters} selectItems={selectItems} className='md:flex-row-reverse flex-col-reverse' />
        <Button
          className='md:hidden w-full hover:bg-[#353945] py-6 rounded-full dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec]'
          variant={'outline'}
          onClick={() => setIsClicked(!isClicked)}
        >
          Advanced Filter
        </Button>

        <div className='flex flex-col md:flex-row gap-x-16 gap-y-10 my-20 w-full'>
          {isClicked && (
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
                <p className='text-xs'>South Island (SIZ)</p>
              </div>
              <Slider
                defaultValue={[25, 75]}
                min={0}
                max={100}
                step={2.1}
                minStepsBetweenThumbs={1}
                values={takeOfftime}
                onValueChange={(value: number[]) => setTakeOffTime(value)}
              />

              <div className='flex justify-between font-bold text-sm'>
                <p>
                  {format(date?.from!, 'EEE')}
                  <span className='ml-1'>{format(takeoffStart!, 'h:mm a')}</span>
                </p>
                <p>{format(takeoffEnd!, 'h:mm a')}</p>
              </div>
              {date?.to && (
                <>
                  <div className='text-gray_text'>
                    <p className='font-medium'>Landing</p>
                    <p className='text-xs'>South Island (SIZ)</p>
                  </div>
                  <Slider
                    defaultValue={[25, 75]}
                    min={0}
                    max={100}
                    step={2.1}
                    minStepsBetweenThumbs={1}
                    values={landingTime}
                    onValueChange={(value: number[]) => setLandingTime(value)}
                  />

                  <div className='flex justify-between font-bold text-sm'>
                    <p>
                      {format(date?.to!, 'EEE')}
                      <span className='ml-1'>{format(landingStart!, 'h:mm a')}</span>
                    </p>
                    <p>{format(landingEnd!, 'h:mm a')}</p>
                  </div>
                </>
              )}
              <Separator className='bg-gray_border mt-4' />

              <div className='flex flex-col'>
                <div className='flex justify-between items-center'>
                  <RadioButton
                    showCheck={radioValues.nonStop}
                    onChange={() => setRadioValues({ ...radioValues, nonStop: !radioValues.nonStop })}
                    label='Nonstop'
                  />
                  <div className='text-gray_text font-medium'>${'2,334'}</div>
                </div>
                <div className='flex justify-between items-center'>
                  <RadioButton
                    showCheck={radioValues.oneStop}
                    onChange={() => setRadioValues({ ...radioValues, oneStop: !radioValues.oneStop })}
                    label='1 Stop'
                  />
                  <div className='text-gray_text font-medium'>${'1,334'}</div>
                </div>
                <div className='flex justify-between items-center'>
                  <RadioButton
                    showCheck={radioValues.twoPlusStops}
                    onChange={() => setRadioValues({ ...radioValues, twoPlusStops: !radioValues.twoPlusStops })}
                    label='2+ stops'
                  />
                  <div className='text-gray_text font-medium'>${'734'}</div>
                </div>
              </div>

              <Separator className='bg-gray_border mt-4' />

              <Button
                variant={'transparent'}
                className='text-gray_text self-start px-0 font-bold text-sm hover:dark:text-white hover:text-foreground'
                onClick={() => setRadioValues({ nonStop: false, oneStop: false, twoPlusStops: false })}
              >
                <IoCloseCircle className='mr-1' size={20} />
                Reset Filter
              </Button>
            </div>
          )}

          <div className='flex flex-col gap-y-6 w-full '>
            {Array.from({ length: 4 }).map(() => (
              <FlightCard key={Math.random()} />
            ))}
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default FlightsCategory;
