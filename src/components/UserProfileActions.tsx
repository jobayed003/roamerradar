import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { MessageCircle, User2 } from 'lucide-react';
import { cn } from '@/lib/utils';

export function getContactHref(userId: string, listingId?: string) {
  const base = `/messages/contact/${userId}`;
  return listingId ? `${base}?listing=${listingId}` : base;
}

type UserProfileActionsProps = {
  userId: string;
  listingId?: string;
  variant?: 'default' | 'compact' | 'inline';
  className?: string;
};

const UserProfileActions = ({
  userId,
  listingId,
  variant = 'default',
  className,
}: UserProfileActionsProps) => {
  const contactHref = getContactHref(userId, listingId);

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-x-3 text-xs', className)}>
        <Link href={`/profile/${userId}`} className='text-blue hover:text-blue-hover font-medium'>
          View profile
        </Link>
        <Link href={contactHref} className='text-blue hover:text-blue-hover font-medium'>
          Message
        </Link>
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={cn('flex items-center gap-x-2', className)}>
        <Button asChild variant='transparent' className='h-8 px-2 text-xs font-semibold'>
          <Link href={`/profile/${userId}`}>
            <User2 className='h-3.5 w-3.5 mr-1' />
            Profile
          </Link>
        </Button>
        <Button asChild variant='transparent' className='h-8 px-2 text-xs font-semibold text-blue'>
          <Link href={contactHref}>
            <MessageCircle className='h-3.5 w-3.5 mr-1' />
            Message
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <div className={cn('flex gap-x-3', className)}>
      <Button asChild variant='fill' className='font-bold'>
        <Link href={contactHref}>
          <MessageCircle className='h-4 w-4 mr-2' />
          Message
        </Link>
      </Button>
      <Button asChild variant='fill' className='font-bold bg-transparent shadow-[inset_0_0_0_2px_#E6E8EC] dark:shadow-[inset_0_0_0_2px_#353945]'>
        <Link href={`/profile/${userId}`}>
          <User2 className='h-4 w-4 mr-2' />
          View profile
        </Link>
      </Button>
    </div>
  );
};

export default UserProfileActions;
