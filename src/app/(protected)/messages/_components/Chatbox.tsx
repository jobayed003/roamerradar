'use client';

import { sendMessage } from '@/actions/messages';
import ListingPreviewCard from '@/components/ListingPreviewCard';
import { Input } from '@/components/ui/input';
import { cn, dateFormat, getFirstLetters } from '@/lib/utils';
import type { ChatMessage, ConversationListing, ConversationUser } from '@/types/conversation';
import { format } from 'date-fns';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { FormEvent, useEffect, useRef, useState, useTransition } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

type ChatboxProps = {
  className?: string;
  conversationId: string | null;
  messages: ChatMessage[];
  currentUserId: string;
  otherUser: ConversationUser | null;
  listing: ConversationListing | null;
};

const Chatbox = ({ className, conversationId, messages, currentUserId, otherUser, listing }: ChatboxProps) => {
  const [draft, setDraft] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!conversationId) {
    return (
      <div
        className={cn(
          'w-full min-w-0 border-r dark:border-gray_border min-h-[calc(100dvh-5rem)] items-center justify-center text-gray_text',
          className
        )}
      >
        <p>Select a conversation to start messaging</p>
      </div>
    );
  }

  const displayName = otherUser?.displayName ?? otherUser?.name ?? 'User';

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    if (!draft.trim() || isPending) {
      return;
    }

    setError(null);

    startTransition(async () => {
      const result = await sendMessage(conversationId, draft);

      if (result.error) {
        setError(result.error);
        return;
      }

      setDraft('');
      router.refresh();
    });
  };

  const groupedMessages = groupMessagesByDate(messages);

  return (
    <div
      className={cn(
        'w-full min-w-0 flex-col border-r dark:border-gray_border min-h-[calc(100dvh-5rem)] max-h-[calc(100dvh-5rem)] overflow-hidden',
        className
      )}
    >
      <div className='flex items-center gap-3 px-4 sm:px-6 py-3 border-b dark:border-gray_border shrink-0'>
        <Link href='/messages' className='flex items-center gap-2 text-sm font-medium md:hidden shrink-0'>
          <ArrowLeft className='h-4 w-4' />
        </Link>
        {otherUser?.id ? (
          <Link href={`/profile/${otherUser.id}`} className='flex items-center gap-3 min-w-0'>
            <Avatar className='h-10 w-10 rounded-full shrink-0'>
              <AvatarImage src={otherUser.image ?? undefined} className='rounded-full' />
              <AvatarFallback>{getFirstLetters(displayName)}</AvatarFallback>
            </Avatar>
            <h2 className='font-semibold truncate hover:text-blue-hover transition-colors'>{displayName}</h2>
          </Link>
        ) : (
          <div className='flex items-center gap-3 min-w-0'>
            <Avatar className='h-10 w-10 rounded-full shrink-0'>
              <AvatarFallback>{getFirstLetters(displayName)}</AvatarFallback>
            </Avatar>
            <h2 className='font-semibold truncate'>{displayName}</h2>
          </div>
        )}
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 flex flex-col gap-y-4'>
        {listing && <ListingPreviewCard listing={listing} compact className='w-full max-w-lg mx-auto shrink-0' />}
        {messages.length === 0 ? (
          <p className='text-center text-gray_text text-sm'>No messages yet. Say hello!</p>
        ) : (
          groupedMessages.map((group) => (
            <div key={group.dateKey} className='flex flex-col gap-y-4'>
              <p className='text-xs font-semibold text-center'>{group.dateLabel}</p>
              {group.messages.map((message) => (
                <MessageBox
                  key={message.id}
                  isSender={message.senderId === currentUserId}
                  message={message.body}
                  createdAt={message.createdAt}
                  senderImage={otherUser?.image}
                  senderName={displayName}
                />
              ))}
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className='shrink-0 px-4 sm:px-6 py-3 flex w-full items-center gap-2 border-t dark:border-gray_border bg-background dark:bg-dark_bg'>
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          placeholder='Enter your message'
          disabled={isPending}
          className='dark:border-gray_border bg-transparent rounded-full py-5 min-w-0'
        />
        <button
          type='submit'
          disabled={isPending || !draft.trim()}
          className='shrink-0 p-2 bg-blue hover:bg-blue-hover disabled:opacity-50 text-white rounded-full transition-all cursor-pointer'
        >
          <ArrowRight className='w-5 h-5' />
        </button>
      </form>
      {error && <p className='px-4 pb-3 text-sm text-red-500 shrink-0'>{error}</p>}
    </div>
  );
};

const MessageBox = ({
  isSender = false,
  message,
  createdAt,
  senderImage,
  senderName,
}: {
  isSender?: boolean;
  message: string;
  createdAt: Date;
  senderImage?: string | null;
  senderName: string;
}) => {
  return (
    <div className={cn('flex flex-col w-full', isSender ? 'items-end' : 'items-start')}>
      <div className={cn('flex gap-x-2 sm:gap-x-3 max-w-[85%] sm:max-w-[75%]', isSender && 'flex-row-reverse')}>
        {!isSender &&
          (senderImage ? (
            <Image src={senderImage} width={32} height={32} alt={senderName} className='w-8 h-8 rounded-full shrink-0' />
          ) : (
            <div className='w-8 h-8 rounded-full bg-blue text-white text-xs flex items-center justify-center font-semibold shrink-0'>
              {getFirstLetters(senderName)}
            </div>
          ))}
        <div
          className={cn(
            'px-4 sm:px-5 py-3 rounded-[24px] break-words text-sm sm:text-base',
            isSender ? 'dark:bg-blue bg-blue text-white' : 'bg-[#F4F5F6] dark:bg-dark_russian'
          )}
        >
          {message}
        </div>
      </div>
      <div className={cn('mt-1 text-gray_light font-semibold text-xs', isSender ? 'pr-1' : 'pl-10')}>
        {format(new Date(createdAt), 'h:mm aaa')}
      </div>
    </div>
  );
};

function groupMessagesByDate(messages: ChatMessage[]) {
  const groups: { dateKey: string; dateLabel: string; messages: ChatMessage[] }[] = [];

  for (const message of messages) {
    const dateKey = format(new Date(message.createdAt), 'yyyy-MM-dd');
    const existing = groups.find((group) => group.dateKey === dateKey);

    if (existing) {
      existing.messages.push(message);
    } else {
      groups.push({
        dateKey,
        dateLabel: dateFormat(new Date(message.createdAt)),
        messages: [message],
      });
    }
  }

  return groups;
}

export default Chatbox;
