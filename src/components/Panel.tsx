'use client';

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type PanelProps = {
  children: ReactNode;
  className?: string;
};

const Panel = ({ children, className }: PanelProps) => {
  return (
    <div
      className={cn(
        'absolute w-auto h-[200px] max-h-[200px] mx-20 z-40 bottom-0 left-0 right-0 bg-white dark:bg-[#23262F] rounded-3xl'
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
