'use client';

import { cn } from '@/lib/utils';
import { ReactNode, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';

type DropdownProps = {
  isClicked: boolean;
  children: ReactNode;
  onClose: () => void;
  onOpen: () => void;
  onOutsideClick: () => void;
};

const Dropdown = ({ isClicked, onClose, onOpen, onOutsideClick, children }: DropdownProps) => {
  const ref = useRef(null);

  useOnClickOutside(ref, onOutsideClick);

  return (
    <div
      className={cn(
        'relative flex items-center justify-center gap-x-4 cursor-pointer text-gray_text hover:text-black transition dark:hover:text-white ',
        isClicked && 'text-black dark:text-white'
      )}
      onClick={isClicked ? onClose : onOpen}
      ref={ref}
    >
      {children}
    </div>
  );
};

export default Dropdown;
