import Dropdown from '@/components/ui/dropdown';
import { cn } from '@/lib/utils';
import { useOptionStore } from '@/store/useOptionsStore';
import { motion } from 'framer-motion';
import { CarIcon, ChevronDown, Home, Medal, Plane } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Ref, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

const OptionDropdown = () => {
  const { isClicked, onOpen, onClose, onOutsideClick } = useOptionStore();
  const ref = useRef(null);

  useOnClickOutside(ref, onOutsideClick);

  return (
    <Dropdown isClicked={isClicked} onOutsideClick={onOutsideClick} onClose={onClose} onOpen={onOpen}>
      <p className={'text-sm font-bold'}>Travelers</p>
      <div>
        <ChevronDown className={cn('h-5 w-5 transition duration-200', isClicked && 'rotate-180')} />
      </div>
      {isClicked && <Options ref={ref} />}
    </Dropdown>
  );
};

export default OptionDropdown;

const ITEMS = [
  { href: '/', icon: <Home />, label: 'Stays' },
  { href: '/flights', icon: <Plane />, label: 'Flights' },
  { href: '/things', icon: <Medal />, label: 'Things to do' },
  { href: '/cars', icon: <CarIcon />, label: 'Cars' },
];

const Options = ({ ref, className }: { ref: Ref<HTMLDivElement> | undefined; className?: string }) => {
  const pathname = usePathname();

  return (
    <motion.div
      className={cn(
        'text-black bg-white w-[250px] p-4 absolute top-10 left-[-80px] right-0 flex-col items-start justify-start gap-y-4 rounded-2xl transition duration-200  dark:bg-[#141416] dark:text-[--text-primary] dark:hover:text-white shadow-lg',
        className
      )}
      ref={ref}
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0, ease: 'easeIn' }}
    >
      {ITEMS.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className={cn(
            'flex items-center justify-start w-full p-3  px-6 gap-x-2 rounded-3xl transition text-[--text-primary] hover:text-black dark:text-[--text-primary] dark:hover:text-white',
            pathname === item.href &&
              'bg-[#23262F] text-white hover:text-white dark:bg-white dark:text-black dark:hover:text-black'
          )}
        >
          {item.icon}
          <p className='font-bold text-sm'>{item.label}</p>
        </Link>
      ))}
    </motion.div>
  );
};
