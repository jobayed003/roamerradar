import Dropdown from '@/components/ui/dropdown';
import { cn } from '@/lib/utils';
import { useLanguageStore } from '@/store/useLanguageStore';
import { motion } from 'framer-motion';
import { Globe } from 'lucide-react';
import { Ref, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

const LanguageDropdown = () => {
  const { isClicked, onClose, onOpen, onOutsideClick, language, onSelect } = useLanguageStore();
  const ref = useRef(null);

  useOnClickOutside(ref, onOutsideClick);

  return (
    <Dropdown isClicked={isClicked} onOutsideClick={onOutsideClick} onClose={onClose} onOpen={onOpen}>
      <div className='flex justify-center items-center gap-x-4 text-sm font-bold'>
        <Globe className='h-4 w-4' />
        <p>Language</p>
      </div>

      {isClicked && <Language ref={ref} language={language} onSelect={onSelect} />}
    </Dropdown>
  );
};

const LANGUAGES = [
  { value: 'English', country: 'United States' },
  { value: 'Bangla', country: 'Bangladesh' },
];

type LanguageProps = {
  ref: Ref<HTMLDivElement> | undefined;
  className?: string;
  language: string;
  onSelect: (value: string) => void;
};

const Language = ({ ref, className, language, onSelect }: LanguageProps) => {
  return (
    <motion.div
      className={cn(
        'text-black w-[200px] p-4 absolute top-10 left-[-60px] right-0 items-start justify-start gap-y-4 rounded-2xl transition duration-200 dark:bg-[#141416] dark:text-white dark:hover:text-white shadow-lg  dark:bg-gradient-to-t from-[#23262F] to-[rgba(35, 38, 47, .7)]',
        className
      )}
      initial={{ y: 10 }}
      animate={{ y: 0 }}
      transition={{ duration: 0, ease: 'circIn' }}
      ref={ref}
    >
      {LANGUAGES.map((item) => (
        <div
          key={item.value}
          className={cn(
            'flex flex-col items-start justify-center p-2 px-6 gap-x-2 rounded-2xl transition text-[--text-primary] dark:text-[--text-primary] hover:bg-[#F4F5F6] dark:hover:bg-[#141416]',
            language === item.value && 'bg-[#F4F5F6] dark:bg-[#141416] '
          )}
          onClick={() => onSelect(item.value)}
        >
          <p className='font-bold text-sm text-black dark:text-white'>{item.value}</p>
          <p className='font-medium text-xs text-neutral-500'>{item.country}</p>
        </div>
      ))}
    </motion.div>
  );
};

export default LanguageDropdown;
