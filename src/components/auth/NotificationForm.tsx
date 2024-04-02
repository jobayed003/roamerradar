import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Switch } from '@/components/ui/switch';

import { zodResolver } from '@hookform/resolvers/zod';
import { UseFormReturn, useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '../ui/button';
import { toast } from '../ui/use-toast';

const FormSchema = z.object({
  marketing_emails: z.boolean().default(false).optional(),
  security_emails: z.boolean(),
});

const NotificationForm = () => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      security_emails: true,
    },
  });

  const onSubmit = (data: z.infer<typeof FormSchema>) => {
    toast({
      title: 'You submitted the following values:',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className='grow pl-28 pb-20 h-[100vh]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-5xl font-bold'>Notification Setting</h1>
      </div>
      <div className='my-16 text-2xl font-poppins font-semibold'>Messages</div>

      <NotificationSwitch form={form} onSubmit={onSubmit} />
    </div>
  );
};

export default NotificationForm;

const NotificationSwitch = ({
  form,
  onSubmit,
}: {
  form: UseFormReturn<
    {
      security_emails: boolean;
      marketing_emails?: boolean | undefined;
    },
    any,
    undefined
  >;
  onSubmit: (values: z.infer<typeof FormSchema>) => void;
}) => {
  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-6'>
          <div>
            <h3 className='mb-4 text-lg font-medium'>Email Notifications</h3>
            <div className='space-y-4'>
              <FormField
                control={form.control}
                name='marketing_emails'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>Marketing emails</FormLabel>
                      <FormDescription>Receive notifications via email</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name='security_emails'
                render={({ field }) => (
                  <FormItem className='flex flex-row items-center justify-between rounded-lg p-4'>
                    <div className='space-y-0.5'>
                      <FormLabel className='text-base'>Security emails</FormLabel>
                      <FormDescription>Recevice notifications via mobile phone</FormDescription>
                    </div>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} disabled aria-readonly />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          <Button type='submit'>sub</Button>
        </form>
      </Form>
    </div>
  );
};
