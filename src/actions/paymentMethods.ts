'use server';

import { getPaymentMethodsByUserId } from '@/data/payment-method';
import { getOrCreateStripeCustomer, syncStripePaymentMethods } from '@/lib/stripe-customer';
import { getStripe } from '@/lib/stripe';
import { requireAuth } from '@/server/auth/require-auth';
import { db } from '@/lib/db';

export async function createSetupIntent() {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  try {
    const customerId = await getOrCreateStripeCustomer(authResult.user.id);
    const setupIntent = await getStripe().setupIntents.create({
      customer: customerId,
      payment_method_types: ['card'],
      usage: 'off_session',
    });

    return { clientSecret: setupIntent.client_secret };
  } catch {
    return { error: 'Unable to start card setup. Check your Stripe configuration.' };
  }
}

export async function savePaymentMethod() {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  try {
    const paymentMethods = await syncStripePaymentMethods(authResult.user.id);
    return { success: 'Payment method saved.', paymentMethods };
  } catch {
    return { error: 'Unable to save payment method.' };
  }
}

export async function getSavedPaymentMethods() {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error, paymentMethods: [] };
  }

  const paymentMethods = await getPaymentMethodsByUserId(authResult.user.id);
  return { paymentMethods };
}

export async function deletePaymentMethod(paymentMethodId: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  try {
    const paymentMethod = await db.paymentMethod.findFirst({
      where: { id: paymentMethodId, userId: authResult.user.id },
    });

    if (!paymentMethod) {
      return { error: 'Payment method not found.' };
    }

    await getStripe().paymentMethods.detach(paymentMethod.stripePaymentMethodId);
    await syncStripePaymentMethods(authResult.user.id);

    return { success: 'Payment method removed.' };
  } catch {
    return { error: 'Unable to remove payment method.' };
  }
}

export async function setDefaultPaymentMethod(paymentMethodId: string) {
  const authResult = await requireAuth();

  if (!authResult.ok) {
    return { error: authResult.error };
  }

  try {
    const paymentMethod = await db.paymentMethod.findFirst({
      where: { id: paymentMethodId, userId: authResult.user.id },
    });

    if (!paymentMethod) {
      return { error: 'Payment method not found.' };
    }

    const user = await db.user.findUnique({ where: { id: authResult.user.id } });

    if (!user?.stripeCustomerId) {
      return { error: 'No Stripe customer found.' };
    }

    await getStripe().customers.update(user.stripeCustomerId, {
      invoice_settings: { default_payment_method: paymentMethod.stripePaymentMethodId },
    });

    const paymentMethods = await syncStripePaymentMethods(authResult.user.id);
    return { success: 'Default payment method updated.', paymentMethods };
  } catch {
    return { error: 'Unable to update default payment method.' };
  }
}
