import { Radio, type RadioProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import RadioGroupForm from './RadioGroupForm';

type RadioFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<RadioProps, 'value' | 'defaultValue'>;

export default function RadioForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: RadioFormProps<T>) {
  const {
    field: { onChange: fieldOnChange, ...field },
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <Radio
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      {...field}
      {...props}
    />
  );
}

RadioForm.Group = RadioGroupForm;
RadioForm.Item = Radio;
