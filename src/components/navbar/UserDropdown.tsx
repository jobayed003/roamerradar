import { useCurrentUser } from '@/hooks/useCurrentUser';
import { motion } from 'framer-motion';
import { User2 } from 'lucide-react';
import Image from 'next/image';
import { Ref, useState } from 'react';

const UserDropdown = () => {
  const [isClicked, setIsClicked] = useState(false);

  const { user } = useCurrentUser();

  return (
    <div className='p-2'>
      <div
        onClick={() => setIsClicked(!isClicked)}
        className='bg-green-500 hover:bg-[#41b168] p-2 rounded-full cursor-pointer transition-all'
      >
        <User2 className='text-white h-6 w-6' />
      </div>

      {!user && isClicked && <Notifications />}
    </div>
  );
};

type NotificationProps = {
  ref?: Ref<HTMLDivElement> | undefined;
};

const Notifications = ({ ref }: NotificationProps) => {
  return (
    <motion.div
      className={
        'text-black w-[350px] p-6 absolute top-14 sm:-left-[13rem] -left-[14rem] items-start justify-start gap-y-4 rounded-2xl transition duration-200  dark:text-white dark:hover:text-white shadow-lg dark:bg-gradient z-50'
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      ref={ref}
    >
      <h1 className='text-2xl font-medium pt-4 font-poppins'>Notification</h1>

      <div className='flex justify-between items-center py-6'>
        <Image
          src={'/images/travel-1.jpg'}
          width={50}
          height={50}
          alt='user image'
          className='rounded-full object-fill max-w-[50px] max-h-[50px] mb-2'
        />
        <div className='font-poppins'>
          <h1 className='font-medium'>Kohaku Tora</h1>
          <p className='text-[#353945] dark:text-[#E6E8EC]'>Just sent you a message</p>

          <p className='text-xs text-muted-foreground'>1 minute ago</p>
        </div>
        <div className='w-3 h-3 bg-blue-600 rounded-full' />
      </div>
      <div className='flex justify-between items-center py-6'>
        <Image
          src={'/images/travel-1.jpg'}
          width={50}
          height={50}
          alt='user image'
          className='rounded-full object-fill max-w-[50px] max-h-[50px] mb-2'
        />
        <div className='font-poppins'>
          <h1 className='font-medium'>Kohaku Tora</h1>
          <p className='text-[#353945] dark:text-[#E6E8EC]'>Just sent you a message</p>

          <p className='text-xs text-muted-foreground'>1 minute ago</p>
        </div>
        <div className='w-3 h-3 bg-blue-600 rounded-full' />
      </div>
    </motion.div>
  );
};

export default UserDropdown;
