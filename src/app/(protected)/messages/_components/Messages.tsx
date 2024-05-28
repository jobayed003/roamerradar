'use client';

import Layout from '@/components/ui/Layout';
import { Separator } from '@/components/ui/separator';
import Chatbox from './Chatbox';
import ProductView from './ProductView';
import User from './User';

const Messages = () => {
  return (
    <>
      <Separator className='dark:bg-dark_russian' />
      <Layout className='lg:max-w-full'>
        <div className='grid grid-cols-[396px_1fr_496px]'>
          <User />
          <Chatbox />
          <ProductView />
        </div>
      </Layout>
    </>
  );
};

export default Messages;
