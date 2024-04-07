import { Switch } from '@/components/ui/switch';

import { useTransition } from 'react';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';

const NotificationForm = () => {
  return (
    <div className='grow pl-28 pb-20 h-[100vh]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-5xl font-bold'>Notification Setting</h1>
      </div>

      <div className='mt-16 text-2xl font-poppins font-semibold'>Messages</div>

      <ToggleNotification field='message_email' label='Email' desc='Receive notifications via email' value={false} />
      <Separator className='dark:bg-gray_border' />

      <ToggleNotification
        field='message_text'
        desc='Receive notifications via mobile phone'
        label='Text Messages'
        value={false}
      />

      <Separator className='dark:bg-gray_border' />
      <ToggleNotification
        field='message_browser'
        desc='Receive notifications of your browser'
        label='Browser notifications'
        value={false}
      />

      <Separator className='dark:bg-gray_border mt-8' />

      <div className='mt-16 text-2xl font-poppins font-semibold'>Reminders</div>

      <ToggleNotification field='reminders_email' label='Email' desc='Receive notifications via email' value={false} />
      <Separator className='dark:bg-gray_border' />

      <ToggleNotification
        field='reminders_text'
        desc='Receive notifications via mobile phone'
        label='Text Messages'
        value={false}
      />

      <Separator className='dark:bg-gray_border' />
      <ToggleNotification
        field='reminders_browser'
        desc='Receive notifications of your browser'
        label='Browser notifications'
        value={false}
      />
    </div>
  );
};

export default NotificationForm;

type FieldTypes =
  | 'message_email'
  | 'message_text'
  | 'message_browser'
  | 'reminders_email'
  | 'reminders_text'
  | 'reminders_browser';

type ToggleCardProps = {
  label: string;
  value: boolean;
  desc: string;
  field: FieldTypes;
};

const ToggleNotification = ({ label, value = false, desc, field }: ToggleCardProps) => {
  const [isPending, startTransition] = useTransition();

  const onChange = () => {
    toast({
      title: 'You changed the following value',
      description: (
        <pre className='mt-2 w-[340px] rounded-md bg-slate-950 p-4'>
          <code className='text-white'>{JSON.stringify(field, null, 2)}</code>
        </pre>
      ),
    });
  };

  return (
    <div className='rounded-xl py-6'>
      <div className='flex items-center justify-between'>
        <div>
          <p className='font-semibold shrink-0 mb-1'>{label}</p>
          <p className='text-gray_text text-sm'>{desc}</p>
        </div>
        <div className='space-y-2'>
          <Switch disabled={isPending} onCheckedChange={onChange} checked={value}>
            {value ? 'On' : 'Off'}
          </Switch>
        </div>
      </div>
    </div>
  );
};
