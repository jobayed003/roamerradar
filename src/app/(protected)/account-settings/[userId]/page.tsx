import { redirect } from 'next/navigation';

const AccountDetailsPage = async () => {
  redirect('/account-settings');
};

export default AccountDetailsPage;
