'use client';

import { register } from '@/actions/register';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { RegisterSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import CustomInput from '../CustomInput';

const RegisterForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      displayName: '',
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError('');
    setSuccess('');

    startTransition(() => {
      register(values).then((data) => {
        setSuccess(data.success);
        setError(data?.error);
      });
    });
  };

  return (
    <div className='relative mt-2 w-10/12 px-3'>
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-3 text-left'>
            <FormField
              control={form.control}
              name='displayName'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-bold text-gray_light uppercase'>Fullname</FormLabel>
                  <FormControl>
                    <CustomInput
                      props={field}
                      placeholder='John Doe'
                      disabled={isPending}
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-bold text-gray_light uppercase'>Email Address</FormLabel>
                  <FormControl>
                    <CustomInput
                      props={field}
                      placeholder='john.doe@example.com'
                      disabled={isPending}
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='password'
              render={({ field }) => (
                <FormItem>
                  <FormLabel className='text-xs font-bold text-gray_light uppercase'>Enter a password</FormLabel>
                  <FormControl>
                    <div className='relative'>
                      <CustomInput
                        props={field}
                        placeholder='*******'
                        disabled={isPending}
                        type={showPassword ? 'text' : 'password'}
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                      />
                      <div className='absolute right-3 top-3 z-10 text-gray_text select-none cursor-pointer'>
                        {showPassword ? (
                          <EyeOff onClick={() => setShowPassword(false)} />
                        ) : (
                          <Eye onClick={() => setShowPassword(true)} />
                        )}
                      </div>
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button
            disabled={isPending}
            variant={'fill'}
            className='bg-blue hover:bg-blue-hover text-white mt-4 w-full border-0'
            type='submit'
          >
            Sign up <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default RegisterForm;
