import { FileInput, type FileInputProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type FileInputFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<FileInputProps, 'value' | 'defaultValue'>;

export default function FileInputForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  multiple,
  ...props
}: FileInputFormProps<T>) {
  const {
    field: { value, ...field },
    fieldState,
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return <FileInput error={fieldState.error?.message} {...field} {...props} />;
}
