'use client';

import { fetchMessages, markAsRead } from '@/actions/messages';
import Layout from '@/components/ui/Layout';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import type { ChatMessage, ConversationListing, ConversationPreview, ConversationUser } from '@/types/conversation';
import { useCallback, useEffect, useRef, useState } from 'react';
import Chatbox from './Chatbox';
import ConversationList from './ConversationList';
import ProductView from './ProductView';
import UserSearch from './UserSearch';

const POLL_MS = 2500;

type MessagesLayoutProps = {
  conversations: ConversationPreview[];
  activeConversationId: string | null;
  messages: ChatMessage[];
  currentUserId: string;
  otherUser: ConversationUser | null;
  listing: ConversationListing | null;
};

function toClientMessage(message: ChatMessage): ChatMessage {
  return {
    ...message,
    createdAt: message.createdAt instanceof Date ? message.createdAt : new Date(message.createdAt),
  };
}

const MessagesLayout = ({
  conversations,
  activeConversationId,
  messages,
  currentUserId,
  otherUser,
  listing,
}: MessagesLayoutProps) => {
  const [liveMessages, setLiveMessages] = useState(() => messages.map(toClientMessage));
  const markedReadRef = useRef<string | null>(null);
  const pollingRef = useRef(false);
  const latestCreatedAtRef = useRef<string | undefined>(undefined);

  useEffect(() => {
    const next = messages.map(toClientMessage);
    setLiveMessages(next);
    latestCreatedAtRef.current = next[next.length - 1]
      ? new Date(next[next.length - 1].createdAt).toISOString()
      : undefined;
  }, [messages, activeConversationId]);

  useEffect(() => {
    latestCreatedAtRef.current = liveMessages[liveMessages.length - 1]
      ? new Date(liveMessages[liveMessages.length - 1].createdAt).toISOString()
      : undefined;
  }, [liveMessages]);

  useEffect(() => {
    if (!activeConversationId) {
      markedReadRef.current = null;
      return;
    }

    if (markedReadRef.current === activeConversationId) {
      return;
    }

    markedReadRef.current = activeConversationId;
    void markAsRead(activeConversationId);
  }, [activeConversationId]);

  const mergeIncoming = useCallback((incoming: ChatMessage[]) => {
    if (incoming.length === 0) return;

    setLiveMessages((current) => {
      const byId = new Map(current.map((message) => [message.id, message]));
      for (const message of incoming) {
        byId.set(message.id, toClientMessage(message));
      }
      return Array.from(byId.values()).sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );
    });
  }, []);

  useEffect(() => {
    if (!activeConversationId) {
      return;
    }

    let cancelled = false;

    const poll = async () => {
      if (cancelled || pollingRef.current) return;
      if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;

      pollingRef.current = true;
      try {
        const result = await fetchMessages(activeConversationId, latestCreatedAtRef.current);

        if (cancelled || 'error' in result || !result.messages) {
          return;
        }

        mergeIncoming(
          result.messages.map((message) => ({
            id: message.id,
            body: message.body,
            senderId: message.senderId,
            createdAt: new Date(message.createdAt),
          }))
        );
      } finally {
        pollingRef.current = false;
      }
    };

    const interval = window.setInterval(() => {
      void poll();
    }, POLL_MS);

    const onVisible = () => {
      if (document.visibilityState === 'visible') {
        void poll();
      }
    };

    document.addEventListener('visibilitychange', onVisible);

    return () => {
      cancelled = true;
      window.clearInterval(interval);
      document.removeEventListener('visibilitychange', onVisible);
    };
  }, [activeConversationId, mergeIncoming]);

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
            messages={liveMessages}
            currentUserId={currentUserId}
            otherUser={otherUser}
            listing={listing}
            className={activeConversationId ? 'flex' : 'hidden md:flex'}
            onLocalMessagesChange={setLiveMessages}
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
