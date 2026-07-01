'use client';

import { CheckoutPaymentForm } from '@/components/payments/CheckoutPaymentForm';
import { StripeElementsProvider } from '@/components/payments/StripeElementsProvider';
import Layout from '@/components/ui/Layout';
import { ChevronLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type CheckoutClientProps = {
  clientSecret: string;
  bookingId: string;
  amount: number;
  listingTitle: string;
  listingImage: string;
};

export default function CheckoutClient({
  clientSecret,
  bookingId,
  amount,
  listingTitle,
  listingImage,
}: CheckoutClientProps) {
  return (
    <Layout className='lg:px-20 px-8 py-20'>
      <Link href='/' className='inline-flex items-center text-gray_text hover:text-foreground mb-10'>
        <ChevronLeft className='h-5 w-5 mr-2' />
        Back
      </Link>

      <div className='grid lg:grid-cols-2 gap-12 max-w-5xl mx-auto'>
        <div>
          <div className='relative h-64 w-full rounded-3xl overflow-hidden mb-6'>
            <Image src={listingImage} alt={listingTitle} fill className='object-cover' />
          </div>
          <h1 className='text-3xl font-bold'>Complete your booking</h1>
          <p className='text-gray_text mt-2'>{listingTitle}</p>
        </div>

        <div className='dark:bg-dark_russian border dark:border-gray_border rounded-3xl p-8'>
          <StripeElementsProvider clientSecret={clientSecret}>
            <CheckoutPaymentForm bookingId={bookingId} amount={amount} listingTitle={listingTitle} />
          </StripeElementsProvider>
        </div>
      </div>
    </Layout>
  );
}
