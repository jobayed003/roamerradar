import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';

const Chatbox = () => {
  return (
    <div className='border-r border-gray_border w-full'>
      <div></div>
      <div className='mt-8 px-4 flex w-full'>
        <Input placeholder='Enter your message' className='border-gray_border bg-transparent rounded-full py-5' />
        <div className='relative'>
          <div className='absolute right-1 top-2 p-1 bg-blue hover:bg-blue-hover rounded-full transition-all cursor-pointer'>
            <ArrowRight className='w-5 h-5' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbox;
