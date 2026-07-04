'use client';

import { savePaymentMethod } from '@/actions/paymentMethods';
import { Button } from '@/components/ui/button';
import { toast } from '@/components/ui/use-toast';
import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type AddPaymentMethodFormProps = {
  onSuccess?: () => void;
  onCancel?: () => void;
};

export function AddPaymentMethodForm({ onSuccess, onCancel }: AddPaymentMethodFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!stripe || !elements) return;

    setIsSubmitting(true);

    const { error } = await stripe.confirmSetup({
      elements,
      redirect: 'if_required',
    });

    if (error) {
      toast({ title: error.message ?? 'Unable to save card.', variant: 'destructive' });
      setIsSubmitting(false);
      return;
    }

    startTransition(() => {
      savePaymentMethod().then((result) => {
        setIsSubmitting(false);

        if (result.error) {
          toast({ title: result.error, variant: 'destructive' });
          return;
        }

        toast({ title: result.success });
        router.refresh();
        onSuccess?.();
      });
    });
  };

  return (
    <div className='space-y-6 mt-6'>
      <PaymentElement />
      <div className='flex gap-3'>
        <Button
          type='button'
          disabled={!stripe || isSubmitting || isPending}
          onClick={handleSubmit}
          className='bg-blue hover:bg-blue-hover text-white font-bold'
        >
          {isSubmitting || isPending ? 'Saving...' : 'Save card'}
        </Button>
        {onCancel && (
          <Button type='button' variant='outline' onClick={onCancel} className='font-bold'>
            Cancel
          </Button>
        )}
      </div>
    </div>
  );
}
