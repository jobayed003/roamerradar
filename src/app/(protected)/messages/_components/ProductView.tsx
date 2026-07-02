import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import ListingPreviewCard from '@/components/ListingPreviewCard';
import type { ConversationListing, ConversationUser } from '@/types/conversation';
import { cn } from '@/lib/utils';
import { CalendarDays, User2 } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

type ProductViewProps = {
  listing: ConversationListing | null;
  otherUser: ConversationUser | null;
  className?: string;
};

const ProductView = ({ listing, otherUser, className }: ProductViewProps) => {
  if (!listing) {
    return (
      <aside
        className={cn(
          'border-l dark:border-gray_border min-w-0 overflow-y-auto p-6 text-center text-gray_text',
          className
        )}
      >
        <p className='text-sm'>Listing details will appear here when you message about a specific property.</p>
      </aside>
    );
  }

  const hostName = otherUser?.displayName ?? otherUser?.name ?? 'Host';
  const productPath =
    listing.type === 'STAY'
      ? `/stays-product/${listing.id}`
      : listing.type === 'CAR'
        ? `/cars-product/${listing.id}`
        : listing.type === 'FLIGHT'
          ? `/flights-product/${listing.id}`
          : `/things-product/${listing.id}`;

  return (
    <aside
      className={cn(
        'border-l dark:border-gray_border min-w-0 overflow-y-auto max-h-[calc(100dvh-5rem)] p-4 xl:p-6',
        className
      )}
    >
      <ListingPreviewCard listing={listing} />
      <div className='mt-6 min-w-0'>
        <div className='flex items-center gap-x-2 pt-2 pb-4 flex-wrap'>
          <span className='text-gray_text text-sm'>Hosted by</span>
          {otherUser?.image ? (
            <Image src={otherUser.image} alt={hostName} width={25} height={25} className='rounded-full shrink-0' />
          ) : (
            <div className='w-6 h-6 rounded-full bg-blue text-white text-[10px] flex items-center justify-center font-semibold shrink-0'>
              {hostName.charAt(0)}
            </div>
          )}
          <p className='font-medium text-sm truncate'>{hostName}</p>
        </div>

        <div className='dark:bg-dark_russian bg-[#F4F5F6] rounded-2xl'>
          <div className='flex flex-col sm:flex-row sm:flex-wrap p-2'>
            <div className='flex gap-2 items-center text-gray_text p-3 min-w-0 flex-1'>
              <CalendarDays className='shrink-0' />
              <div className='flex flex-col font-poppins min-w-0'>
                <p className='text-xs'>Inquiry</p>
                <p className='text-foreground font-medium text-sm truncate'>About this listing</p>
              </div>
            </div>

            <div className='flex gap-2 items-center text-gray_text p-3 min-w-0 flex-1'>
              <User2 className='shrink-0' />
              <div className='flex flex-col min-w-0'>
                <p className='text-xs'>Host</p>
                <p className='text-foreground font-medium text-sm truncate'>{hostName}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator className='dark:bg-dark_russian my-4' />

        <div className='flex flex-col gap-y-4 min-w-0'>
          {listing.description && (
            <p className='text-sm text-gray_text font-poppins line-clamp-6 break-words'>{listing.description}</p>
          )}

          <Link href={productPath}>
            <Button
              variant={'fill'}
              className='hover:bg-dark_russian dark:hover:bg-gray_border dark:text-white text-dark_bg-dark_russian hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold'
            >
              More details
            </Button>
          </Link>
        </div>
      </div>
    </aside>
  );
};

export default ProductView;
