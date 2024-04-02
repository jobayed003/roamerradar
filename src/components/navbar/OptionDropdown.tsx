import Dropdown from '@/components/ui/dropdown';
import { cn } from '@/lib/utils';
import { useOptionStore } from '@/stores/useOptionsStore';
import { AnimatePresence, motion } from 'framer-motion';
import { CarIcon, ChevronDown, Home, Medal, Plane } from 'lucide-react';
import { Ref, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import LinkProvider from '../LinkProvider';

const OptionDropdown = () => {
  const { isClicked, onOpen, onClose, onOutsideClick } = useOptionStore();
  const ref = useRef(null);

  useOnClickOutside(ref, onOutsideClick);

  return (
    <Dropdown isClicked={isClicked} onOutsideClick={onOutsideClick} onClose={onClose} onOpen={onOpen}>
      <p className={'text-sm font-bold select-none'}>Travelers</p>
      <div>
        <ChevronDown className={cn('h-5 w-5 transition duration-200', isClicked && 'rotate-180')} />
      </div>

      <AnimatePresence>{isClicked && <Options ref={ref} />}</AnimatePresence>
    </Dropdown>
  );
};

export default OptionDropdown;

const ITEMS = [
  { href: '/', icon: <Home />, label: 'Stays' },
  { href: '/flights', icon: <Plane />, label: 'Flights' },
  { href: '/cars', icon: <CarIcon />, label: 'Cars' },
  { href: '/things', icon: <Medal />, label: 'Things to do' },
];

const Options = ({ ref }: { ref: Ref<HTMLDivElement> | undefined }) => {
  return (
    <motion.div
      className={
        'text-black bg-white w-[280px] p-4 absolute top-14 left-[-80px] right-0 flex-col items-start justify-start gap-y-4 rounded-2xl  dark:bg-[#141416] dark:text-[--text-primary] shadow-2xl dark:shadow-[0px_10px_32px_#23262F] z-10 '
      }
      ref={ref}
      key={'option'}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
    >
      {ITEMS.map((item) => (
        <LinkProvider key={item.label} {...item} />
      ))}
    </motion.div>
  );
};
