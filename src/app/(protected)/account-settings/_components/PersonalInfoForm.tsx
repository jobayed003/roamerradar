import CustomInput from '@/components/CustomInput';
import LinkButton from '@/components/LinkButton';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { FancyMultiSelect } from '@/components/ui/multiselect';
import { Textarea } from '@/components/ui/textarea';
import { PersonalInfoSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const PersonalInfoForm = () => {
  const [selectedLanguage, setSelectedLanguage] = useState<string[]>([]);

  const form = useForm<z.infer<typeof PersonalInfoSchema>>({
    resolver: zodResolver(PersonalInfoSchema),
    defaultValues: {
      display: '',
      real: '',
      phone: '',
      email: '',
      bio: '',
      livesIn: '',
      speaks: [],
      facebook: '',
      instagram: '',
      twitter: '',
      website: '',
    },
  });

  const onSubmit = (values: z.infer<typeof PersonalInfoSchema>) => {
    values.speaks = selectedLanguage;
    console.log(values);
  };

  return (
    <div className='grow pl-28 mb-20'>
      <div className='flex items-center justify-between'>
        <h1 className='text-5xl font-bold'>Personal Info</h1>
        <LinkButton href='/profile' label='View Profile' />
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
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
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
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border'
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
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border'
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
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border'
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
                className='h-[140px] outline-none ring-0 resize-none focus-visible:ring-transparent focus-visible:ring-offset-0 transition-all border-2 border-[#e6e8ec] dark:border-gray_border placeholder:text-gray_text placeholder:font-semibold rounded-xl focus:border-gray_text dark:focus:border-gray_text'
              />
            </div>

            <FormField
              control={form.control}
              name='livesIn'
              render={({ field }) => (
                <FormItem className='basis-1/2'>
                  <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Lives In</FormLabel>
                  <FormControl>
                    <CustomInput
                      placeholder='Your location'
                      props={field}
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormItem className='basis-1/2'>
              <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Speaks</FormLabel>
              <FormControl>
                <FancyMultiSelect setSelectedLanguage={setSelectedLanguage} />
              </FormControl>
            </FormItem>
          </div>

          <div className='my-8 font-medium'>Social</div>

          <div className='flex gap-x-6 justify-between w-full'>
            <FormField
              control={form.control}
              name='facebook'
              render={({ field }) => (
                <FormItem className='basis-1/2'>
                  <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Facebook</FormLabel>
                  <FormControl>
                    <CustomInput
                      placeholder='Your facebook link'
                      props={field}
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name='instagram'
              render={({ field }) => (
                <FormItem className='basis-1/2'>
                  <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Instagram</FormLabel>
                  <FormControl>
                    <CustomInput
                      placeholder='Your instagram link'
                      props={field}
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className='flex gap-x-6 justify-between w-full'>
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
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border'
                    />
                  </FormControl>
                </FormItem>
              )}
            />

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
                      className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border'
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <div className='flex gap-x-4 items-center'>
            <Button variant={'fill'} className='font-bold p-6 bg-blue hover:bg-blue-hover text-white' type={'submit'}>
              Update profile
            </Button>
            <Button
              variant={'transparent'}
              onClick={() => form.reset()}
              className='text-gray_text font-bold hover:text-blue-hover'
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
