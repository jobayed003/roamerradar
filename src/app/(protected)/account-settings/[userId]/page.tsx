import { getAccountsByUserId } from '@/data/account';
import { getNotificationPreferences } from '@/data/notification-preference';
import { getPaymentMethodsByUserId } from '@/data/payment-method';
import { getUserById } from '@/data/user';
import { requireOwner } from '@/server/auth/require-auth';
import { notFound, redirect } from 'next/navigation';
import AccountDetailsForm from '../_components/AccountDetailsForm';

const AccountDetailsPage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;
  const authResult = await requireOwner(userId);

  if (!authResult.ok) {
    if (authResult.error === 'Unauthorized') {
      redirect('/auth/login');
    }
    notFound();
  }

  const user = await getUserById(userId);

  if (!user) {
    notFound();
  }

  const [accounts, paymentMethods, notificationPreferences] = await Promise.all([
    getAccountsByUserId(userId),
    getPaymentMethodsByUserId(userId),
    getNotificationPreferences(userId),
  ]);

  const connectedProviders = accounts.map((account) => account.provider);

  return (
    <AccountDetailsForm
      user={user}
      connectedProviders={connectedProviders}
      paymentMethods={paymentMethods}
      notificationPreferences={{
        messageEmail: notificationPreferences.messageEmail,
        messageText: notificationPreferences.messageText,
        messageBrowser: notificationPreferences.messageBrowser,
        remindersEmail: notificationPreferences.remindersEmail,
        remindersText: notificationPreferences.remindersText,
        remindersBrowser: notificationPreferences.remindersBrowser,
      }}
    />
  );
};

export default AccountDetailsPage;
