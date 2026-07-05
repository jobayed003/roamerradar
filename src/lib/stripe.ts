import { env, isStripeConfigured } from '@/env';
import Stripe from 'stripe';

let stripeClient: Stripe | null = null;

export function getStripe() {
  if (!env.STRIPE_SECRET_KEY) {
    throw new Error('STRIPE_SECRET_KEY is not configured.');
  }

  if (!stripeClient) {
    stripeClient = new Stripe(env.STRIPE_SECRET_KEY, {
      typescript: true,
    });
  }

  return stripeClient;
}

export { isStripeConfigured };
