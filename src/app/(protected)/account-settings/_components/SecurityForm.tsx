'use client';

import { changePassword } from '@/actions/changePassword';
import CustomInput from '@/components/CustomInput';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { ChangePasswordSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { User } from '@prisma/client';
import { signIn } from 'next-auth/react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import * as z from 'zod';

type SecurityFormProps = {
  user: User;
  connectedProviders: string[];
};

const SecurityForm = ({ user, connectedProviders }: SecurityFormProps) => {
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isPending, startTransition] = useTransition();

  const isGoogleConnected = connectedProviders.includes('google');
  const isGithubConnected = connectedProviders.includes('github');
  const hasPassword = !!user.password;

  const form = useForm<z.infer<typeof ChangePasswordSchema>>({
    resolver: zodResolver(ChangePasswordSchema),
    defaultValues: {
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (values: z.infer<typeof ChangePasswordSchema>) => {
    startTransition(() => {
      changePassword(values).then((data) => {
        if (data?.error) {
          toast({ title: data.error, variant: 'destructive' });
          return;
        }

        form.reset();
        setShowPasswordForm(false);
        toast({ title: data.success });
      });
    });
  };

  const connectProvider = (provider: 'google' | 'github') => {
    signIn(provider, { callbackUrl: '/account-settings' });
  };

  return (
    <div className='grow pl-28 pb-20 min-h-[100vh]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-5xl font-bold'>Login and security</h1>
      </div>

      <div className='mt-16 mb-10 text-2xl font-poppins font-semibold'>Login</div>

      <div className='flex items-center justify-between'>
        <div className='font-poppins'>
          <p className='font-semibold leading-9'>Password</p>
          <p className='text-gray_text text-xs'>
            {hasPassword ? 'Update your account password' : 'Set a password to enable email login'}
          </p>
        </div>
        {hasPassword && (
          <Button
            variant='outline'
            className='rounded-full font-bold'
            onClick={() => setShowPasswordForm(!showPasswordForm)}
          >
            {showPasswordForm ? 'Cancel' : 'Update Password'}
          </Button>
        )}
      </div>

      {showPasswordForm && hasPassword && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className='mt-8 space-y-6 max-w-md'>
            <FormField
              control={form.control}
              name='currentPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-bold text-gray_light uppercase'>Current password</FormLabel>
                  <FormControl>
                    <CustomInput
                      props={field}
                      placeholder='••••••••'
                      type='password'
                      disabled={isPending}
                      className='h-12 border-2 border-[#e6e8ec] dark:border-gray_border'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='newPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-bold text-gray_light uppercase'>New password</FormLabel>
                  <FormControl>
                    <CustomInput
                      props={field}
                      placeholder='••••••••'
                      type='password'
                      disabled={isPending}
                      className='h-12 border-2 border-[#e6e8ec] dark:border-gray_border'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='confirmPassword'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-bold text-gray_light uppercase'>Confirm password</FormLabel>
                  <FormControl>
                    <CustomInput
                      props={field}
                      placeholder='••••••••'
                      type='password'
                      disabled={isPending}
                      className='h-12 border-2 border-[#e6e8ec] dark:border-gray_border'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button disabled={isPending} type='submit' variant='fill' className='bg-blue hover:bg-blue-hover text-white'>
              Save password
            </Button>
          </form>
        </Form>
      )}

      {!hasPassword && (
        <p className='text-gray_text text-sm mt-4'>
          This account uses social sign-in only. Connect a provider below or contact support to add a password.
        </p>
      )}

      <Separator className='mt-16 bg-gray_border' />

      <div className='mt-16 mb-10 text-2xl font-poppins font-semibold'>Social accounts</div>

      <div className='space-y-8'>
        <div className='flex items-center justify-between gap-x-8'>
          <div className='font-poppins flex items-center gap-x-3'>
            <FcGoogle className='h-6 w-6' />
            <div>
              <p className='font-semibold leading-9'>Google</p>
              <p className='text-gray_text text-xs'>{isGoogleConnected ? 'Connected' : 'Not connected'}</p>
            </div>
          </div>
          {!isGoogleConnected && (
            <Button variant='outline' className='rounded-full font-bold' onClick={() => connectProvider('google')}>
              Connect
            </Button>
          )}
        </div>

        <Separator className='bg-gray_border' />

        <div className='flex items-center justify-between gap-x-8'>
          <div className='font-poppins flex items-center gap-x-3'>
            <FaGithub className='h-6 w-6' />
            <div>
              <p className='font-semibold leading-9'>GitHub</p>
              <p className='text-gray_text text-xs'>{isGithubConnected ? 'Connected' : 'Not connected'}</p>
            </div>
          </div>
          {!isGithubConnected && (
            <Button variant='outline' className='rounded-full font-bold' onClick={() => connectProvider('github')}>
              Connect
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SecurityForm;
