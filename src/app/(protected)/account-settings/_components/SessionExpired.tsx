'use client';

import { Button } from '@/components/ui/button';
import { signOut } from 'next-auth/react';

const SessionExpired = () => {
  return (
    <div className='max-w-lg mx-auto py-32 px-6 text-center'>
      <h1 className='text-3xl font-bold mb-4'>Session expired</h1>
      <p className='text-gray_text mb-8'>
        Your account could not be found. This can happen after a database migration. Please sign out and
        log in again with your account.
      </p>
      <Button
        className='bg-blue hover:bg-blue-hover text-white font-bold'
        onClick={() => signOut({ callbackUrl: '/auth/login?callbackUrl=/account-settings' })}
      >
        Sign out and log in again
      </Button>
    </div>
  );
};

export default SessionExpired;
