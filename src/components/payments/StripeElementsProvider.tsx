'use client';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe, StripeElementsOptions } from '@stripe/stripe-js';
import { ReactNode } from 'react';

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!, {
  // Hide the Stripe sandbox assistant badge in production while still using test keys.
  ...(process.env.NODE_ENV === 'production'
    ? {
        developerTools: {
          assistant: {
            enabled: false,
          },
        },
      }
    : {}),
});

type StripeElementsProviderProps = {
  clientSecret: string;
  children: ReactNode;
};

export function StripeElementsProvider({ clientSecret, children }: StripeElementsProviderProps) {
  const options: StripeElementsOptions = {
    clientSecret,
    appearance: {
      theme: 'night',
      variables: {
        colorPrimary: '#3B71FE',
        borderRadius: '12px',
      },
    },
  };

  return (
    <Elements stripe={stripePromise} options={options}>
      {children}
    </Elements>
  );
}
