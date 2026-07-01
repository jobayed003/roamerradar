import { auth } from '@/auth';
import { redirect } from 'next/navigation';

const AccountPage = async () => {
  const session = await auth();

  if (!session?.user?.id) {
    redirect('/auth/login');
  }

  redirect(`/account-settings/${session.user.id}`);
};

export default AccountPage;
