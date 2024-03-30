'use client';

import LoginForm from '@/components/auth/LoginForm';
import RegisterForm from '@/components/auth/RegisterForm';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import useIsMounted from '@/hooks/useIsMounted';
import { ReactNode, useState } from 'react';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSignup, setIsSignup] = useState(true);

  const { isMounted } = useIsMounted();
  if (!isMounted) return null;

  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className='bg-[#141416] text-center max-w-xl select-none'>
          <div className='flex flex-col items-center gap-y-6 px-8 py-8'>
            <h1 className='text-4xl font-bold'>Sign {isSignup ? 'up' : 'in'} on RoamerRadar</h1>

            {isSignup ? <RegisterForm /> : <LoginForm />}

            <p className='text-[--text-primary] text-xs font-poppins mt-3'>Or continue with</p>

            <div className='flex gap-x-3 '>
              <Button variant={'fill'} className='bg-blue hover:bg-blue-hover p-6 py-5  font-bold transition-all'>
                <FaGoogle className='w-3 h-3 mr-2' /> Google
              </Button>
              <Button variant={'fill'} className='p-6 py-5 font-bold'>
                <FaGithub className='w-3 h-3 mr-2' />
                Github
              </Button>
            </div>

            <div>
              <p className='text-xs font-poppins font-semibold'>
                {!isSignup ? "Don't have an account?" : 'Already have an account?'}
                {'  '}
                <span className='text-blue cursor-pointer' onClick={() => setIsSignup(!isSignup)}>
                  {isSignup ? 'Login' : 'Signup'}
                </span>
              </p>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthModalProvider;
