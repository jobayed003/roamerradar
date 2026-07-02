import { getAccountsByUserId } from '@/data/account';
import { getNotificationPreferences } from '@/data/notification-preference';
import { getPaymentMethodsByUserId } from '@/data/payment-method';
import { getUserById } from '@/data/user';
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import AccountDetailsForm from './_components/AccountDetailsForm';
import SessionExpired from './_components/SessionExpired';

const AccountPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/login?callbackUrl=/account-settings');
  }

  const userId = session.user.id;
  const user = await getUserById(userId);

  if (!user) {
    return <SessionExpired />;
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

export default AccountPage;
