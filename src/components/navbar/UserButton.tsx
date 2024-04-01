import { useCurrentUser } from '@/hooks/useCurrentUser';
import { useUserStore } from '@/stores/useUserStore';
import { motion } from 'framer-motion';
import { Building2, Home, Mail, MessageCircleIcon, User2 } from 'lucide-react';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Ref, useRef } from 'react';
import { useOnClickOutside } from 'usehooks-ts';
import LinkProvider from '../LinkProvider';
import { Button } from '../ui/button';
import Dropdown from '../ui/dropdown';
import { Separator } from '../ui/separator';

const UserButton = () => {
  const { isClicked, onOpen, onClose, onOutsideClick } = useUserStore();
  const ref = useRef(null);

  const { user } = useCurrentUser();

  useOnClickOutside(ref, onOutsideClick);

  return (
    <Dropdown isClicked={isClicked} onOutsideClick={onOutsideClick} onClose={onClose} onOpen={onOpen}>
      <div className='bg-green-500 hover:bg-[#41b168] p-2 rounded-full cursor-pointer transition-all w-auto'>
        <User2 className='text-white h-6 w-6' />
      </div>

      {user && isClicked && <ProifleOptions ref={ref} />}
    </Dropdown>
  );
};

type ProfileProps = {
  ref?: Ref<HTMLDivElement> | undefined;
};

const profileLinks = [
  { label: 'Messages', href: '/messages', icon: <MessageCircleIcon /> },
  { label: 'Bookings', href: '/bookings-list', icon: <Home /> },
  { label: 'Wishlists', href: '/wishlists', icon: <Mail /> },
];

const ProifleOptions = ({ ref }: ProfileProps) => {
  return (
    <motion.div
      className={
        'text-black w-[250px] p-4 absolute top-20 sm:-left-[9.4rem] -left-[5rem] items-start justify-start gap-y-4 rounded-3xl dark:text-white dark:hover:text-white bg-background dark:bg-[#141416] z-50 shadow-custom'
      }
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      ref={ref}
    >
      {profileLinks.map((item) => (
        <LinkProvider key={item.href} {...item} />
      ))}
      <Separator />
      <LinkProvider href='/list-property' icon={<Building2 />} label='List your property' />

      <div className='flex justify-center gap-x-2 mt-4'>
        <Link href={'/account-settings'}>
          <Button variant={'fill'} className='text-white bg-blue hover:bg-blue-hover py-4 px-6'>
            Account
          </Button>
        </Link>
        <Button variant={'fill'} className='py-4 px-6' onClick={() => signOut()}>
          Log out
        </Button>
      </div>
    </motion.div>
  );
};

export default UserButton;
