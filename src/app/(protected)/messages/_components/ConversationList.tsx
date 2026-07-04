'use client';

import LinkButton from '@/components/LinkButton';
import { AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn, dateFormat, getFirstLetters } from '@/lib/utils';
import type { ConversationPreview } from '@/types/conversation';
import { Avatar } from '@radix-ui/react-avatar';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { FaStar } from 'react-icons/fa';

type ConversationListProps = {
  conversations: ConversationPreview[];
  activeConversationId: string | null;
};

const ConversationList = ({ conversations, activeConversationId }: ConversationListProps) => {
  return (
    <div className='flex-1 min-h-0 flex flex-col py-4 relative bg-[#FCFCFD] dark:bg-dark_bg'>
      <div className='lg:block hidden ml-6 mb-2 shrink-0'>
        <LinkButton href='/' label='Go Home'>
          <ArrowLeft className='h-5 w-5 mr-2' />
        </LinkButton>
      </div>

      <div className='flex-1 min-h-0 overflow-y-auto px-3 sm:px-4'>
        {conversations.length === 0 ? (
          <div className='flex flex-col items-center justify-center h-full text-center text-gray_text px-4'>
            <p className='font-medium text-foreground mb-2'>No messages yet</p>
            <p className='text-sm'>Search for users above or contact a host from a listing page.</p>
          </div>
        ) : (
          <div className='flex flex-col h-full w-full gap-y-4'>
            {conversations.map((conversation) => (
              <ConversationRow
                key={conversation.id}
                conversation={conversation}
                isActive={conversation.id === activeConversationId}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const ConversationRow = ({
  conversation,
  isActive,
}: {
  conversation: ConversationPreview;
  isActive: boolean;
}) => {
  const displayName = conversation.otherUser.displayName ?? conversation.otherUser.name ?? 'User';
  const preview = conversation.lastMessage?.body ?? 'No messages yet';
  const previewDate = conversation.lastMessage?.createdAt ?? conversation.updatedAt;

  return (
    <Link
      href={`/messages/${conversation.id}`}
      className={cn(
        'flex gap-x-3 text-sm font-poppins cursor-pointer dark:hover:bg-dark_russian transition-all px-3 py-4 rounded-2xl w-full min-w-0',
        isActive && 'shadow-[0px_40px_32px_-8px_#0f0f0f1f] dark:bg-dark_russian bg-[#F4F5F6]'
      )}
    >
      <Avatar className='h-11 w-11 rounded-full shrink-0'>
        <AvatarImage src={conversation.otherUser.image ?? undefined} className='rounded-full' />
        <AvatarFallback>{getFirstLetters(displayName)}</AvatarFallback>
      </Avatar>

      <div className='flex-1 min-w-0'>
        <div className='flex justify-between gap-2 items-start'>
          <h1 className={cn('font-medium truncate', conversation.unread && 'font-bold')}>{displayName}</h1>

          <div className='flex items-center justify-center gap-x-1 shrink-0 dark:bg-dark_russian bg-[#FCFCFD] shadow-[inset_0_0_0_1px_#E6E8EC] dark:shadow-[inset_0_0_0_1px_#353945] font-semibold text-xs rounded-xl px-2 py-0.5'>
            <FaStar size={10} className='text-yellow-500' />
            <p>4.9</p>
          </div>
        </div>

        <div className='flex items-center my-1 gap-x-4 text-xs'>
          <p className='text-gray_text'>{dateFormat(new Date(previewDate))}</p>
        </div>

        <p className={cn('text-ellipsis overflow-hidden whitespace-nowrap text-gray_text', conversation.unread && 'font-semibold text-foreground')}>
          {preview}
        </p>
      </div>
    </Link>
  );
};

export default ConversationList;
