'use client';

import { updateNotificationPreferences } from '@/actions/notificationPreferences';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { toast } from '@/components/ui/use-toast';
import { NotificationPreferenceData } from '@/data/notification-preference';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type NotificationFormProps = {
  preferences: NotificationPreferenceData;
};

type FieldTypes = keyof NotificationPreferenceData;

const NotificationForm = ({ preferences }: NotificationFormProps) => {
  const [values, setValues] = useState(preferences);
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const updateField = (field: FieldTypes, checked: boolean) => {
    const previous = values;
    const next = { ...values, [field]: checked };
    setValues(next);

    startTransition(() => {
      updateNotificationPreferences(next).then((result) => {
        if (result.error) {
          setValues(previous);
          toast({ title: result.error, variant: 'destructive' });
          return;
        }

        toast({ title: result.success });
        router.refresh();
      });
    });
  };

  const rows: { field: FieldTypes; label: string; desc: string }[] = [
    { field: 'messageEmail', label: 'Email', desc: 'Receive notifications via email' },
    { field: 'messageText', label: 'Text Messages', desc: 'Receive notifications via mobile phone' },
    { field: 'messageBrowser', label: 'Browser notifications', desc: 'Receive notifications in your browser' },
    { field: 'remindersEmail', label: 'Email', desc: 'Receive reminders via email' },
    { field: 'remindersText', label: 'Text Messages', desc: 'Receive reminders via mobile phone' },
    { field: 'remindersBrowser', label: 'Browser notifications', desc: 'Receive reminders in your browser' },
  ];

  return (
    <div className='grow pl-28 pb-20 min-h-[100vh]'>
      <div className='flex items-center justify-between'>
        <h1 className='text-5xl font-bold'>Notification Setting</h1>
      </div>

      <div className='mt-16 text-2xl font-poppins font-semibold'>Messages</div>
      {rows.slice(0, 3).map((row) => (
        <div key={row.field}>
          <ToggleRow {...row} checked={values[row.field]} disabled={isPending} onChange={updateField} />
          <Separator className='dark:bg-gray_border' />
        </div>
      ))}

      <Separator className='dark:bg-gray_border mt-8' />

      <div className='mt-16 text-2xl font-poppins font-semibold'>Reminders</div>
      {rows.slice(3).map((row) => (
        <div key={row.field}>
          <ToggleRow {...row} checked={values[row.field]} disabled={isPending} onChange={updateField} />
          <Separator className='dark:bg-gray_border' />
        </div>
      ))}
    </div>
  );
};

export default NotificationForm;

type ToggleRowProps = {
  field: FieldTypes;
  label: string;
  desc: string;
  checked: boolean;
  disabled: boolean;
  onChange: (field: FieldTypes, checked: boolean) => void;
};

const ToggleRow = ({ field, label, desc, checked, disabled, onChange }: ToggleRowProps) => (
  <div className='rounded-xl py-6'>
    <div className='flex items-center justify-between'>
      <div>
        <p className='font-semibold shrink-0 mb-1'>{label}</p>
        <p className='text-gray_text text-sm'>{desc}</p>
      </div>
      <Switch disabled={disabled} onCheckedChange={(value) => onChange(field, value)} checked={checked} />
    </div>
  </div>
);
