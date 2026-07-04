'use client';

import { completeCheckout } from '@/actions/checkout';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type CheckoutPaymentFormProps = {
  bookingId: string;
  amount: number;
  listingTitle: string;
};

export function CheckoutPaymentForm({ bookingId, amount, listingTitle }: CheckoutPaymentFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setIsSubmitting(true);

    const { error } = await stripe.confirmPayment({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      toast({ title: error.message ?? 'Payment failed.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    startTransition(() => {
      completeCheckout(bookingId).then((result) => {
        setIsSubmitting(false);

        if ('error' in result && result.error) {
          toast({ title: result.error, variant: 'destructive' });
          return;
        }

        toast({ title: 'success' in result ? result.success : 'Payment complete.' });
        router.push('/my-bookings');
        router.refresh();
      });
    });
  };

  return (
    <div className='space-y-6'>
      <div>
        <h2 className='text-2xl font-bold'>{listingTitle}</h2>
        <p className='text-gray_text mt-1'>Total due: ${amount.toFixed(2)}</p>
      </div>
      <PaymentElement />
      <Button
        type='button'
        disabled={!stripe || isSubmitting || isPending}
        onClick={handleSubmit}
        className='w-full bg-blue hover:bg-blue-hover text-white font-bold h-12 rounded-full'
      >
        {isSubmitting || isPending ? 'Processing...' : `Pay $${amount.toFixed(2)}`}
      </Button>
    </div>
  );
}
