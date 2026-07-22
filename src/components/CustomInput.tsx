import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { ComponentProps } from 'react';

type CustomInputProps = {
  props?: ComponentProps<'input'>;
  ref?: React.RefObject<HTMLInputElement>;
  placeholder: string;
  className?: string;
  disabled?: boolean;
  type?: string;
  value?: string;
  onChange?: ComponentProps<'input'>['onChange'];
};

const CustomInput = ({
  ref,
  props,
  placeholder,
  className,
  disabled,
  type = 'text',
  value,
  onChange,
}: CustomInputProps) => {
  return (
    <Input
      {...props}
      ref={ref}
      type={type}
      disabled={disabled}
      value={value}
      onChange={onChange}
      className={cn(
        'rounded-xl placeholder:text-dark_russian text-dark_russian dark:text-white dark:placeholder:text-gray_text placeholder:font-semibold py-4 focus:border-gray_text dark:focus:border-gray_text',
        className
      )}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;
