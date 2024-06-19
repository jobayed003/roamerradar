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
      <Layout className='lg:max-w-full h-max lg:px-8 px-0'>
        <div className='grid xl:grid-cols-[396px_1fr_450px] lg:grid-cols-[min-content_1fr_350px] md:grid-cols-[max-content_1fr] grid-cols-1'>
          <User />
          <Chatbox />
          <ProductView />
        </div>
      </Layout>
    </>
  );
};

export default Messages;
