import { RadioGroup, type RadioGroupProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type RadioGroupFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<RadioGroupProps, 'value' | 'defaultValue'>;

export default function RadioGroupForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: RadioGroupFormProps<T>) {
  const {
    field: { onChange: fieldOnChange, ...field },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <RadioGroup
      error={fieldState.error?.message}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      {...field}
      {...props}
    />
  );
}
