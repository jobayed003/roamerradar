import Dropdown from '@/components/ui/dropdown';
import useIsMounted from '@/hooks/useIsMounted';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import { Ref, useRef } from 'react';
import { IoNotificationsOutline } from 'react-icons/io5';
import { useOnClickOutside } from 'usehooks-ts';

const NotificationDropdown = () => {
  const { isClicked, onClose, onOpen, onOutsideClick } = useNotificationStore();
  const ref = useRef(null);
  const { isMounted } = useIsMounted();

  useOnClickOutside(ref, onOutsideClick);

  if (!isMounted) return null;

  return (
    <Dropdown isClicked={isClicked} onOutsideClick={onOutsideClick} onClose={onClose} onOpen={onOpen}>
      <div className='relative p-2 hover:text-black dark:hover:text-white '>
        <IoNotificationsOutline className='h-6 w-6 text-[--text-primary] hover:text-black dark:hover:text-white' />
      </div>

      <div className='absolute top-0 left-6 w-3 h-3 bg-green-500 rounded-full' />
      <AnimatePresence>{isClicked && <Notifications ref={ref} />}</AnimatePresence>
    </Dropdown>
  );
};

type NotificationProps = {
  ref: Ref<HTMLDivElement> | undefined;
};

const Notifications = ({ ref }: NotificationProps) => {
  return (
    <motion.div
      className={
        'text-black w-[350px] p-6 absolute top-[4rem] -left-[12.2rem] items-start justify-start gap-y-4 rounded-3xl dark:text-white dark:hover:text-white shadow-lg dark:bg-gradient bg-background z-50'
      }
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
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
          <p className='text-gray_border dark:text-[#E6E8EC]'>Just sent you a message</p>

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
          <p className='text-gray_border dark:text-[#E6E8EC]'>Just sent you a message</p>

          <p className='text-xs text-muted-foreground'>1 minute ago</p>
        </div>
        <div className='w-3 h-3 bg-blue-600 rounded-full' />
      </div>
    </motion.div>
  );
};

export default NotificationDropdown;
