import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type CustomInputProps = {
  props?: {};
  ref?: React.RefObject<HTMLInputElement>;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  type?: string;
};

const CustomInput = ({ ref, props, placeholder, className, disabled, type = 'text' }: CustomInputProps) => {
  return (
    <Input
      {...props}
      ref={ref}
      type={type}
      disabled={disabled}
      className={cn(
        'rounded-xl placeholder:text-dark_russian text-dark_russian dark:text-white dark:placeholder:text-gray_text placeholder:font-semibold py-4 focus:border-gray_text dark:focus:border-gray_text',
        className
      )}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
