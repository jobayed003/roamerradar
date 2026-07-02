'use client';

import { findUsers } from '@/actions/messages';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';
import { getContactHref } from '@/components/UserProfileActions';
import { getFirstLetters } from '@/lib/utils';
import type { UserSummary } from '@/types/review';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, useTransition } from 'react';

const UserSearch = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<UserSummary[]>([]);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const timeout = setTimeout(() => {
      startTransition(async () => {
        const response = await findUsers(query);

        if ('users' in response && response.users) {
          setResults(response.users);
        } else {
          setResults([]);
        }
      });
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  return (
    <div className='px-3 sm:px-4 pt-4 pb-2 shrink-0'>
      <div className='relative'>
        <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray_text' />
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder='Search users to message...'
          className='pl-9 rounded-full dark:border-gray_border bg-transparent'
        />
      </div>

      {query.trim().length >= 2 && (
        <div className='mt-3 rounded-2xl border dark:border-gray_border overflow-hidden bg-background dark:bg-dark_bg'>
          {isPending ? (
            <p className='px-4 py-3 text-sm text-gray_text'>Searching...</p>
          ) : results.length === 0 ? (
            <p className='px-4 py-3 text-sm text-gray_text'>No users found</p>
          ) : (
            results.map((user) => {
              const displayName = user.displayName ?? user.realName ?? user.name ?? 'User';

              return (
                <Link
                  key={user.id}
                  href={getContactHref(user.id)}
                  className='flex items-center gap-3 px-4 py-3 hover:bg-[#F4F5F6] dark:hover:bg-dark_russian transition-colors border-b last:border-b-0 dark:border-gray_border'
                >
                  <Avatar className='h-9 w-9 rounded-full'>
                    <AvatarImage src={user.image ?? undefined} className='rounded-full' />
                    <AvatarFallback>{getFirstLetters(displayName)}</AvatarFallback>
                  </Avatar>
                  <div className='min-w-0 flex-1'>
                    <p className='font-medium text-sm truncate'>{displayName}</p>
                    <p className='text-xs text-gray_text'>Start a conversation</p>
                  </div>
                </Link>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};

export default UserSearch;
