'use client';

import Flights from '@/app/(browse)/flights/_components/Flights';
import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import CategoryFilter from '@/components/CategoryFilter';
import LinkButton from '@/components/LinkButton';
import Panel from '@/components/Panel';
import { FlightDeals } from '@/components/products/FlightDeals';
import Layout from '@/components/ui/Layout';
import { ListingItem } from '@/types/listing';
import { Button } from '@/components/ui/button';
import RadioButton from '@/components/ui/radio';
import { Separator } from '@/components/ui/separator';
import { Slider } from '@/components/ui/slider';
import {
  filterFlightListings,
  getFlightPriceBounds,
  getLowestPriceByStop,
  type StopFilter,
} from '@/lib/flight-utils';
import { buildFlightsSearchUrl, type FlightsSearchParams } from '@/lib/search-urls';
import { useBookingDate, useFlightStore } from '@/stores/useData';
import { addDays, addMinutes, format, parseISO } from 'date-fns';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import { IoCloseCircle } from 'react-icons/io5';
import { useMediaQuery } from 'usehooks-ts';
import { TripOptions } from '../../../../../types';

const selectItems = ['Recommended', 'Popular', 'In exchange'];
const filters = ['Cheapest', 'Best', 'With transfers'];

const FlightsCategory = ({
  listings,
  searchError,
  routeLabel,
  source,
  initialSearch,
}: {
  listings: ListingItem[];
  searchError?: string;
  routeLabel?: string;
  source?: 'duffel' | 'unavailable';
  initialSearch: FlightsSearchParams;
}) => {
  const [isClicked, setIsClicked] = useState(false);
  const [stopFilters, setStopFilters] = useState<StopFilter[]>([]);

  const priceBounds = useMemo(() => getFlightPriceBounds(listings), [listings]);
  const lowestByStop = useMemo(() => getLowestPriceByStop(listings), [listings]);

  const [priceRange, setPriceRange] = useState<[number, number]>([priceBounds.min, priceBounds.max]);
  const [takeOfftime, setTakeOffTime] = useState([25, 75]);
  const [landingTime, setLandingTime] = useState([25, 75]);

  const matches = useMediaQuery('(min-width: 768px)');
  const router = useRouter();
  const { flyingFrom, flyingTo, tripType, setLocations, setTripType } = useFlightStore();
  const { date, setBookingDate } = useBookingDate();
  const hasHydratedFromUrl = useRef(false);

  useEffect(() => {
    setPriceRange([priceBounds.min, priceBounds.max]);
  }, [priceBounds.min, priceBounds.max]);

  const takeOffMinutesToAddStart = Math.round((takeOfftime[0] / 100) * 1440);
  const takeOffMinutesToAddEnd = Math.round((takeOfftime[1] / 100) * 1440);
  const landingMinutesToAddStart = Math.round((landingTime[0] / 100) * 1440);
  const landingMinutesToAddEnd = Math.round((landingTime[1] / 100) * 1440);

  const takeOffNextDay = addDays(date?.from ?? new Date(), 1);
  const landingNextDay = addDays(date?.to ?? date?.from ?? new Date(), 1);

  const takeoffStart = addMinutes(new Date(takeOffNextDay).setHours(0, 0, 0, 0), takeOffMinutesToAddStart);
  const takeoffEnd = addMinutes(new Date(takeOffNextDay).setHours(0, 0, 0, 0), takeOffMinutesToAddEnd);
  const landingStart = addMinutes(new Date(landingNextDay).setHours(0, 0, 0, 0), landingMinutesToAddStart);
  const landingEnd = addMinutes(new Date(landingNextDay).setHours(0, 0, 0, 0), landingMinutesToAddEnd);

  const filteredListings = useMemo(
    () =>
      filterFlightListings(listings, {
        priceRange,
        stopFilters,
        flyingFrom,
        flyingTo,
      }),
    [listings, priceRange, stopFilters, flyingFrom, flyingTo]
  );

  const originLabel = flyingFrom.trim() || 'Departure';
  const destinationLabel = flyingTo.trim() || 'Arrival';

  useEffect(() => {
    if (hasHydratedFromUrl.current) {
      return;
    }

    hasHydratedFromUrl.current = true;

    if (initialSearch.from) {
      setLocations('flyingFrom', initialSearch.from);
    }

    if (initialSearch.to) {
      setLocations('flyingTo', initialSearch.to);
    }

    if (initialSearch.departure) {
      setBookingDate({
        from: parseISO(initialSearch.departure),
        to: initialSearch.return ? parseISO(initialSearch.return) : undefined,
      });

      if (!initialSearch.return) {
        setTripType(TripOptions.ONEWAY);
      }
    }
  }, [initialSearch, setBookingDate, setLocations, setTripType]);

  useEffect(() => {
    if (!flyingFrom.trim()) {
      return;
    }

    const url = buildFlightsSearchUrl({
      from: flyingFrom,
      to: flyingTo,
      departure: date?.from,
      return: date?.to,
      isOneWay: tripType === TripOptions.ONEWAY,
    });

    router.replace(url);
  }, [date?.from, date?.to, flyingFrom, flyingTo, router, tripType]);

  useEffect(() => {
    if (matches) {
      setIsClicked(true);
    }
  }, [matches]);

  const toggleStopFilter = (filter: StopFilter) => {
    setStopFilters((current) =>
      current.includes(filter) ? current.filter((item) => item !== filter) : [...current, filter]
    );
  };

  const resetFilters = () => {
    setPriceRange([priceBounds.min, priceBounds.max]);
    setStopFilters([]);
    setTakeOffTime([25, 75]);
    setLandingTime([25, 75]);
  };

  const formatPrice = (value: number | null) => (value === null ? '—' : `$${value.toLocaleString()}`);

  return (
    <div>
      <div className='h-60 w-full flex flex-col justify-center text-dark_russian p-20 pt-24 flex-shrink relative mt-4 mb-32'>
        <Image src='/images/flight.avif' fill className='object-cover -z-10 absolute' alt='Flights hero' />
        <div className='absolute inset-0 -z-10 bg-black/35' />
        <Panel className='lg:-bottom-16 lg:max-w-7xl 2xl:mx-auto mx-8'>
          <div className='flex flex-col lg:p-10 p-5'>
            <Flights />
          </div>
        </Panel>
      </div>

      <Layout className='lg:px-20 px-4 sm:px-10 mt-72 lg:mt-0 pb-20 w-auto max-w-7xl mx-auto'>
        <div className='flex justify-between gap-4 flex-wrap'>
          <LinkButton href='/' label='Go Home'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>
          <BreadcrumbProvider backRoute='flights-category' originRoute='flights' />
        </div>

        <div className='mt-10 mb-6'>
          <h1 className='text-3xl sm:text-4xl font-bold'>Flight deals</h1>
          <p className='text-gray_text mt-2 text-sm sm:text-base'>
            {filteredListings.length} of {listings.length} flights
            {routeLabel
              ? ` · ${routeLabel}`
              : flyingFrom.trim() && flyingTo.trim()
                ? ` · ${flyingFrom} → ${flyingTo}`
                : flyingFrom.trim()
                  ? ` · from ${flyingFrom}`
                  : ''}
            {source === 'duffel' && listings.length > 0 ? ' · Live airline fares' : ''}
          </p>
          {searchError && (
            <div className='mt-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-sm text-amber-100'>
              {searchError}
            </div>
          )}
        </div>

        <CategoryFilter filters={filters} selectItems={selectItems} className='md:flex-row-reverse flex-col-reverse' />

        <Button
          className='md:hidden w-full hover:bg-[#353945] py-6 rounded-full dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec] mt-4'
          variant='outline'
          onClick={() => setIsClicked(!isClicked)}
        >
          {isClicked ? 'Hide filters' : 'Advanced filters'}
        </Button>

        <div className='flex flex-col md:flex-row gap-x-10 gap-y-10 my-10 w-full'>
          {isClicked && (
            <aside className='w-full md:max-w-72 shrink-0 flex flex-col gap-y-6'>
              <div className='text-xs text-gray_light font-bold uppercase'>Price range</div>
              <Slider
                className='px-1'
                min={priceBounds.min}
                max={priceBounds.max}
                step={50}
                value={priceRange}
                values={priceRange}
                showLabel
                label='$'
                onValueChange={(value: number[]) => setPriceRange([value[0], value[1] ?? value[0]])}
              />
              <div className='flex justify-between font-bold text-sm'>
                <p>${priceRange[0].toLocaleString()}</p>
                <p>${priceRange[1].toLocaleString()}</p>
              </div>
              <Separator className='bg-gray_border mt-2' />

              <div className='text-xs text-gray_light font-bold uppercase'>Times</div>
              <div className='text-gray_text'>
                <p className='font-medium'>Take-off</p>
                <p className='text-xs truncate'>{originLabel}</p>
              </div>
              <Slider
                min={0}
                max={100}
                step={2.1}
                minStepsBetweenThumbs={1}
                value={takeOfftime}
                values={takeOfftime}
                onValueChange={(value: number[]) => setTakeOffTime(value)}
              />
              <div className='flex justify-between font-bold text-sm gap-2'>
                <p className='truncate'>{format(takeoffStart, 'EEE h:mm a')}</p>
                <p className='truncate'>{format(takeoffEnd, 'h:mm a')}</p>
              </div>

              {date?.to && (
                <>
                  <div className='text-gray_text'>
                    <p className='font-medium'>Landing</p>
                    <p className='text-xs truncate'>{destinationLabel}</p>
                  </div>
                  <Slider
                    min={0}
                    max={100}
                    step={2.1}
                    minStepsBetweenThumbs={1}
                    value={landingTime}
                    values={landingTime}
                    onValueChange={(value: number[]) => setLandingTime(value)}
                  />
                  <div className='flex justify-between font-bold text-sm gap-2'>
                    <p className='truncate'>{format(landingStart, 'EEE h:mm a')}</p>
                    <p className='truncate'>{format(landingEnd, 'h:mm a')}</p>
                  </div>
                </>
              )}

              <Separator className='bg-gray_border mt-2' />

              <div className='flex flex-col gap-y-3'>
                <div className='flex justify-between items-center gap-3'>
                  <RadioButton
                    showCheck={stopFilters.includes('nonstop')}
                    onChange={() => toggleStopFilter('nonstop')}
                    label='Nonstop'
                  />
                  <div className='text-gray_text font-medium text-sm'>{formatPrice(lowestByStop.nonstop)}</div>
                </div>
                <div className='flex justify-between items-center gap-3'>
                  <RadioButton
                    showCheck={stopFilters.includes('oneStop')}
                    onChange={() => toggleStopFilter('oneStop')}
                    label='1 stop'
                  />
                  <div className='text-gray_text font-medium text-sm'>{formatPrice(lowestByStop.oneStop)}</div>
                </div>
                <div className='flex justify-between items-center gap-3'>
                  <RadioButton
                    showCheck={stopFilters.includes('twoPlusStops')}
                    onChange={() => toggleStopFilter('twoPlusStops')}
                    label='2+ stops'
                  />
                  <div className='text-gray_text font-medium text-sm'>{formatPrice(lowestByStop.twoPlusStops)}</div>
                </div>
              </div>

              <Separator className='bg-gray_border mt-2' />

              <Button
                variant='transparent'
                className='text-gray_text self-start px-0 font-bold text-sm hover:dark:text-white hover:text-foreground'
                onClick={resetFilters}
              >
                <IoCloseCircle className='mr-1' size={20} />
                Reset filters
              </Button>
            </aside>
          )}

          <FlightDeals listings={filteredListings} hasActiveFilters={filteredListings.length !== listings.length} />
        </div>
      </Layout>
    </div>
  );
};

export default FlightsCategory;
