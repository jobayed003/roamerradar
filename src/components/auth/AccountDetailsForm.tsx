'use client';
import { cn } from '@/lib/utils';
import { CreditCard, LockKeyhole, User2 } from 'lucide-react';
import { useState } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import Layout from '../ui/Layout';
import PersonalInfoForm from './PersonalInfoForm';

const links = [
  { label: 'Personal info', icon: User2 },
  { label: 'Login and security', icon: LockKeyhole },
  { label: 'Payments', icon: CreditCard },
  { label: 'Notification', icon: IoNotificationsOutline },
];
const steps = [
  () => <PersonalInfoForm />,
  () => <div>Step 2 Content</div>,
  () => <div>Step 3 Content</div>,
  () => <div>Step 4 Content</div>,
];

const AccountDetailsForm = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <Layout>
      <div className='flex justify-between gap-x-8 py-8'>
        <div className='flex flex-col p-8 px-10 gap-x-2 gap-y-8 rounded-3xl dark:bg-[#23262F] shadow-[0_32px_32px_-12px_rgba(15,15,15,0.08)] select-none h-max'>
          {links.map((item, idx) => (
            <div
              key={item.label}
              className={cn(
                'flex gap-x-2 items-center font-bold text-sm transition text-[--text-primary] hover:text-black dark:text-[--text-primary] dark:hover:text-white cursor-pointer',
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
