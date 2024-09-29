'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const AccountPage = () => {
  const { data } = useSession();
  return redirect(`/account-settings/${data?.user.id}`);
};

export default AccountPage;
