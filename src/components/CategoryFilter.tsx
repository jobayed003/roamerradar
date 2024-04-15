import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';

const CategoryFilter = ({
  filters,
  selectItems,
  className,
}: {
  filters: string[];
  selectItems: string[];
  className?: string;
}) => {
  const [selected, setSelected] = useState(filters[0]);

  return (
    <div className='py-8'>
      <Separator className='bg-gray_border' />

      <div className={cn('flex justify-between md:flex-row flex-col gap-y-4 items-center mt-8', className)}>
        <div className='lg:flex hidden gap-x-2'>
          {filters.map((item) => (
            <div
              key={item.length}
              onClick={() => setSelected(item)}
              className={cn(
                'rounded-full px-2 py-1 font-bold text-sm bg-transparent text-gray_text dark:text-gray_text dark:hover:text-white hover:text-black transition-all select-none cursor-pointer',
                selected === item &&
                  'dark:text-background text-background bg-gray_border dark:bg-foreground hover:text-background dark:hover:text-background hover:dark:text-dark_russian'
              )}
            >
              {item}
            </div>
          ))}
        </div>

        <div className='lg:hidden md:w-auto w-full'>
          <Select>
            <SelectTrigger className='md:w-[180px] w-full focus:ring-0 focus:ring-offset-0 ring-offset-0 font-bold dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec] border-0 rounded-xl'>
              <SelectValue placeholder={filters[0]} />
            </SelectTrigger>
            <SelectContent className='font-bold dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec] border-0 rounded-xl [&_option]:hover:bg-red'>
              {filters.map((item) => (
                <SelectItem key={item.length} value={item}>
                  {item}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className='md:w-auto w-full md:max-w-64'>
          <Select>
            <SelectTrigger className='md:w-64 w-full focus:ring-0 focus:ring-offset-0 ring-offset-0 font-bold dark:shadow-[inset_0_0_0_2px_#353945] shadow-[inset_0_0_0_2px_#e6e8ec] border-0 rounded-xl'>
              <SelectValue placeholder={selectItems[0]} />
            </SelectTrigger>
            <SelectContent className='font-bold shadow-[inset_0_0_0_2px_#353945] border-0 rounded-xl [&_option]:hover:bg-red'>
              {selectItems.map((item) => (
                <SelectItem key={item.length} value={item}>
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
