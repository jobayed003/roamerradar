'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import type { ProfileReviewItem } from '@/data/review';
import { cn, getFirstLetters } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';
import Link from 'next/link';
import { useState } from 'react';
import { FaStar } from 'react-icons/fa';

type ProfileReviewsProps = {
  aboutYou: ProfileReviewItem[];
  byYou: ProfileReviewItem[];
};

const ProfileReviews = ({ aboutYou, byYou }: ProfileReviewsProps) => {
  const [selected, setSelected] = useState<'about' | 'by'>('about');
  const reviews = selected === 'about' ? aboutYou : byYou;

  return (
    <div className='mb-8'>
      <div className='flex items-center justify-between my-8 gap-4 flex-wrap'>
        <h1 className='text-2xl font-semibold sm:block hidden'>
          {reviews.length} {reviews.length === 1 ? 'review' : 'reviews'}
        </h1>

        <div className='flex items-center gap-x-2 font-bold text-sm'>
          <Button
            className={cn(
              'rounded-full transition-all px-4 h-7 font-bold text-sm text-gray_text dark:text-gray_text dark:hover:text-white hover:text-black py-1',
              selected === 'about' &&
                'dark:text-background text-background bg-gray_border dark:bg-foreground hover:text-background dark:hover:text-background'
            )}
            variant={'transparent'}
            onClick={() => setSelected('about')}
          >
            Reviews about you ({aboutYou.length})
          </Button>
          <Button
            className={cn(
              'rounded-full transition-all px-4 h-7 font-bold text-sm text-gray_text dark:text-gray_text dark:hover:text-white hover:text-black py-1',
              selected === 'by' &&
                'dark:text-background text-background bg-gray_border dark:bg-foreground hover:text-background dark:hover:text-background'
            )}
            variant={'transparent'}
            onClick={() => setSelected('by')}
          >
            Reviews by you ({byYou.length})
          </Button>
        </div>
      </div>
      <Separator />

      <div className='flex flex-col gap-y-3 mt-8'>
        {reviews.length === 0 ? (
          <p className='text-gray_text text-sm py-4'>
            {selected === 'about'
              ? 'No reviews on your listings yet.'
              : 'You have not written any reviews yet.'}
          </p>
        ) : (
          reviews.map((review, idx) => (
            <div key={review.id}>
              <ReviewRow review={review} />
              {idx !== reviews.length - 1 && <Separator className='my-4' />}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

function ReviewRow({ review }: { review: ProfileReviewItem }) {
  const name =
    review.user.displayName || review.user.realName || review.user.name || 'Traveler';

  return (
    <div className='flex gap-x-4 mb-4'>
      <Avatar className='h-16 w-16'>
        <AvatarImage src={review.user.image ?? undefined} />
        <AvatarFallback>{getFirstLetters(name)}</AvatarFallback>
      </Avatar>

      <div className='flex flex-col min-w-0'>
        <div className='flex flex-wrap items-center gap-2 mb-1'>
          <h1 className='font-medium'>{name}</h1>
          <span className='flex items-center gap-1 text-xs text-gray_text'>
            <FaStar className='text-yellow-500' />
            {review.rating}
          </span>
        </div>
        <p className='dark:text-gray_text text-gray_border mb-2'>{review.body}</p>
        <div className='flex flex-wrap gap-x-2 items-center text-sm'>
          <p className='text-gray_text text-xs'>
            {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
          </p>
          <Link
            href={`/${review.listing.type === 'STAY' ? 'stays' : review.listing.type === 'CAR' ? 'cars' : review.listing.type === 'EXPERIENCE' ? 'things' : 'flights'}-product/${review.listing.id}`}
            className='text-blue text-xs font-semibold hover:underline'
          >
            {review.listing.title}
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ProfileReviews;
