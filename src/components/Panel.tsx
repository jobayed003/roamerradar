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
        'absolute w-auto max-h-auto mx-20 z-40 drop-shadow-xl bottom-0 left-0 right-0 bg-gradient_light dark:bg-gradient backdrop-blur-2xl rounded-3xl'
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
