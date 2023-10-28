import { NativeSelect, type NativeSelectProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type NativeSelectFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<NativeSelectProps, 'value' | 'defaultValue'>;

export default function NativeSelectForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: NativeSelectFormProps<T>) {
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
    <NativeSelect
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
