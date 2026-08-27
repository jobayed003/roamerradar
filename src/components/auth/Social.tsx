'use client';

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';

import { Button } from '@/components/ui/button';
import { DEFAULT_LOGIN_REDIRECT } from '../../../routes';

type AuthProviders = Record<string, { id: string; name: string }>;

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl');
  const [providers, setProviders] = useState<AuthProviders>({});

  useEffect(() => {
    let cancelled = false;

    fetch('/api/auth/providers')
      .then((response) => (response.ok ? response.json() : {}))
      .then((data: AuthProviders) => {
        if (!cancelled) setProviders(data ?? {});
      })
      .catch(() => {
        if (!cancelled) setProviders({});
      });

    return () => {
      cancelled = true;
    };
  }, []);

  const onClick = (provider: 'google' | 'github') => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  const showGoogle = Boolean(providers.google);
  const showGithub = Boolean(providers.github);

  if (!showGoogle && !showGithub) {
    return null;
  }

  return (
    <div className='flex gap-x-3'>
      {showGoogle ? (
        <Button className='w-full' variant='fill' onClick={() => onClick('google')}>
          <FcGoogle className='h-5 w-5 mr-2' />
          Google
        </Button>
      ) : null}
      {showGithub ? (
        <Button className='w-full' variant='fill' onClick={() => onClick('github')}>
          <FaGithub className='h-5 w-5 mr-2' /> Github
        </Button>
      ) : null}
    </div>
  );
};
