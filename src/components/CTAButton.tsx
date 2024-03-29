import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CTAButton = ({ href }: { href: string }) => {
  return (
    <Link href={'/' + href}>
      <Button
        variant={'primary'}
        size={'lg'}
        className='rounded-full text-md text-white bg-blue hover:bg-[#0142eb] transition'
      >
        Start Your Search
      </Button>
    </Link>
  );
};

export default CTAButton;
