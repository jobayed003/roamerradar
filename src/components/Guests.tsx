import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ReactNode } from 'react';

const Guests = ({ children }: { children: ReactNode }) => {
  return (
    <Popover>
      <PopoverTrigger>{children}</PopoverTrigger>
      <PopoverContent></PopoverContent>
    </Popover>
  );
};

export default Guests;
