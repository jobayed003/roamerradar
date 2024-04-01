import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { PersonalInfoSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import CustomInput from '../ui/CustomInput';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';

const PersonalInfoForm = () => {
  const form = useForm<z.infer<typeof PersonalInfoSchema>>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      display: '',
      real: '',
      phone: '',
      email: '',
      bio: '',
      website: '',
      twitter: '',
    },
  });

  const onSubmit = (values: z.infer<typeof PersonalInfoSchema>) => {};

  return (
    <div className='grow pl-28 pb-20'>
      <div className='flex items-center justify-between'>
        <h1 className='text-5xl font-bold'>Personal Info</h1>
        <Link href={'/profile'}>
          <Button variant={'fill'} className='hover:bg-[#353945]'>
            View Profile
          </Button>
        </Link>
      </div>

      <div className='my-8 font-medium'>Account info</div>

      <Form {...form}>
        <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
          <div className='flex flex-col gap-y-8'>
            <div className='flex gap-x-6 justify-between w-full'>
              <FormField
                control={form.control}
                name='display'
                render={({ field }) => (
                  <FormItem className='basis-1/2'>
                    <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Display Name</FormLabel>
                    <FormControl>
                      <CustomInput
                        placeholder='Enter your display name'
                        props={field}
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-[#353945] dark:focus:border-[--text-primary]'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='real'
                render={({ field }) => (
                  <FormItem className='basis-1/2'>
                    <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Real name</FormLabel>
                    <FormControl>
                      <CustomInput
                        placeholder='Enter your real name'
                        props={field}
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-[#353945]'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='flex gap-x-6 justify-between w-full'>
              <FormField
                control={form.control}
                name='phone'
                render={({ field }) => (
                  <FormItem className='basis-1/2'>
                    <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Phone number</FormLabel>
                    <FormControl>
                      <CustomInput
                        placeholder='Phone number'
                        props={field}
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-[#353945]'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='email'
                render={({ field }) => (
                  <FormItem className='basis-1/2'>
                    <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Email</FormLabel>
                    <FormControl>
                      <CustomInput
                        placeholder='Email'
                        type='email'
                        props={field}
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-[#353945]'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div>
              <Textarea
                spellCheck={false}
                placeholder='About yourself in a few words'
                className='h-[140px] outline-none ring-0 resize-none focus-visible:ring-transparent focus-visible:ring-offset-0 transition-all border-2 border-[#e6e8ec] dark:border-[#353945] placeholder:text-[--text-primary] placeholder:font-semibold rounded-xl'
              />
            </div>
          </div>

          <div className='my-8 font-medium'>Social</div>

          <div className='flex gap-x-6 justify-between w-full'>
            <FormField
              control={form.control}
              name='website'
              render={({ field }) => (
                <FormItem className='basis-1/2'>
                  <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Website</FormLabel>
                  <FormControl>
                    <CustomInput
                      placeholder='Your site URL'
                      props={field}
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-[#353945]'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='twitter'
              render={({ field }) => (
                <FormItem className='basis-1/2'>
                  <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Twitter</FormLabel>
                  <FormControl>
                    <CustomInput
                      placeholder='@twitter username'
                      props={field}
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-[#353945]'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='flex gap-x-4 items-center'>
            <Button variant={'fill'} className='font-bold p-6 bg-blue hover:bg-blue-hover text-white'>
              Update profile
            </Button>
            <Button
              variant={'transparent'}
              onClick={() => form.reset()}
              className='text-[--text-primary] font-bold hover:text-blue-hover'
            >
              <X className='w-4 h-4 mr-2' /> Clear all
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;
