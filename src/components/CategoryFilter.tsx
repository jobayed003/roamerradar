'use client';

import { findFilterLabel, findSortLabel, toFilterSlug } from '@/lib/listing-filters';
import { cn } from '@/lib/utils';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import { useEffect, useMemo, useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

type CategoryFilterProps = {
  filters: string[];
  selectItems: string[];
  className?: string;
  /** Chip filter query key. Default `filter`. Use `q` for wishlists. */
  filterParam?: string;
  /** Sort query key. Default `sort`. Pass `null` to keep sort display-only for wishlist. */
  sortParam?: string | null;
  /** Keep existing URL params (`q`, `from`, …). Default true. */
  preserveQuery?: boolean;
  /** Skip URL writes; only fire callbacks (flights). */
  clientOnly?: boolean;
  onFilterChange?: (filter: string) => void;
  onSortChange?: (sort: string) => void;
};

const CategoryFilter = ({
  filters,
  selectItems,
  className,
  filterParam = 'filter',
  sortParam = 'sort',
  preserveQuery = true,
  clientOnly = false,
  onFilterChange,
  onSortChange,
}: CategoryFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const urlFilter = findFilterLabel(filters, searchParams.get(filterParam));
  const urlSort = findSortLabel(selectItems, sortParam ? searchParams.get(sortParam) : null);

  const [selected, setSelected] = useState(clientOnly ? filters[0] ?? '' : urlFilter);
  const [sort, setSort] = useState(clientOnly ? selectItems[0] ?? '' : urlSort);

  useEffect(() => {
    if (clientOnly) return;
    setSelected(urlFilter);
    setSort(urlSort);
  }, [clientOnly, urlFilter, urlSort]);

  const currentQuery = useMemo(() => {
    if (!preserveQuery) return {} as Record<string, string>;
    const query: Record<string, string> = {};
    searchParams.forEach((value, key) => {
      query[key] = value;
    });
    return query;
  }, [preserveQuery, searchParams]);

  const pushParams = (nextFilter: string, nextSort: string) => {
    if (clientOnly) return;

    const query: Record<string, string | undefined> = {
      ...currentQuery,
      [filterParam]: filterParam === 'q' ? nextFilter.toLowerCase() : toFilterSlug(nextFilter),
    };

    if (sortParam) {
      query[sortParam] = toFilterSlug(nextSort);
    }

    const url = qs.stringifyUrl(
      { url: pathname, query },
      { skipEmptyString: true, skipNull: true }
    );
    router.push(url);
  };

  const chooseFilter = (value: string) => {
    setSelected(value);
    onFilterChange?.(value);
    pushParams(value, sort);
  };

  const chooseSort = (value: string) => {
    setSort(value);
    onSortChange?.(value);
    if (sortParam || clientOnly) {
      pushParams(selected, value);
    }
  };

  return (
    <div className='py-8'>
      <Separator className='bg-gray_border' />

      <div className={cn('flex justify-between md:flex-row flex-col gap-y-4 items-center mt-8', className)}>
        <div className='lg:flex hidden gap-x-2'>
          {filters.map((item) => (
            <button
              type='button'
              key={item}
              onClick={() => chooseFilter(item)}
              className={cn(
                'rounded-full px-2 py-1 font-bold text-sm bg-transparent text-gray_text dark:text-gray_text dark:hover:text-white hover:text-black transition-all select-none cursor-pointer',
                selected === item &&
                  'dark:text-background text-background bg-gray_border dark:bg-foreground hover:text-background dark:hover:text-background hover:dark:text-dark_russian'
              )}
            >
              {item}
            </button>
          ))}
        </div>

        <div className='lg:hidden md:w-auto w-full'>
          <Select value={selected} onValueChange={chooseFilter}>
            <SelectTrigger className='md:w-[180px] w-full focus:ring-0 focus:ring-offset-0 ring-offset-0 font-bold dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec] border-0 rounded-xl'>
              <SelectValue placeholder={filters[0]} />
            </SelectTrigger>
            <SelectContent className='font-bold dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec] border-0 rounded-xl'>
              {filters.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='md:w-auto w-full md:max-w-64'>
          <Select value={sort} onValueChange={chooseSort}>
            <SelectTrigger className='md:w-64 w-full focus:ring-0 focus:ring-offset-0 ring-offset-0 font-bold dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec] border-0 rounded-xl'>
              <SelectValue placeholder={selectItems[0]} />
            </SelectTrigger>
            <SelectContent className='font-bold shadow-[inset_0_0_0_2px_#353945] border-0 rounded-xl bg-dark_bg'>
              {selectItems.map((item) => (
                <SelectItem key={item} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default CategoryFilter;
