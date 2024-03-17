import { Popover, PopoverContent } from '@/components/ui/popover';
import { useState } from 'react';

const Locations = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverContent>Place content for the popover here.</PopoverContent>
      </Popover>
    </div>
  );
};

export default Locations;
