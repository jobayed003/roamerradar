'use client';

import { toggleWishlist } from '@/actions/wishlist';
import { useToast } from '@/components/ui/use-toast';
import { cn } from '@/lib/utils';
import { Heart } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type WishlistButtonProps = {
  listingId: string;
  initialSaved?: boolean;
  className?: string;
};

export function WishlistButton({ listingId, initialSaved = false, className }: WishlistButtonProps) {
  const [saved, setSaved] = useState(initialSaved);
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const router = useRouter();

  const onToggle = () => {
    startTransition(async () => {
      const result = await toggleWishlist({ listingId });

      if ('error' in result && result.error) {
        toast({
          title: result.error,
          description: result.error.includes('Sign in') ? 'Log in to save places you like.' : undefined,
        });
        if (result.error.includes('Sign in')) {
          router.push(`/auth/login?callbackUrl=${encodeURIComponent(window.location.pathname)}`);
        }
        return;
      }

      if ('saved' in result) {
        setSaved(result.saved);
        toast({ title: result.success });
      }
    });
  };

  return (
    <button
      type='button'
      aria-label={saved ? 'Remove from wishlist' : 'Save to wishlist'}
      disabled={isPending}
      onClick={onToggle}
      className={cn(
        'w-10 h-10 flex items-center justify-center rounded-full border-2 dark:border-gray_border hover:border-[#353945] group transition-all hover:bg-[#353945] cursor-pointer disabled:opacity-60',
        className
      )}
    >
      <Heart
        className={cn(
          'w-5 h-5 transition-colors',
          saved ? 'fill-red-500 text-red-500' : 'text-gray_text group-hover:text-[#FCFCFD]'
        )}
      />
    </button>
  );
}
