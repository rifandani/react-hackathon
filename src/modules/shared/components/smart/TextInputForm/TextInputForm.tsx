import { TextInput, type TextInputProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type TextInputFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TextInputProps, 'value'>;

export default function TextInputForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: TextInputFormProps<T>) {
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
    <TextInput
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
