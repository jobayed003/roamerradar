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
        'rounded-xl placeholder:text-[#23262F] text-[#23262F] dark:text-white dark:placeholder:text-gray_text placeholder:font-semibold py-4 focus:border-gray_text dark:focus:border-gray_text',
        className
      )}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
