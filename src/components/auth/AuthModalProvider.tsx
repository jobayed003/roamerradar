'use client';

import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import useIsMounted from '@/hooks/useIsMounted';
import { ArrowRight } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const AuthModalProvider = ({ children }: { children: ReactNode }) => {
  const [isSignup, setIsSignup] = useState(true);

  const { isMounted } = useIsMounted();

  if (!isMounted) return null;

  return (
    <div>
      <Dialog>
        <DialogTrigger>{children}</DialogTrigger>
        <DialogContent className='bg-[#141416] text-center max-w-xl'>
          {isSignup && (
            <div className='flex flex-col items-center gap-y-6 px-8 py-8'>
              <h1 className='text-4xl font-bold'>Sign up on RoamerRadar</h1>
              <div className='flex gap-x-3'>
                <Button className='bg-blue rounded-full px-6 py-4 text-foreground'> Google</Button>
                <Button variant={'outline'} className='rounded-full bg-transparent'>
                  Github
                </Button>
              </div>
              <p className='text-[--text-primary] text-xs font-poppins mt-3'>Or continue with email</p>
              <div className='relative mt-2 w-10/12'>
                <Input
                  placeholder='Enter your email'
                  className='border-[#353945]  bg-transparent outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-full py-5'
                />
                <div className='absolute right-2 top-2 p-1 bg-blue hover:bg-blue rounded-full transition-all cursor-pointer'>
                  <ArrowRight className='w-5 h-5' />
                </div>
              </div>
              <div>
                <p className='text-xs font-poppins font-semibold'>
                  ALready have an account?{' '}
                  <span className='text-blue cursor-pointer' onClick={() => setIsSignup(false)}>
                    Login
                  </span>
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AuthModalProvider;
