import { ChevronDown, ChevronUp, Plane } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';

const Dropdown = () => {
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState('Travelers');

  return (
    <div
      className='relative group flex items-center justify-center gap-x-4 text-neutral-500 hover:text-black cursor-pointer'
      onClick={() => setIsClicked(!isClicked)}
    >
      <p className=''>Travelers</p>

      <div>{isClicked ? <ChevronUp /> : <ChevronDown />}</div>

      {isClicked && <HeaderMenus />}
    </div>
  );
};

export default Dropdown;

const HeaderMenus = () => {
  return (
    <div className='absolute top-10 left-0 right-0 flex items-center justify-center'>
      <Button variant={'ghost'} size={'lg'} className='gap-x-4 text'>
        <Plane className='w-4 h-4' /> <p>Flights</p>
      </Button>
    </div>
  );
};
