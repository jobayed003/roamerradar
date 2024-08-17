import { getUserById } from '@/data/user';
import AccountDetailsForm from '../_components/AccountDetailsForm';

const AccountDetailsPage = async ({ params }: { params: { userId: string } }) => {
  const { userId } = params;

  const user = await getUserById(userId);

  if (!user) return;

  return <AccountDetailsForm user={user} />;
};

export default AccountDetailsPage;
