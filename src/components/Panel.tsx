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
        'absolute w-auto max-h-auto 2xl:mx-20 mx-2 z-40 drop-shadow-xl lg:-bottom-32 -bottom-60 left-0 right-0 bg-gradient_light dark:bg-gradient backdrop-blur-2xl rounded-3xl',
        className
      )}
    >
      {children}
    </div>
  );
};

export default Panel;
