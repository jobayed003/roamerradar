'use client';
import Layout from '@/components/ui/Layout';
import { cn } from '@/lib/utils';
import { CreditCard, LockKeyhole, User2 } from 'lucide-react';
import { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import NotificationForm from './NotificationForm';
import PaymentsForm from './PaymentsForm';
import PersonalInfoForm from './PersonalInfoForm';
import SecurityForm from './SecurityForm';

const links = [
  { label: 'Personal info', icon: User2 },
  { label: 'Login and security', icon: LockKeyhole },
  { label: 'Payments', icon: CreditCard },
  { label: 'Notification', icon: IoNotificationsOutline },
];

const steps = [() => <PersonalInfoForm />, () => <SecurityForm />, () => <PaymentsForm />, () => <NotificationForm />];

const AccountDetailsForm = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <Layout>
      <div className='flex justify-between gap-x-8 py-8 mt-20'>
        <div className='flex flex-col p-8 px-10 gap-x-2 gap-y-8 rounded-3xl dark:bg-dark_russian shadow-[0_32px_32px_-12px_rgba(15,15,15,0.08)] dark:shadow-sm select-none h-max'>
          {links.map((item, idx) => (
            <div
              key={item.label}
              className={cn(
                'flex gap-x-2 items-center font-bold text-sm transition text-gray_text hover:text-black dark:text-gray_text dark:hover:text-white cursor-pointer',
                selected === idx && 'text-black dark:text-white'
              )}
              onClick={() => setSelected(idx)}
            >
              <item.icon className='w-4 h-4' />
              <p>{item.label}</p>
            </div>
          ))}
        </div>
        {steps.map((Component, index) => index === selected && <Component key={index} />)}
      </div>
    </Layout>
  );
};

export default AccountDetailsForm;
