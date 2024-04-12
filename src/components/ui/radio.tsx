import { cn } from '@/lib/utils';
import { Check } from 'lucide-react';
import { Button } from './button';

const RadioButton = ({
  showCheck,
  onChange,
  label,
}: {
  showCheck: boolean;
  onChange: (value: any) => void;
  label: string;
}) => {
  return (
    <Button className='font-semibold font-poppins px-0' variant={'transparent'} onClick={onChange}>
      <div className='border transition-all rounded-sm mr-2 hover:border-blue-hover'>
        <Check className={cn('h-6 w-6 text-white rounded-sm bg-blue transition-all', !showCheck && 'opacity-0 ')} />
      </div>
      {label}
    </Button>
  );
};

export default RadioButton;
