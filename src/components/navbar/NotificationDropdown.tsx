import Dropdown from '@/components/ui/dropdown';
import { useNotificationStore } from '@/stores/useNotificationStore';
import { motion } from 'framer-motion';
import { Bell } from 'lucide-react';
import { Ref, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

const NotificationDropdown = () => {
  const { isClicked, onClose, onOpen, onOutsideClick } = useNotificationStore();
  const ref = useRef(null);

  useOnClickOutside(ref, onOutsideClick);

  return (
    <Dropdown isClicked={isClicked} onOutsideClick={onOutsideClick} onClose={onClose} onOpen={onOpen}>
      <div className='relative'>
        <Bell className='h-5 w-5 text-[--text-primary] hover:text-black dark:hover:text-white' />
      </div>

      <div className='absolute top-[-10px] left-3 w-3 h-3 bg-green-500 rounded-full ' />

      {isClicked && <Notifications ref={ref} />}
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
        'text-black w-[350px] p-6 absolute top-14 left-[-13rem] right-20 items-start justify-start gap-y-4 rounded-2xl transition duration-200  dark:text-white dark:hover:text-white shadow-lg dark:bg-gradient'
      }
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      ref={ref}
    >
      <h1 className='text-2xl font-medium pt-4'>Notifications</h1>
    </motion.div>
  );
};

export default NotificationDropdown;
