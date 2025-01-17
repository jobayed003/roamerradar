'use client';

import LinkButton from '@/components/LinkButton';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useCurrentUser } from '@/hooks/useCurrentUser';
import { cn, getFirstLetters } from '@/lib/utils';
import { Avatar } from '@radix-ui/react-avatar';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import Chatbox from './Chatbox';

const User = () => {
  const [isClicked, setIsClicked] = useState(false);
  const { user } = useCurrentUser();

  return (
    <div className='py-8 border-r dark:border-gray_border relative bg-[#FCFCFD] dark:bg-dark_bg'>
      <div className='lg:block md:hidden block ml-8'>
        <LinkButton href='/' label='Go Home'>
          <ArrowLeft className='h-5 w-5 mr-2' />
        </LinkButton>
      </div>
      <div className='lg:hidden md:flex hidden justify-center items-center'>
        <ArrowLeft className='h-5 w-8 mr-2' />
      </div>

      <div className='mt-4 h-[calc(100vh-210px)] overflow-y-auto px-4 pl-8 '>
        <div className='flex flex-col h-full w-full gap-y-4'>
          {Array.from({ length: 4 }).map((_, idx) => (
            <ChatUser key={idx} />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {isClicked && (
          <motion.div
            className='absolute top-0 z-50 bg-dark_bg h-full md:hidden block py-8'
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 200 }}
            transition={{ duration: 0.2, ease: 'easeInOut' }}
          >
            <div className='lg:block md:hidden block ml-6' onClick={() => setIsClicked(false)}>
              <LinkButton href={`/messages/${user?.id}`} label='Host'>
                <ArrowLeft className='h-5 w-5 mr-2' />
              </LinkButton>
            </div>
            <div>
              <Chatbox userId={user?.id!} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ChatUser = () => {
  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className={cn(
        'flex gap-x-4 text-sm font-poppins cursor-pointer dark:hover:bg-dark_russian dark:hover:shadow-[0px_40px_32px_-8px_#0f0f0f1f] transition-all px-3 py-6 rounded-2xl lg:max-w-[300px]',
        isClicked && 'shadow-[0px_40px_32px_-8px_#0f0f0f1f]'
      )}
      onClick={() => setIsClicked(!isClicked)}
    >
      <Avatar className='h-12 w-12 rounded-full'>
        <AvatarImage src={'/user.jpg'} className='rounded-full' />
        <AvatarFallback>{getFirstLetters('John Doe')}</AvatarFallback>
      </Avatar>

      <div className='xl:block md:hidden block w-full'>
        <div className='flex justify-between'>
          <h1 className='font-medium'>John Marston</h1>

          <div className='flex items-center justify-center w-12 gap-x-1 ml-6 dark:bg-dark_russian bg-[#FCFCFD] shadow-[inset_0_0_0_1px_#E6E8EC] dark:shadow-[inset_0_0_0_1px_#353945] font-semibold text-xs rounded-xl'>
            <FaStar size={12} className='text-yellow-500' />
            <p>4.9</p>
          </div>
        </div>

        <div className='flex items-center my-2 gap-x-4 text-xs'>
          <p className='text-gray_text'>25 May, 2024</p>
        </div>

        <p className='text-ellipsis overflow-hidden whitespace-nowrap max-w-[200px]'>Thanks. It means a lot to me.</p>
      </div>
    </div>
  );
};

export default User;
