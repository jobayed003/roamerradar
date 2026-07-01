import { getAccountsByUserId } from '@/data/account';
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

  const accounts = await getAccountsByUserId(userId);
  const connectedProviders = accounts.map((account) => account.provider);

  return <AccountDetailsForm user={user} connectedProviders={connectedProviders} />;
};

export default AccountDetailsPage;
