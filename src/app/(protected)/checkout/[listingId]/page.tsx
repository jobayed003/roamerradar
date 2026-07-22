import { getFlightOfferById } from '@/data/flights';
import { getListingById } from '@/data/listing';
import { parseBookingDate } from '@/lib/booking-pricing';
import { startCheckout } from '@/lib/checkout';
import { isStripeConfigured } from '@/lib/stripe';
import { requireAuth } from '@/server/auth/require-auth';
import Link from 'next/link';
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

function CheckoutMessage({
  title,
  description,
  actionHref,
  actionLabel,
}: {
  title: string;
  description: string;
  actionHref?: string;
  actionLabel?: string;
}) {
  return (
    <div className='max-w-xl mx-auto py-24 sm:py-32 px-6 text-center'>
      <h1 className='text-2xl font-bold'>{title}</h1>
      <p className='text-gray_text mt-3 text-sm sm:text-base leading-relaxed'>{description}</p>
      {actionHref && actionLabel ? (
        <Link
          href={actionHref}
          className='inline-flex mt-6 items-center justify-center rounded-full bg-blue hover:bg-blue-hover text-white font-bold px-6 py-3 w-full sm:w-auto'
        >
          {actionLabel}
        </Link>
      ) : null}
    </div>
  );
}

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
      <CheckoutMessage
        title='Checkout unavailable'
        description='Payments are not configured yet. Add your Stripe keys to continue.'
        actionHref='/support'
        actionLabel='Contact support'
      />
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
      const isExpiredFare = checkout.error.toLowerCase().includes('expired');
      return (
        <CheckoutMessage
          title='Checkout unavailable'
          description={checkout.error}
          actionHref={isExpiredFare ? '/flights-category' : '/support'}
          actionLabel={isExpiredFare ? 'Search flights again' : 'Get help'}
        />
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
      <CheckoutMessage
        title='Checkout unavailable'
        description='Unable to start payment right now. Check your connection and try again, or contact support if it keeps happening.'
        actionHref='/support'
        actionLabel='Contact support'
      />
    );
  }
};

export default CheckoutPage;
