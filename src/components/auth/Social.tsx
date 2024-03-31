'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '../../../routes';

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className='flex gap-x-3'>
      <Button className='w-full' variant='fill' onClick={() => onClick('google')}>
        <FcGoogle className='h-5 w-5 mr-2' />
        Google
      </Button>
      <Button className='w-full' variant='fill' onClick={() => onClick('github')}>
        <FaGithub className='h-5 w-5 mr-2' /> Github
      </Button>
    </div>
  );
};
