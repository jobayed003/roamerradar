import { getUserById } from '@/data/user';
import { db } from '@/lib/db';
import { getStripe } from '@/lib/stripe';

export async function getOrCreateStripeCustomer(userId: string) {
  const user = await getUserById(userId);

  if (!user?.email) {
    throw new Error('User email is required for payments.');
  }

  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  const customer = await getStripe().customers.create({
    email: user.email,
    name: user.displayName ?? user.realName ?? undefined,
    metadata: { userId },
  });

  await db.user.update({
    where: { id: userId },
    data: { stripeCustomerId: customer.id },
  });

  return customer.id;
}

export async function syncStripePaymentMethods(userId: string) {
  const user = await getUserById(userId);

  if (!user?.stripeCustomerId) {
    return [];
  }

  const stripeMethods = await getStripe().paymentMethods.list({
    customer: user.stripeCustomerId,
    type: 'card',
  });

  const customer = await getStripe().customers.retrieve(user.stripeCustomerId);

  const defaultPaymentMethodId =
    typeof customer !== 'string' && !customer.deleted
      ? (customer.invoice_settings?.default_payment_method as string | null)
      : null;

  await db.paymentMethod.deleteMany({ where: { userId } });

  if (stripeMethods.data.length === 0) {
    return [];
  }

  await db.paymentMethod.createMany({
    data: stripeMethods.data.map((method) => ({
      userId,
      stripePaymentMethodId: method.id,
      brand: method.card?.brand ?? 'card',
      last4: method.card?.last4 ?? '0000',
      expMonth: method.card?.exp_month ?? 1,
      expYear: method.card?.exp_year ?? 2030,
      isDefault: method.id === defaultPaymentMethodId,
    })),
  });

  if (!defaultPaymentMethodId && stripeMethods.data[0]) {
    await db.paymentMethod.updateMany({
      where: { userId },
      data: { isDefault: false },
    });
    await db.paymentMethod.update({
      where: { stripePaymentMethodId: stripeMethods.data[0].id },
      data: { isDefault: true },
    });
    await getStripe().customers.update(user.stripeCustomerId, {
      invoice_settings: { default_payment_method: stripeMethods.data[0].id },
    });
  }

  return db.paymentMethod.findMany({
    where: { userId },
    orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }],
  });
}
