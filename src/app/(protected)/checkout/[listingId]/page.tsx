import { getFlightOfferById } from '@/data/flights';
import { getListingById } from '@/data/listing';
import { parseBookingDate } from '@/lib/booking-pricing';
import { startCheckout } from '@/lib/checkout';
import { isStripeConfigured } from '@/lib/stripe';
import { requireAuth } from '@/server/auth/require-auth';
import { notFound, redirect } from 'next/navigation';
import CheckoutClient from './_components/CheckoutClient';

type CheckoutPageProps = {
  params: { listingId: string };
  searchParams: {
    checkIn?: string;
    checkOut?: string;
    guests?: string;
  };
};

const CheckoutPage = async ({ params, searchParams }: CheckoutPageProps) => {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    redirect('/auth/login');
  }

  const listing =
    (await getFlightOfferById(params.listingId)) ?? (await getListingById(params.listingId));

  if (!listing) {
    notFound();
  }

  if (!isStripeConfigured()) {
    return (
      <div className='max-w-xl mx-auto py-32 px-6 text-center'>
        <h1 className='text-2xl font-bold'>Checkout unavailable</h1>
        <p className='text-gray_text mt-2'>
          Payments are not configured yet. Add your Stripe keys to continue.
        </p>
      </div>
    );
  }

  const guests = Math.max(1, Number.parseInt(searchParams.guests ?? '1', 10) || 1);
  const checkIn = parseBookingDate(searchParams.checkIn);
  const checkOut = parseBookingDate(searchParams.checkOut);

  try {
    const checkout = await startCheckout(authResult.user.id, params.listingId, {
      guests,
      checkIn: checkIn?.toISOString().slice(0, 10),
      checkOut: checkOut?.toISOString().slice(0, 10),
    });

    if ('error' in checkout) {
      return (
        <div className='max-w-xl mx-auto py-32 px-6 text-center'>
          <h1 className='text-2xl font-bold'>Checkout unavailable</h1>
          <p className='text-gray_text mt-2'>{checkout.error}</p>
        </div>
      );
    }

    return (
      <CheckoutClient
        clientSecret={checkout.clientSecret}
        bookingId={checkout.bookingId}
        amount={checkout.amount}
        listingTitle={checkout.listingTitle}
        listingImage={checkout.listingImage}
        guests={checkout.guests}
        checkIn={checkout.checkIn}
        checkOut={checkout.checkOut}
        nights={checkout.nights}
      />
    );
  } catch {
    return (
      <div className='max-w-xl mx-auto py-32 px-6 text-center'>
        <h1 className='text-2xl font-bold'>Checkout unavailable</h1>
        <p className='text-gray_text mt-2'>Unable to start payment. Check your Stripe configuration.</p>
      </div>
    );
  }
};

export default CheckoutPage;
