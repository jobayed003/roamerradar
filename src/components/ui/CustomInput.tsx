import { cn } from '@/lib/utils';
import { Input } from './input';

type CustomInputProps = {
  props: {};
  placeholder: string;
  className?: string;
  type?: string;
};

const CustomInput = ({ props, placeholder, className, type = 'text' }: CustomInputProps) => {
  return (
    <Input
      {...props}
      type={type}
      className={cn(
        'outline-none ring-0 focus-visible:ring-transparent focus-visible:ring-offset-0 rounded-xl placeholder:text-[#23262F] text-[#23262F] dark:text-white dark:placeholder:text-[#B1B5C3] py-4',
        className
      )}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
