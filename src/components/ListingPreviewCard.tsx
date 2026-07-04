import Image from 'next/image';
import Link from 'next/link';
import type { ConversationListing } from '@/types/conversation';
import { cn } from '@/lib/utils';

type ListingPreviewCardProps = {
  listing: ConversationListing;
  className?: string;
  compact?: boolean;
};

const ListingPreviewCard = ({ listing, className, compact = false }: ListingPreviewCardProps) => {
  const productPath =
    listing.type === 'STAY'
      ? `/stays-product/${listing.id}`
      : listing.type === 'CAR'
        ? `/cars-product/${listing.id}`
        : listing.type === 'FLIGHT'
          ? `/flights-product/${listing.id}`
          : `/things-product/${listing.id}`;

  const displayPrice = listing.offerPrice ?? listing.price;

  return (
    <Link
      href={productPath}
      className={cn(
        'block rounded-2xl border dark:border-gray_border overflow-hidden hover:shadow-md transition-shadow bg-[#F4F5F6] dark:bg-dark_russian',
        className
      )}
    >
      <div className={cn('flex', compact ? 'flex-row items-center' : 'flex-col')}>
        <div className={cn('relative shrink-0', compact ? 'w-[88px] h-[88px] sm:w-24 sm:h-24' : 'w-full h-36')}>
          <Image src={listing.image} alt={listing.title} fill className='object-cover' sizes='96px' />
        </div>
        <div className='p-3 sm:p-4 flex flex-col gap-0.5 min-w-0 flex-1 overflow-hidden'>
          <p className='text-[10px] uppercase tracking-wide text-gray_text font-semibold'>Listing inquiry</p>
          <h3 className='font-bold text-sm leading-snug line-clamp-2'>{listing.title}</h3>
          {listing.location && <p className='text-xs text-gray_text truncate'>{listing.location}</p>}
          {displayPrice > 0 && (
            <p className='text-sm font-semibold'>
              ${displayPrice}
              <span className='text-xs font-normal text-gray_text'> / listing</span>
            </p>
          )}
          <span className='text-xs text-blue font-medium'>View listing →</span>
        </div>
      </div>
    </Link>
  );
};

export default ListingPreviewCard;
