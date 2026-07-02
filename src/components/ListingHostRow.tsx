import Image from 'next/image';
import Link from 'next/link';
import UserProfileActions from '@/components/UserProfileActions';
import type { UserSummary } from '@/types/review';
import { getFirstLetters } from '@/lib/utils';

type ListingHostRowProps = {
  owner: UserSummary | null;
  listingId: string;
  label?: string;
};

const ListingHostRow = ({ owner, listingId, label = 'Hosted by' }: ListingHostRowProps) => {
  if (!owner) {
    return null;
  }

  const displayName = owner.displayName ?? owner.realName ?? owner.name ?? 'Host';

  return (
    <div className='flex flex-wrap items-center gap-x-2 gap-y-2 pt-2 pb-4'>
      <span className='text-gray_text'>{label}</span>
      <Link href={`/profile/${owner.id}`} className='flex items-center gap-x-2 hover:opacity-80 transition-opacity'>
        {owner.image ? (
          <Image src={owner.image} alt={displayName} width={25} height={25} className='rounded-full' />
        ) : (
          <div className='w-6 h-6 rounded-full bg-blue text-white text-[10px] flex items-center justify-center font-semibold'>
            {getFirstLetters(displayName)}
          </div>
        )}
        <p className='font-medium'>{displayName}</p>
      </Link>
      <UserProfileActions userId={owner.id} listingId={listingId} variant='compact' />
    </div>
  );
};

export default ListingHostRow;
