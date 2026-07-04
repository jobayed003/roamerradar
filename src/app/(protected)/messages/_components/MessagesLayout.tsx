'use client';

import Layout from '@/components/ui/Layout';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { ChatMessage, ConversationListing, ConversationPreview, ConversationUser } from '@/types/conversation';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Chatbox from './Chatbox';
import ConversationList from './ConversationList';
import ProductView from './ProductView';
import UserSearch from './UserSearch';

type MessagesLayoutProps = {
  conversations: ConversationPreview[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  currentUserId: string;
  otherUser: ConversationUser | null;
  listing: ConversationListing | null;
};

const MessagesLayout = ({
  conversations,
  activeConversationId,
  messages,
  currentUserId,
  otherUser,
  listing,
}: MessagesLayoutProps) => {
  const router = useRouter();

  useEffect(() => {
    if (!activeConversationId) {
      return;
    }

    const interval = setInterval(() => {
      router.refresh();
    }, 5000);

    return () => clearInterval(interval);
  }, [activeConversationId, router]);

  return (
    <>
      <Separator className='dark:bg-dark_russian' />
      <Layout className='lg:max-w-full px-0 lg:pr-4 xl:pr-8'>
        <div
          className={cn(
            'grid min-h-[calc(100dvh-5rem)] w-full',
            activeConversationId
              ? 'grid-cols-1 md:grid-cols-[minmax(260px,320px)_minmax(0,1fr)] xl:grid-cols-[minmax(260px,320px)_minmax(0,1fr)_minmax(280px,380px)]'
              : 'grid-cols-1 md:grid-cols-[minmax(260px,320px)_minmax(0,1fr)]'
          )}
        >
          <aside className={cn('min-w-0 border-r dark:border-gray_border', activeConversationId && 'hidden md:flex md:flex-col')}>
            <UserSearch />
            <ConversationList conversations={conversations} activeConversationId={activeConversationId} />
          </aside>

          <Chatbox
            conversationId={activeConversationId}
            messages={messages}
            currentUserId={currentUserId}
            otherUser={otherUser}
            listing={listing}
            className={activeConversationId ? 'flex' : 'hidden md:flex'}
          />

          {activeConversationId && (
            <ProductView listing={listing} otherUser={otherUser} className='hidden xl:block' />
          )}
        </div>
      </Layout>
    </>
  );
};

export default MessagesLayout;
