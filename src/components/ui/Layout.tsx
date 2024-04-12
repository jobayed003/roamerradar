import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

const Layout = ({ children, className }: { children: ReactNode; className?: string }) => {
  return <div className={cn('w-full lg:max-w-7xl px-8 mx-auto', className)}>{children}</div>;
};

export default Layout;
