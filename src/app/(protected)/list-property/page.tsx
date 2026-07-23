import { getListingById } from '@/data/listing';
import { requireAuth } from '@/server/auth/require-auth';
import { ListingType } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';
import ListProperty from './_components/ListProperty';

type ListPropertyPageProps = {
  searchParams: { id?: string };
};

const ListPropertyPage = async ({ searchParams }: ListPropertyPageProps) => {
  const listingId = searchParams.id?.trim();

  if (!listingId) {
    return <ListProperty />;
  }

  const authResult = await requireAuth();
  if (!authResult.ok) {
    redirect('/auth/login');
  }

  const listing = await getListingById(listingId);

  if (
    !listing ||
    listing.type !== ListingType.STAY ||
    !listing.owner ||
    listing.owner.id !== authResult.user.id
  ) {
    notFound();
  }

  return <ListProperty initialListing={listing} />;
};

export default ListPropertyPage;
