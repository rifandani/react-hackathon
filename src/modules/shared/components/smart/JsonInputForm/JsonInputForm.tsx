import { JsonInput, type JsonInputProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

export type JsonInputFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<JsonInputProps, 'value' | 'defaultValue'>;

export default function JsonInputForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: JsonInputFormProps<T>) {
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
    <JsonInput
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
