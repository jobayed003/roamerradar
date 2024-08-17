import { Input } from '@/components/ui/input';
import { cn, dateFormat } from '@/lib/utils';
import { format } from 'date-fns';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

const Chatbox = ({ className }: { className?: string }) => {
  // const previousDate =
  const date = dateFormat(new Date());

  return (
    <div
      className={cn('w-full grid-rows-[1fr_100px] border-r dark:border-gray_border h-full overflow-hidden', className)}
    >
      <div className='flex flex-col gap-y-4 p-12 overflow-y-auto max-h-[calc(100vh-150px)]'>
        <p className='text-xs font-semibold text-center'>{date}</p>
        <MessageBox
          isSender
          message={
            'Described by Queenstown Hose & Garden magazine as having one of the best views we&apos;ve ever seen you will love.'
          }
        />
        <MessageBox message={'Hlw, How are you doing?'} />
        <MessageBox message={'I would like to ask something.'} />
        <MessageBox isSender message={'Hi John, how are you?'} />
      </div>
      <div className='mt-6 px-4 flex w-full'>
        <Input placeholder='Enter your message' className='dark:border-gray_border bg-transparent rounded-full py-5' />
        <div className='relative'>
          <div className='absolute right-1 top-2 p-1 bg-blue hover:bg-blue-hover text-white rounded-full transition-all cursor-pointer'>
            <ArrowRight className='w-5 h-5' />
          </div>
        </div>
      </div>
    </div>
  );
};

const MessageBox = ({ isSender = false, message }: { isSender?: boolean; message: string }) => {
  return (
    <div className={cn('flex flex-col', !isSender && 'self-end')}>
      <div className='flex gap-x-4'>
        {isSender && (
          <Image src='/user.jpg' width={32} height={32} alt='sender image' className='w-8 h-8 rounded-full ' />
        )}
        <div
          className={cn(
            'bg-[#F4F5F6] dark:bg-dark_russian px-6 py-4 rounded-[32px]',
            !isSender && 'dark:bg-blue bg-blue text-white'
          )}
        >
          {message}
        </div>
      </div>
      {isSender && (
        <div className='self-end mt-4 text-gray_light font-semibold text-xs'>{format(new Date(), 'h:mm aaa')}</div>
      )}
    </div>
  );
};

export default Chatbox;
