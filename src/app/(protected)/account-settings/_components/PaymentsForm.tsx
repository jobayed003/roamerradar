'use client';

import { createSetupIntent, deletePaymentMethod, setDefaultPaymentMethod } from '@/actions/paymentMethods';
import { AddPaymentMethodForm } from '@/components/payments/AddPaymentMethodForm';
import { StripeElementsProvider } from '@/components/payments/StripeElementsProvider';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { PaymentMethod } from '@prisma/client';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type PaymentsFormProps = {
  paymentMethods: PaymentMethod[];
};

const brandLabel = (brand: string) => brand.charAt(0).toUpperCase() + brand.slice(1);

const PaymentsForm = ({ paymentMethods }: PaymentsFormProps) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [showAddForm, setShowAddForm] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [isLoadingSetup, setIsLoadingSetup] = useState(false);

  const handleAddPaymentMethod = async () => {
    setIsLoadingSetup(true);
    const result = await createSetupIntent();
    setIsLoadingSetup(false);

    if (result.error || !result.clientSecret) {
      toast({
        title: result.error ?? 'Stripe is not configured. Add STRIPE_SECRET_KEY and NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY.',
        variant: 'destructive',
      });
      return;
    }

    setClientSecret(result.clientSecret);
    setShowAddForm(true);
  };

  const handleDelete = (paymentMethodId: string) => {
    startTransition(() => {
      deletePaymentMethod(paymentMethodId).then((result) => {
        if (result.error) {
          toast({ title: result.error, variant: 'destructive' });
          return;
        }
        toast({ title: result.success });
        router.refresh();
      });
    });
  };

  const handleSetDefault = (paymentMethodId: string) => {
    startTransition(() => {
      setDefaultPaymentMethod(paymentMethodId).then((result) => {
        if (result.error) {
          toast({ title: result.error, variant: 'destructive' });
          return;
        }
        toast({ title: result.success });
        router.refresh();
      });
    });
  };

  return (
    <div className='grow pl-28 mb-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-5xl font-bold'>Payment Methods</h1>
      </div>

      <div className='mt-20 text-2xl font-poppins font-semibold'>Saved cards</div>

      {paymentMethods.length === 0 && !showAddForm ? (
        <p className='text-gray_text mt-6'>No payment methods saved yet.</p>
      ) : (
        <div className='mt-6 space-y-4'>
          {paymentMethods.map((method) => (
            <div key={method.id} className='flex items-center justify-between gap-4 py-4'>
              <div className='font-poppins'>
                <p className='font-semibold leading-9'>
                  {brandLabel(method.brand)} •••• {method.last4}
                  {method.isDefault && (
                    <span className='ml-2 text-xs uppercase text-[#58C27D] border border-[#58C27D] px-2 py-0.5 rounded'>
                      Default
                    </span>
                  )}
                </p>
                <p className='text-gray_text text-xs'>
                  Expiration: {String(method.expMonth).padStart(2, '0')}/{method.expYear}
                </p>
              </div>
              <div className='flex gap-2'>
                {!method.isDefault && (
                  <Button
                    variant='outline'
                    className='font-bold'
                    disabled={isPending}
                    onClick={() => handleSetDefault(method.id)}
                  >
                    Set default
                  </Button>
                )}
                <Button
                  variant='outline'
                  className='font-bold'
                  disabled={isPending}
                  onClick={() => handleDelete(method.id)}
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Separator className='my-8 bg-gray_border' />

      <div className='flex items-center justify-between'>
        <div className='font-poppins font-semibold'>
          {showAddForm ? 'Add new credit card' : 'Add a payment method'}
        </div>
        <div className='flex gap-x-4'>
          <Image src={'/visa.png'} className='brightness-150' alt='Visa' width={40} height={40} />
          <Image src={'/master.png'} alt='Mastercard' width={40} height={40} />
        </div>
      </div>

      {!showAddForm ? (
        <Button
          variant={'fill'}
          className='font-bold p-6 mt-6 bg-blue hover:bg-blue-hover text-white'
          onClick={handleAddPaymentMethod}
          disabled={isLoadingSetup}
        >
          {isLoadingSetup ? 'Loading...' : 'Add Payment Method'}
        </Button>
      ) : (
        clientSecret && (
          <StripeElementsProvider clientSecret={clientSecret}>
            <AddPaymentMethodForm
              onSuccess={() => {
                setShowAddForm(false);
                setClientSecret(null);
              }}
              onCancel={() => {
                setShowAddForm(false);
                setClientSecret(null);
              }}
            />
          </StripeElementsProvider>
        )
      )}

      <p className='text-gray_text text-sm mt-8 max-w-lg'>
        Cards are stored securely by Stripe. RoamerRadar never sees or stores your full card number.
      </p>
    </div>
  );
};

export default PaymentsForm;
