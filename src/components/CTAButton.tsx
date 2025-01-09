import { Button } from '@/components/ui/button';
import Link from 'next/link';

const CTAButton = ({ link }: { link: string }) => {
  return (
    <Link href={link}>
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
