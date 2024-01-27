import { cn } from '@/lib/utils';
import { CarIcon, ChevronDown, ChevronUp, Home, Medal, Plane } from 'lucide-react';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const Dropdown = () => {
  const { theme } = useTheme();

  const [isClicked, setIsClicked] = useState(false);

  return (
    <div
      className='relative flex items-center justify-center gap-x-4   cursor-pointer'
      onClick={() => setIsClicked(!isClicked)}
    >
      <p
        className={cn(
          'text-sm font-bold text-[#777E90] hover:text-black',
          theme === 'dark' && 'text-[#777E90] hover:text-white',
          isClicked && theme === 'light' && 'text-black'
        )}
      >
        Travelers
      </p>

      <div>{isClicked ? <ChevronUp className='transition' /> : <ChevronDown className='transition' />}</div>

      {isClicked && <HeaderItem />}
    </div>
  );
};

export default Dropdown;

const ITEMS = [
  { href: '/', icon: <Home />, label: 'Stays' },
  { href: '/flights', icon: <Plane />, label: 'Flights' },
  { href: '/things', icon: <Medal />, label: 'Things to do' },
  { href: '/cars', icon: <CarIcon />, label: 'Cars' },
];

const HeaderItem = () => {
  const pathname = usePathname();
  const { theme } = useTheme();

  return (
    <div
      className={cn(
        'text-black bg-white w-[250px] p-4 absolute top-16 left-[-80px] right-0 flex flex-col items-start justify-start gap-y-4 rounded-2xl transition',

        theme === 'dark' && 'bg-[#141416] text-[#777E90]'
      )}
    >
      {ITEMS.map((item) => (
        <Link
          href={item.href}
          key={item.label}
          className={cn(
            'flex items-center justify-start w-full p-2 px-6 gap-x-2 rounded-2xl transition',
            theme === 'dark' ? 'text-[#777E90] hover:text-white' : 'text-[#777E90] hover:text-black',
            pathname === item.href && theme === 'dark' && 'bg-white text-black hover:text-black',
            pathname === item.href && theme === 'light' && 'bg-[#23262F] text-white hover:text-white'
          )}
        >
          {item.icon}
          <p className='font-bold text-sm'>{item.label}</p>
        </Link>
      ))}
    </div>
  );
};
