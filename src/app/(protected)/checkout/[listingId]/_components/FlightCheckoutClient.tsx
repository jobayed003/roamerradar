'use client';

import { createCheckoutPayment } from '@/actions/checkout';
import { CheckoutPaymentForm } from '@/components/payments/CheckoutPaymentForm';
import { StripeElementsProvider } from '@/components/payments/StripeElementsProvider';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Layout from '@/components/ui/Layout';
import { useToast } from '@/components/ui/use-toast';
import type { FlightPassengerInput } from '@/lib/duffel';
import { formatStayDate } from '@/lib/booking-pricing';
import { CalendarDays, ChevronLeft, Users } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { FormEvent, useMemo, useState, useTransition } from 'react';

type PassengerSlot = {
  id: string;
  label: string;
};

type FlightCheckoutClientProps = {
  itemId: string;
  listingTitle: string;
  listingImage: string;
  amountPreview: number;
  guests: number;
  checkIn: string | null;
  checkOut: string | null;
  passengerSlots: PassengerSlot[];
  defaultEmail?: string;
  defaultGivenName?: string;
  defaultFamilyName?: string;
  testMode: boolean;
};

type CheckoutState = {
  clientSecret: string;
  bookingId: string;
  amount: number;
};

const TITLES: FlightPassengerInput['title'][] = ['mr', 'mrs', 'ms', 'miss', 'dr'];

function emptyPassenger(id: string, defaults: {
  email?: string;
  givenName?: string;
  familyName?: string;
}): Omit<FlightPassengerInput, 'id'> & { id: string } {
  return {
    id,
    title: 'mr',
    givenName: defaults.givenName ?? '',
    familyName: defaults.familyName ?? '',
    email: defaults.email ?? '',
    phoneNumber: '',
    bornOn: '1990-01-01',
    gender: 'm',
  };
}

export default function FlightCheckoutClient({
  itemId,
  listingTitle,
  listingImage,
  amountPreview,
  guests,
  checkIn,
  checkOut,
  passengerSlots,
  defaultEmail,
  defaultGivenName,
  defaultFamilyName,
  testMode,
}: FlightCheckoutClientProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();
  const [checkout, setCheckout] = useState<CheckoutState | null>(null);
  const [passengers, setPassengers] = useState(() =>
    passengerSlots.map((slot, index) =>
      emptyPassenger(slot.id, {
        email: index === 0 ? defaultEmail : undefined,
        givenName: index === 0 ? defaultGivenName : undefined,
        familyName: index === 0 ? defaultFamilyName : undefined,
      })
    )
  );

  const canPay = useMemo(() => passengers.every((passenger) => {
    return (
      passenger.givenName.trim() &&
      passenger.familyName.trim() &&
      passenger.email.trim() &&
      passenger.phoneNumber.trim() &&
      passenger.bornOn
    );
  }), [passengers]);

  const updatePassenger = (index: number, patch: Partial<FlightPassengerInput>) => {
    setPassengers((current) =>
      current.map((passenger, passengerIndex) =>
        passengerIndex === index ? { ...passenger, ...patch } : passenger
      )
    );
  };

  const onContinue = (event: FormEvent) => {
    event.preventDefault();
    if (!canPay) return;

    startTransition(async () => {
      const result = await createCheckoutPayment(itemId, {
        guests,
        checkIn: checkIn?.slice(0, 10),
        checkOut: checkOut?.slice(0, 10),
        passengers,
      });

      if ('error' in result && result.error) {
        toast({ title: result.error, variant: 'destructive' });
        return;
      }

      if ('clientSecret' in result && result.clientSecret && result.bookingId) {
        setCheckout({
          clientSecret: result.clientSecret,
          bookingId: result.bookingId,
          amount: result.amount,
        });
      }
    });
  };

  return (
    <Layout className='lg:px-20 px-8 py-20'>
      <Link href='/flights-category' className='inline-flex items-center text-gray_text hover:text-foreground mb-10'>
        <ChevronLeft className='h-5 w-5 mr-2' />
        Back to flights
      </Link>

      <div className='grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto'>
        <div>
          <div className='relative h-64 w-full rounded-3xl overflow-hidden mb-6 bg-[#F4F5F6] dark:bg-dark_russian'>
            <Image
              src={listingImage}
              alt={listingTitle}
              fill
              className='object-contain p-8'
              unoptimized={listingImage.startsWith('http')}
            />
          </div>
          <h1 className='text-3xl font-bold'>Complete your booking</h1>
          <p className='text-gray_text mt-2'>{listingTitle}</p>

          <div className='mt-6 space-y-3 text-sm'>
            {checkIn && (
              <p className='flex items-center gap-2 text-gray_text'>
                <CalendarDays className='h-4 w-4' />
                <span>
                  {formatStayDate(new Date(checkIn))}
                  {checkOut ? ` → ${formatStayDate(new Date(checkOut))}` : ''}
                </span>
              </p>
            )}
            <p className='flex items-center gap-2 text-gray_text'>
              <Users className='h-4 w-4' />
              {guests} passenger{guests === 1 ? '' : 's'}
            </p>
            <p className='text-2xl font-bold pt-2'>
              USD {amountPreview.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </p>
          </div>

          <div className='mt-6 rounded-2xl border dark:border-gray_border p-4 text-sm text-gray_text'>
            {testMode
              ? 'Duffel test mode: after payment we create a sandbox hold only — not a real airline ticket.'
              : 'Live Duffel tokens cannot create airline orders. Payment still works, but no airline ticket will be issued.'}
          </div>
        </div>

        <div className='dark:bg-dark_russian border dark:border-gray_border rounded-3xl p-8'>
          {!checkout ? (
            <form onSubmit={onContinue} className='space-y-8'>
              <div>
                <h2 className='text-xl font-bold'>Passenger details</h2>
                <p className='text-sm text-gray_text mt-1'>
                  Required for the Duffel sandbox test booking.
                </p>
              </div>

              {passengers.map((passenger, index) => (
                <div key={passenger.id} className='space-y-3'>
                  <h3 className='font-semibold'>
                    {passengerSlots[index]?.label ?? `Passenger ${index + 1}`}
                  </h3>
                  <div className='grid grid-cols-2 gap-3'>
                    <label className='text-sm space-y-1'>
                      <span className='text-gray_text'>Title</span>
                      <select
                        className='w-full h-10 rounded-md border border-input bg-background px-3 text-sm'
                        value={passenger.title}
                        onChange={(event) =>
                          updatePassenger(index, {
                            title: event.target.value as FlightPassengerInput['title'],
                          })
                        }
                      >
                        {TITLES.map((title) => (
                          <option key={title} value={title}>
                            {title.toUpperCase()}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className='text-sm space-y-1'>
                      <span className='text-gray_text'>Gender</span>
                      <select
                        className='w-full h-10 rounded-md border border-input bg-background px-3 text-sm'
                        value={passenger.gender}
                        onChange={(event) =>
                          updatePassenger(index, {
                            gender: event.target.value as FlightPassengerInput['gender'],
                          })
                        }
                      >
                        <option value='m'>Male</option>
                        <option value='f'>Female</option>
                      </select>
                    </label>
                  </div>
                  <div className='grid grid-cols-2 gap-3'>
                    <Input
                      placeholder='First name'
                      value={passenger.givenName}
                      onChange={(event) => updatePassenger(index, { givenName: event.target.value })}
                      required
                    />
                    <Input
                      placeholder='Last name'
                      value={passenger.familyName}
                      onChange={(event) => updatePassenger(index, { familyName: event.target.value })}
                      required
                    />
                  </div>
                  <Input
                    type='email'
                    placeholder='Email'
                    value={passenger.email}
                    onChange={(event) => updatePassenger(index, { email: event.target.value })}
                    required
                  />
                  <Input
                    type='tel'
                    placeholder='Phone (+1…)'
                    value={passenger.phoneNumber}
                    onChange={(event) => updatePassenger(index, { phoneNumber: event.target.value })}
                    required
                  />
                  <label className='text-sm space-y-1 block'>
                    <span className='text-gray_text'>Date of birth</span>
                    <Input
                      type='date'
                      value={passenger.bornOn}
                      onChange={(event) => updatePassenger(index, { bornOn: event.target.value })}
                      required
                    />
                  </label>
                </div>
              ))}

              <Button
                type='submit'
                className='w-full rounded-full bg-blue hover:bg-blue-hover text-white font-bold'
                disabled={!canPay || isPending}
              >
                {isPending ? 'Preparing payment…' : 'Continue to payment'}
              </Button>
            </form>
          ) : (
            <StripeElementsProvider clientSecret={checkout.clientSecret}>
              <CheckoutPaymentForm
                bookingId={checkout.bookingId}
                amount={checkout.amount}
                listingTitle={listingTitle}
              />
            </StripeElementsProvider>
          )}
        </div>
      </div>
    </Layout>
  );
}
