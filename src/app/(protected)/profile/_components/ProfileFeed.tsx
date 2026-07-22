'use client';

import { createComment, createPost, deleteComment, deletePost } from '@/actions/posts';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import type { PostWithDetails } from '@/data/post';
import { resizeImageFile } from '@/lib/image-utils';
import { cn, getFirstLetters } from '@/lib/utils';
import type { ListingItem } from '@/types/listing';
import { formatDistanceToNow } from 'date-fns';
import { ImagePlus, Trash2, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';
import ProfileReviews from './ProfileReviews';

type ProfileFeedProps = {
  currentUserId?: string;
  isOwner: boolean;
  posts: PostWithDetails[];
  listings: ListingItem[];
};

function displayName(user: {
  displayName: string | null;
  name: string | null;
  realName: string | null;
}) {
  return user.displayName || user.realName || user.name || 'Traveler';
}

const ProfileFeed = ({ currentUserId, isOwner, posts, listings }: ProfileFeedProps) => {
  const [tab, setTab] = useState<'Posts' | 'Listings' | 'Reviews'>('Posts');
  const tabs = ['Posts', 'Listings', 'Reviews'] as const;

  return (
    <div className='mb-8 space-y-6'>
      <div className='flex flex-wrap items-center gap-2 font-bold text-sm'>
        {tabs.map((item) => (
          <Button
            key={item}
            className={cn(
              'rounded-full transition-all px-4 h-8 font-bold text-sm text-gray_text dark:text-gray_text dark:hover:text-white hover:text-black',
              tab === item &&
                'dark:text-background text-background bg-gray_border dark:bg-foreground hover:text-background dark:hover:text-background'
            )}
            variant='transparent'
            onClick={() => setTab(item)}
          >
            {item}
            {item === 'Posts' ? ` (${posts.length})` : item === 'Listings' ? ` (${listings.length})` : ''}
          </Button>
        ))}
      </div>

      {tab === 'Posts' && <PostsPanel currentUserId={currentUserId} isOwner={isOwner} posts={posts} />}
      {tab === 'Listings' && <ListingsPanel listings={listings} isOwner={isOwner} />}
      {tab === 'Reviews' && <ProfileReviews />}
    </div>
  );
};

const PostsPanel = ({
  currentUserId,
  isOwner,
  posts,
}: {
  currentUserId?: string;
  isOwner: boolean;
  posts: PostWithDetails[];
}) => {
  return (
    <div className='space-y-6'>
      {isOwner && <PostComposer />}
      {posts.length === 0 ? (
        <p className='text-gray_text text-sm'>
          {isOwner ? 'Share your first post with travelers.' : 'No posts yet.'}
        </p>
      ) : (
        posts.map((post) => (
          <PostCard key={post.id} post={post} currentUserId={currentUserId} isOwner={isOwner} />
        ))
      )}
    </div>
  );
};

const PostComposer = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [body, setBody] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();

  const onSubmit = () => {
    startTransition(async () => {
      const result = await createPost({ body, image });

      if ('error' in result && result.error) {
        toast({ title: result.error, variant: 'destructive' });
        return;
      }

      setBody('');
      setImage(null);
      toast({ title: 'success' in result ? result.success : 'Post shared.' });
      router.refresh();
    });
  };

  return (
    <div className='rounded-3xl border border-gray_border p-4 space-y-3'>
      <Textarea
        value={body}
        onChange={(event) => setBody(event.target.value)}
        placeholder='Share an update with travelers…'
        className='min-h-[96px] rounded-2xl border-2 border-[#e6e8ec] dark:border-gray_border resize-none'
      />
      {image && (
        <div className='relative h-40 w-full max-w-sm overflow-hidden rounded-2xl'>
          <Image src={image} alt='Post attachment' fill className='object-cover' unoptimized />
          <button
            type='button'
            className='absolute top-2 right-2 rounded-full bg-black/70 p-1 text-white'
            onClick={() => setImage(null)}
          >
            <X className='h-4 w-4' />
          </button>
        </div>
      )}
      <div className='flex items-center justify-between gap-3'>
        <label className='inline-flex items-center gap-2 text-sm text-gray_text cursor-pointer'>
          <ImagePlus className='h-4 w-4' />
          Photo
          <input
            type='file'
            accept='image/*'
            className='hidden'
            onChange={async (event) => {
              const file = event.target.files?.[0];
              event.target.value = '';
              if (!file) return;
              try {
                setImage(await resizeImageFile(file, 1200, 0.82));
              } catch (error) {
                toast({
                  title: error instanceof Error ? error.message : 'Unable to upload image.',
                  variant: 'destructive',
                });
              }
            }}
          />
        </label>
        <Button
          className='rounded-full bg-blue hover:bg-blue-hover text-white px-6'
          disabled={isPending || !body.trim()}
          onClick={onSubmit}
        >
          {isPending ? 'Posting…' : 'Post'}
        </Button>
      </div>
    </div>
  );
};

const PostCard = ({
  post,
  currentUserId,
  isOwner,
}: {
  post: PostWithDetails;
  currentUserId?: string;
  isOwner: boolean;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [isPending, startTransition] = useTransition();
  const name = displayName(post.author);

  const onDeletePost = () => {
    startTransition(async () => {
      const result = await deletePost(post.id);
      if ('error' in result && result.error) {
        toast({ title: result.error, variant: 'destructive' });
        return;
      }
      toast({ title: 'Post deleted.' });
      router.refresh();
    });
  };

  const onAddComment = () => {
    startTransition(async () => {
      const result = await createComment({ postId: post.id, body: comment });
      if ('error' in result && result.error) {
        toast({ title: result.error, variant: 'destructive' });
        return;
      }
      setComment('');
      toast({ title: 'Comment added.' });
      router.refresh();
    });
  };

  return (
    <article className='rounded-3xl border border-gray_border p-4 sm:p-5 space-y-4'>
      <div className='flex items-start justify-between gap-3'>
        <div className='flex items-center gap-3 min-w-0'>
          <Avatar>
            <AvatarImage src={post.author.image ?? undefined} />
            <AvatarFallback>{getFirstLetters(name)}</AvatarFallback>
          </Avatar>
          <div className='min-w-0'>
            <p className='font-semibold truncate'>{name}</p>
            <p className='text-xs text-gray_text'>
              {formatDistanceToNow(new Date(post.createdAt), { addSuffix: true })}
            </p>
          </div>
        </div>
        {isOwner && (
          <Button variant='transparent' size='icon' onClick={onDeletePost} disabled={isPending}>
            <Trash2 className='h-4 w-4 text-gray_text' />
          </Button>
        )}
      </div>

      <p className='whitespace-pre-wrap text-sm sm:text-base'>{post.body}</p>

      {post.image && (
        <div className='relative w-full h-56 sm:h-72 overflow-hidden rounded-2xl'>
          <Image
            src={post.image}
            alt='Post image'
            fill
            className='object-cover'
            unoptimized={post.image.startsWith('data:')}
          />
        </div>
      )}

      {post.listing && (
        <Link
          href={`/stays-product/${post.listing.id}`}
          className='flex gap-3 rounded-2xl border border-gray_border overflow-hidden hover:bg-muted/40 transition'
        >
          <div className='relative h-24 w-24 shrink-0'>
            <Image
              src={post.listing.image}
              alt={post.listing.title}
              fill
              className='object-cover'
              unoptimized={post.listing.image.startsWith('data:')}
            />
          </div>
          <div className='py-3 pr-3 min-w-0'>
            <p className='text-[10px] uppercase tracking-wide text-gray_text font-semibold'>Listing</p>
            <p className='font-semibold truncate'>{post.listing.title}</p>
            {post.listing.location && <p className='text-xs text-gray_text truncate'>{post.listing.location}</p>}
            <p className='text-sm font-medium mt-1'>
              ${post.listing.offerPrice ?? post.listing.price}
            </p>
          </div>
        </Link>
      )}

      <div className='space-y-3 border-t border-gray_border pt-3'>
        <p className='text-xs font-semibold text-gray_text'>{post.comments.length} comments</p>
        {post.comments.map((item) => {
          const commentName = displayName(item.author);
          return (
            <div key={item.id} className='flex gap-3'>
              <Avatar className='h-8 w-8'>
                <AvatarImage src={item.author.image ?? undefined} />
                <AvatarFallback>{getFirstLetters(commentName)}</AvatarFallback>
              </Avatar>
              <div className='flex-1 min-w-0 rounded-2xl bg-muted/40 dark:bg-dark_russian px-3 py-2'>
                <div className='flex items-center justify-between gap-2'>
                  <p className='text-sm font-semibold truncate'>{commentName}</p>
                  {(item.author.id === currentUserId || isOwner) && (
                    <button
                      type='button'
                      className='text-gray_text hover:text-foreground'
                      onClick={() => {
                        startTransition(async () => {
                          const result = await deleteComment(item.id);
                          if ('error' in result && result.error) {
                            toast({ title: result.error, variant: 'destructive' });
                            return;
                          }
                          router.refresh();
                        });
                      }}
                    >
                      <Trash2 className='h-3.5 w-3.5' />
                    </button>
                  )}
                </div>
                <p className='text-sm whitespace-pre-wrap'>{item.body}</p>
              </div>
            </div>
          );
        })}

        <div className='flex gap-2'>
          <Textarea
            value={comment}
            onChange={(event) => setComment(event.target.value)}
            placeholder='Write a comment…'
            className='min-h-[44px] h-[44px] rounded-full border-2 border-[#e6e8ec] dark:border-gray_border resize-none py-2.5 px-4'
          />
          <Button
            className='rounded-full bg-blue hover:bg-blue-hover text-white shrink-0'
            disabled={isPending || !comment.trim()}
            onClick={onAddComment}
          >
            Reply
          </Button>
        </div>
      </div>
    </article>
  );
};

const ListingsPanel = ({ listings, isOwner }: { listings: ListingItem[]; isOwner: boolean }) => {
  if (listings.length === 0) {
    return (
      <div className='space-y-3'>
        <p className='text-gray_text text-sm'>
          {isOwner ? 'You have not listed any properties yet.' : 'No listings on this profile.'}
        </p>
        {isOwner && (
          <Link href='/list-property' className='text-blue text-sm font-medium'>
            List a property →
          </Link>
        )}
      </div>
    );
  }

  return (
    <div className='grid sm:grid-cols-2 gap-4'>
      {listings.map((listing) => (
        <Link
          key={listing.id}
          href={`/stays-product/${listing.id}`}
          className='rounded-3xl border border-gray_border overflow-hidden hover:shadow-md transition'
        >
          <div className='relative h-40 w-full'>
            <Image
              src={listing.image}
              alt={listing.title}
              fill
              className='object-cover'
              unoptimized={listing.image.startsWith('data:')}
            />
          </div>
          <div className='p-4 space-y-1'>
            <h3 className='font-semibold line-clamp-2'>{listing.title}</h3>
            {listing.location && <p className='text-xs text-gray_text truncate'>{listing.location}</p>}
            <p className='text-sm font-medium'>${listing.offerPrice ?? listing.price}</p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProfileFeed;
