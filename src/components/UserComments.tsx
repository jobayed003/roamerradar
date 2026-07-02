'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import UserProfileActions from '@/components/UserProfileActions';
import { getFirstLetters } from '@/lib/utils';
import type { ReviewItem } from '@/types/review';
import Link from 'next/link';
import { formatDistanceToNow } from 'date-fns';
import { FaStar } from 'react-icons/fa';

type UserCommentsProps = {
  review: ReviewItem;
  listingId: string;
};

export const UserComments = ({ review, listingId }: UserCommentsProps) => {
  const displayName = review.user.displayName ?? review.user.realName ?? review.user.name ?? 'User';

  return (
    <div className='flex gap-x-4 border-b dark:border-gray_border py-5 text-sm font-poppins'>
      <Link href={`/profile/${review.user.id}`}>
        <Avatar className='h-12 w-12 hover:opacity-80 transition-opacity'>
          <AvatarImage src={review.user.image ?? undefined} />
          <AvatarFallback>{getFirstLetters(displayName)}</AvatarFallback>
        </Avatar>
      </Link>

      <div className='w-full'>
        <div className='flex flex-wrap justify-between gap-2'>
          <Link href={`/profile/${review.user.id}`} className='font-medium hover:text-blue-hover transition-colors'>
            {displayName}
          </Link>

          <div className='flex gap-x-1'>
            {Array.from({ length: 5 }).map((_, index) => (
              <FaStar
                key={index}
                size={16}
                className={index < review.rating ? 'text-yellow-500' : 'text-gray_text'}
              />
            ))}
          </div>
        </div>

        <p className='mt-2 text-gray_light'>{review.body}</p>

        <div className='flex flex-wrap items-center gap-x-4 gap-y-2 text-xs mt-3'>
          <p className='text-gray_text'>{formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}</p>
          <UserProfileActions userId={review.user.id} listingId={listingId} variant='inline' />
        </div>
      </div>
    </div>
  );
};
