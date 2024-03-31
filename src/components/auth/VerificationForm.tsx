'use client';
import { verification } from '@/actions/email-verification';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { BeatLoader } from 'react-spinners';

const VerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();
  const [showLoader, setShowLoader] = useState<boolean>(true);
  const { theme } = useTheme();
  const searchParams = useSearchParams();

  const token = searchParams.get('token');

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError('Missing token');
      return;
    }

    verification(token)
      .then((data) => {
        setSuccess(data?.success);
        setError(data?.error);
      })
      .catch(() => {
        setError('Something wrong occured!');
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(false);
    }, 1000); // Set the delay here

    return () => clearTimeout(timer);
  }, [success, error]);

  return (
    <div className='relative mt-2 px-3 py-8'>
      <div className='flex items-center w-full justify-center'>
        {showLoader && !success && !error && <BeatLoader color={theme === 'dark' ? 'white' : 'black'} />}

        <FormSuccess message={success || !showLoader ? 'Email verification success!' : ''} />
        {!success && <FormError message={error} />}
      </div>
    </div>
  );
};

export default VerificationForm;
