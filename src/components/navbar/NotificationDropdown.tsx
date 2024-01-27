import Dropdown from '@/components/ui/dropdown';
import { cn } from '@/lib/utils';
import { useNotificationStore } from '@/store/useNotificationStore';
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
        <Bell className='h-5 w-5 text-[--text-primary] hover:text-white' />
      </div>

      <div className='absolute top-[-10px] left-3 w-3 h-3 bg-green-500 rounded-full ' />

      {isClicked && <Notifications ref={ref} />}
    </Dropdown>
  );
};

type NotificationProps = {
  ref: Ref<HTMLDivElement> | undefined;
  className?: string;
};

const Notifications = ({ ref, className }: NotificationProps) => {
  return (
    <motion.div
      className={cn(
        'text-black w-[280px] p-6 absolute top-10 left-[-150px] right-20 items-start justify-start gap-y-4 rounded-2xl transition duration-200 dark:bg-[#141416] dark:text-white dark:hover:text-white shadow-lg  dark:bg-gradient-to-t from-[#23262F] to-[rgba(35, 38, 47, .7)]',
        className
      )}
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0, ease: 'circIn' }}
      ref={ref}
    >
      <h1 className='text-2xl font-medium pt-4'>Notifications</h1>
    </motion.div>
  );
};

export default NotificationDropdown;
