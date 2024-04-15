import Link from 'next/link';
import { Social } from './Social';

type AuthWrapperProps = {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
};

const AuthWrapper = ({ children, headerLabel, backButtonLabel, backButtonHref, showSocial }: AuthWrapperProps) => {
  return (
    <div className='flex flex-col items-center gap-y-6 px-4 max-w-[600px] w-full dark:bg-dark_bg bg-[#F4F5F6] py-8 rounded-lg'>
      <h1 className='text-4xl font-bold'>{headerLabel}</h1>

      {children}

      {showSocial && <Social />}
      <Link href={backButtonHref}>
        <p className='text-xs font-poppins font-semibold'>{backButtonLabel}</p>
      </Link>
    </div>
  );
};

export default AuthWrapper;
