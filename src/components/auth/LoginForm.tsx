'use client';
import { FormError } from '@/components/FormError';
import { FormSuccess } from '@/components/FormSuccess';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { cn } from '@/lib/utils';
import { LoginSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { ArrowRight } from 'lucide-react';
import { useState, useTransition } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const inputClassNames =
  'border-[#353945] bg-transparent outline-none focus-visible:ring-transparent focus-visible:ring-offset-0 py-5 mb-5';

const LoginForm = () => {
  const [error, setError] = useState<string | undefined>('');
  const [success, setSuccess] = useState<string | undefined>('');
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError('');
    setSuccess('');
  };

  return (
    <div className='relative mt-2 w-10/12 px-3'>
      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='space-y-3 text-left'>
            <FormField
              control={form.control}
              name='email'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email Address</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder='john.doe@example.com'
                      className={cn(inputClassNames)}
                      disabled={isPending}
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
                  <FormLabel>Enter a password</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder='*******' className={cn(inputClassNames)} disabled={isPending} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button variant={'fill'} className='bg-blue hover:bg-blue-hover mt-4 w-full border-0' type='submit'>
            Sign in <ArrowRight className='w-4 h-4 ml-2' />
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;