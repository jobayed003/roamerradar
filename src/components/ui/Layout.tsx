'use client';
import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return <div className='w-full lg:max-w-7xl px-8 mx-auto'>{children}</div>;
};

export default Layout;
