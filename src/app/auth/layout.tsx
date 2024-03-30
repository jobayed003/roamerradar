import { ReactNode } from 'react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  return <div className='h-full flex items-center justify-center background-gradient'>{children}</div>;
};

export default AuthLayout;
