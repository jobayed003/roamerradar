import CustomInput from '@/components/ui/CustomInput';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import RadioButton from '@/components/ui/radio';
import { PaymentSchema } from '@/schemas';
import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const PaymentsForm = () => {
  const [isSelected, setIsSelected] = useState(true);

  //TODO: Add payment method

  const form = useForm<z.infer<typeof PaymentSchema>>({
    resolver: zodResolver(PaymentSchema),
    defaultValues: {
      name: 'John Doe',
      number: 'XXXX XXXX XXXX XXXX',
      expiry: 'MM',
      cvc: 'CVC',
    },
  });

  const onSubmit = (values: z.infer<typeof PaymentSchema>) => {};

  return (
    <div className='grow pl-28 mb-8'>
      <div className='flex items-center justify-between'>
        <h1 className='text-5xl font-bold'>Payments Methods</h1>
      </div>
      <div className='mt-20 text-2xl font-poppins font-semibold'>Credit card</div>
      <div className='flex items-center justify-between mt-4 my-8'>
        <div className='font-poppins'>
          <p className='font-semibold leading-9'>Visa ••••••1667</p>
          <p className='text-gray_text text-xs'>Expiration: 03/2026</p>
        </div>

        <Button variant={'fill'} className='font-bold p-6 bg-blue hover:bg-blue-hover text-white'>
          Add Payment Method
        </Button>
      </div>
      <div className='flex items-center justify-between'>
        <div className='font-poppins font-semibold'>Add new credit card</div>
        <div className='flex gap-x-4'>
          <Image src={'/visa.png'} className='brightness-150' alt='logo master' width={40} height={40} />
          <Image src={'/master.png'} alt='logo master' width={40} height={40} />
        </div>
      </div>

      <div className='mt-5'>
        <Form {...form}>
          <form className='space-y-6' onSubmit={form.handleSubmit(onSubmit)}>
            <div className='flex flex-col gap-y-8'>
              <FormField
                control={form.control}
                name='number'
                render={({ field }) => (
                  <FormItem className='basis-1/2'>
                    <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Card Number</FormLabel>
                    <FormControl>
                      <CustomInput
                        placeholder='XXXX XXXX XXXX XXXX'
                        props={field}
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='name'
                render={({ field }) => (
                  <FormItem className='basis-1/2'>
                    <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Card Holder</FormLabel>
                    <FormControl>
                      <CustomInput
                        placeholder='JOHN DOE'
                        props={field}
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className='flex gap-x-6 justify-between w-ful'>
              <FormField
                control={form.control}
                name='expiry'
                render={({ field }) => (
                  <FormItem className='basis-1/2'>
                    <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>Expiration date</FormLabel>
                    <FormControl>
                      <CustomInput
                        placeholder='MM / YY'
                        props={field}
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border dark:focus:border-gray_text'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='cvc'
                render={({ field }) => (
                  <FormItem className='basis-1/2'>
                    <FormLabel className='text-xs font-bold text-[#B1B5C3] uppercase'>CVC</FormLabel>
                    <FormControl>
                      <CustomInput
                        placeholder='CVC'
                        props={field}
                        className='h-12 transition-all border-2 border-[#e6e8ec] dark:border-gray_border'
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <RadioButton showCheck={isSelected} onChange={() => setIsSelected(!isSelected)} label='Save Card' />
          </form>
        </Form>
      </div>
    </div>
  );
};

export default PaymentsForm;
