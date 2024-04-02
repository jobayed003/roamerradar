import Link from 'next/link';
import { Button } from '../ui/button';

const LinkButton = ({ href, label }: { href: string; label: string }) => {
  return (
    <Link href={href}>
      <Button
        variant={'fill'}
        className='hover:bg-[#23262F] dark:hover:bg-[#353945] dark:text-white text-[#23262F] hover:text-white border-0 shadow-[0_0_0_2px_#E6E8EC_inset] hover:shadow-[0_0_0_2px_#23262F_inset] dark:shadow-[inset_0_0_0_2px_#353945] transition-none duration-200 transition-all font-bold'
      >
        {label}
      </Button>
    </Link>
  );
};

export default LinkButton;
