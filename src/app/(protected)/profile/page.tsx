'use client';

import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

const ProfilePage = () => {
  const { data } = useSession();
  return redirect(`/profile/${data?.user.id}`);
};

export default ProfilePage;
