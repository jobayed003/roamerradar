import { getUnavailableRangesForListing } from '@/lib/listing-availability';
import { getBlockedRangesForListing } from '@/data/blocked-range';
import { db } from '@/lib/db';
import { requireAuth } from '@/server/auth/require-auth';
import { ListingType } from '@prisma/client';
import { notFound, redirect } from 'next/navigation';
import HostCalendarClient from './_components/HostCalendarClient';

type CalendarPageProps = {
  searchParams: { id?: string };
};

const HostCalendarPage = async ({ searchParams }: CalendarPageProps) => {
  const listingId = searchParams.id?.trim();
  if (!listingId) {
    redirect('/list-property');
  }

  const authResult = await requireAuth();
  if (!authResult.ok) {
    redirect('/auth/login');
  }

  const listing = await db.listing.findFirst({
    where: {
      id: listingId,
      ownerId: authResult.user.id,
      type: { in: [ListingType.STAY, ListingType.CAR] },
      placesCount: null,
    },
    select: { id: true, title: true },
  });

  if (!listing) {
    notFound();
  }

  const [ranges, blocked] = await Promise.all([
    getUnavailableRangesForListing(listing.id),
    getBlockedRangesForListing(listing.id),
  ]);

  return (
    <HostCalendarClient
      listingId={listing.id}
      listingTitle={listing.title}
      blocked={blocked.map((item) => ({
        id: item.id,
        startDate: item.startDate.toISOString().slice(0, 10),
        endDate: item.endDate.toISOString().slice(0, 10),
        note: item.note,
      }))}
      booked={ranges.booked}
    />
  );
};

export default HostCalendarPage;
