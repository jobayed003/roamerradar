'use client';

import { addBlockedDates, removeBlockedDates } from '@/actions/blocked-dates';
import Layout from '@/components/ui/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useTransition } from 'react';

type BlockedItem = {
  id: string;
  startDate: string;
  endDate: string;
  note: string | null;
};

type HostCalendarClientProps = {
  listingId: string;
  listingTitle: string;
  blocked: BlockedItem[];
  booked: { startDate: string; endDate: string }[];
};

export default function HostCalendarClient({
  listingId,
  listingTitle,
  blocked,
  booked,
}: HostCalendarClientProps) {
  const { toast } = useToast();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [note, setNote] = useState('');

  const onAdd = () => {
    startTransition(async () => {
      const result = await addBlockedDates({ listingId, startDate, endDate, note });
      if ('error' in result && result.error) {
        toast({ title: result.error, variant: 'destructive' });
        return;
      }
      toast({ title: 'success' in result ? result.success : 'Dates blocked.' });
      setStartDate('');
      setEndDate('');
      setNote('');
      router.refresh();
    });
  };

  const onRemove = (id: string) => {
    startTransition(async () => {
      const result = await removeBlockedDates(id);
      if ('error' in result && result.error) {
        toast({ title: result.error, variant: 'destructive' });
        return;
      }
      toast({ title: 'success' in result ? result.success : 'Removed.' });
      router.refresh();
    });
  };

  return (
    <Layout className='lg:px-20 px-8 py-16 max-w-3xl'>
      <Link href={`/list-property?id=${listingId}`} className='inline-flex items-center text-gray_text mb-8'>
        <ChevronLeft className='h-5 w-5 mr-2' />
        Back to listing
      </Link>

      <h1 className='text-4xl font-bold mb-2'>Availability calendar</h1>
      <p className='text-gray_text mb-10'>{listingTitle}</p>

      <div className='rounded-3xl border dark:border-gray_border p-6 space-y-4 mb-10'>
        <h2 className='text-xl font-semibold'>Block dates</h2>
        <p className='text-sm text-gray_text'>
          Guests cannot book stays or cars that overlap blocked ranges.
        </p>
        <div className='grid sm:grid-cols-2 gap-3'>
          <label className='text-sm space-y-1'>
            <span className='text-gray_text'>Start</span>
            <Input type='date' value={startDate} onChange={(event) => setStartDate(event.target.value)} />
          </label>
          <label className='text-sm space-y-1'>
            <span className='text-gray_text'>End</span>
            <Input type='date' value={endDate} onChange={(event) => setEndDate(event.target.value)} />
          </label>
        </div>
        <Input
          placeholder='Optional note (maintenance, personal use…)'
          value={note}
          onChange={(event) => setNote(event.target.value)}
        />
        <Button
          className='rounded-full bg-blue hover:bg-blue-hover text-white font-bold'
          disabled={isPending || !startDate || !endDate}
          onClick={onAdd}
        >
          {isPending ? 'Saving…' : 'Block dates'}
        </Button>
      </div>

      <div className='space-y-6'>
        <section>
          <h2 className='text-xl font-semibold mb-3'>Blocked by you</h2>
          {blocked.length === 0 ? (
            <p className='text-sm text-gray_text'>No blocked ranges yet.</p>
          ) : (
            <ul className='space-y-3'>
              {blocked.map((item) => (
                <li
                  key={item.id}
                  className='flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border dark:border-gray_border p-4'
                >
                  <div>
                    <p className='font-medium'>
                      {item.startDate} → {item.endDate}
                    </p>
                    {item.note ? <p className='text-sm text-gray_text'>{item.note}</p> : null}
                  </div>
                  <Button variant='outline' className='rounded-full' disabled={isPending} onClick={() => onRemove(item.id)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section>
          <h2 className='text-xl font-semibold mb-3'>Booked by guests</h2>
          {booked.length === 0 ? (
            <p className='text-sm text-gray_text'>No paid bookings on the calendar.</p>
          ) : (
            <ul className='space-y-3'>
              {booked.map((item) => (
                <li key={`${item.startDate}-${item.endDate}`} className='rounded-2xl border dark:border-gray_border p-4'>
                  <p className='font-medium'>
                    {item.startDate.slice(0, 10)} → {item.endDate.slice(0, 10)}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </Layout>
  );
}
