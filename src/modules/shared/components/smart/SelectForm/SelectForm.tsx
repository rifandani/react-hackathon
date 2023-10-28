import { Select, type SelectProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type SelectFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<SelectProps, 'value' | 'defaultValue'>;

export default function SelectForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: SelectFormProps<T>) {
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
    <Select
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
