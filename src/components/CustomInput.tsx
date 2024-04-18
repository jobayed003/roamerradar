import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type CustomInputProps = {
  props?: {};
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
        'rounded-xl placeholder:text-dark_russian text-dark_russian dark:text-white dark:placeholder:text-gray_text placeholder:font-semibold py-4 focus:border-gray_text dark:focus:border-gray_text',
        className
      )}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
