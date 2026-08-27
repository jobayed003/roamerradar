'use client';

import BreadcrumbProvider from '@/components/BreadcrumbProvider';
import LinkButton from '@/components/LinkButton';
import Layout from '@/components/ui/Layout';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { WishlistButton } from '@/components/WishlistButton';
import { ListingItem } from '@/types/listing';
import { buildCheckoutUrl } from '@/lib/booking-pricing';
import { FLIGHT_EXTRA_OPTIONS, type FlightExtraId } from '@/lib/flight-extras';
import { useBookingDate, useTravelers } from '@/stores/useData';
import { Check, ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState } from 'react';

const FlightProduct = ({
  listing,
  wishlisted = false,
}: {
  listing: ListingItem;
  wishlisted?: boolean;
}) => {
  const legs = listing.metadata?.legs ?? [];
  const provider = listing.metadata?.provider ?? 'eDreams';
  const offerExpired = Boolean(listing.metadata?.offerExpired);
  const { date } = useBookingDate();
  const guests = useTravelers((state) => Math.max(1, state.adults + state.children + state.toddlers));
  const [extras, setExtras] = useState<FlightExtraId[]>([]);

  const extrasTotal = useMemo(
    () =>
      FLIGHT_EXTRA_OPTIONS.filter((option) => extras.includes(option.id)).reduce(
        (sum, option) => sum + option.price,
        0
      ),
    [extras]
  );

  const checkoutHref = useMemo(
    () =>
      buildCheckoutUrl({
        itemId: listing.id,
        checkIn: date?.from,
        checkOut: date?.to,
        guests,
        extras,
      }),
    [listing.id, date?.from, date?.to, guests, extras]
  );

  const toggleExtra = (id: FlightExtraId) => {
    setExtras((current) =>
      current.includes(id) ? current.filter((item) => item !== id) : [...current, id]
    );
  };

  return (
    <>
      <Separator className='dark:bg-dark_russian mb-4 bg-[#E6E8EC]' />

      <Layout className='lg:px-20 px-4 sm:px-8 pb-20'>
        <div className='flex justify-between pb-8 gap-4 flex-wrap'>
          <LinkButton href='/flights-category' label='Back to flights'>
            <ChevronLeft className='h-5 w-5 mr-2' />
          </LinkButton>
          <div className='flex items-center gap-3'>
            <WishlistButton listingId={listing.id} initialSaved={wishlisted} />
            <BreadcrumbProvider backRoute='flights-category' originRoute='flights' />
          </div>
        </div>

        <div className='flex flex-col lg:flex-row gap-10'>
          <div className='flex-1 min-w-0'>
            <h1 className='text-3xl sm:text-4xl font-bold mb-2'>{listing.title}</h1>
            <div className='flex items-center gap-2 text-gray_text text-sm mb-8'>
              <Check className='w-4 h-4' />
              <span>Book with {provider}</span>
            </div>

            <div className='flex flex-col gap-8'>
              {legs.map((leg, index) => (
                <div
                  key={`${listing.id}-${index}`}
                  className='rounded-3xl border dark:border-gray_border p-6 sm:p-8'
                >
                  <p className='text-xs uppercase tracking-wide text-gray_text font-semibold mb-4'>
                    {index === 0 ? 'Outbound' : 'Return'}
                  </p>
                  <div className='flex flex-col sm:flex-row sm:items-center gap-6'>
                    <div className='dark:bg-dark_russian bg-[#F4F5F6] p-4 rounded-xl h-20 w-full sm:w-40 flex items-center justify-center shrink-0'>
                      <Image
                        src={leg.logo}
                        width={120}
                        height={48}
                        alt='Airline'
                        className='max-h-12 w-auto object-contain'
                        unoptimized={leg.logo.startsWith('http')}
                      />
                    </div>
                    <div className='flex justify-between items-center flex-1 min-w-0 gap-4'>
                      <div className='text-center min-w-0'>
                        <p className='text-2xl font-bold'>{leg.departingLocation}</p>
                        <p className='text-sm text-gray_text'>{leg.takeOffTime}</p>
                      </div>
                      <div className='text-center text-xs text-gray_text px-2 shrink-0'>
                        <Separator className='mb-2 w-12 mx-auto dark:bg-gray_border' />
                        <p className='capitalize'>{leg.type}</p>
                      </div>
                      <div className='text-center min-w-0'>
                        <p className='text-2xl font-bold'>{leg.arrivalLocation}</p>
                        <p className='text-sm text-gray_text'>{leg.landingTime}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {!offerExpired && (
              <div className='mt-10 rounded-3xl border dark:border-gray_border p-6 space-y-4'>
                <h2 className='text-xl font-bold'>Optional extras</h2>
                <p className='text-sm text-gray_text'>
                  Demo add-ons priced in RoamerRadar (not airline ancillaries API).
                </p>
                {FLIGHT_EXTRA_OPTIONS.map((option) => {
                  const selected = extras.includes(option.id);
                  return (
                    <button
                      type='button'
                      key={option.id}
                      onClick={() => toggleExtra(option.id)}
                      className={`w-full text-left rounded-2xl border p-4 transition ${
                        selected
                          ? 'border-blue bg-blue/5'
                          : 'dark:border-gray_border hover:border-blue/50'
                      }`}
                    >
                      <div className='flex items-center justify-between gap-3'>
                        <div>
                          <p className='font-semibold'>{option.label}</p>
                          <p className='text-sm text-gray_text'>{option.description}</p>
                        </div>
                        <p className='font-bold shrink-0'>+${option.price}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <aside className='lg:w-80 w-full shrink-0'>
            <div className='sticky top-24 rounded-3xl border dark:border-gray_border p-6 sm:p-8'>
              <p className='text-gray_text text-sm'>Total price</p>
              <p className='text-4xl font-bold mt-1'>
                ${(listing.price + extrasTotal).toLocaleString()}
              </p>
              <p className='text-xs text-gray_text mt-2'>
                Fare ${listing.price.toLocaleString()}
                {extrasTotal > 0 ? ` + extras $${extrasTotal}` : ''} · per traveler
              </p>

              {offerExpired ? (
                <>
                  <p className='text-sm text-amber-600 dark:text-amber-400 mt-4'>
                    This fare has expired. Search again for current prices.
                  </p>
                  <Button asChild className='w-full mt-4 bg-blue hover:bg-blue-hover text-white rounded-full h-12 font-bold'>
                    <Link href='/flights-category'>Search flights</Link>
                  </Button>
                </>
              ) : (
                <>
                  <Button asChild className='w-full mt-6 bg-blue hover:bg-blue-hover text-white rounded-full h-12 font-bold'>
                    <Link href={checkoutHref}>Book flight</Link>
                  </Button>
                  <p className='text-xs text-gray_text text-center mt-4'>
                    Free cancellation within 24 hours on eligible fares.
                  </p>
                </>
              )}
            </div>
          </aside>
        </div>
      </Layout>
    </>
  );
};

export default FlightProduct;
