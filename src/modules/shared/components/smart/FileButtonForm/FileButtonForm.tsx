import { FileButton, type FileButtonProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type FileButtonFormProps<T extends FieldValues> = UseControllerProps<T> &
  FileButtonProps;

export default function FileButtonForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  multiple,
  ...props
}: FileButtonFormProps<T>) {
  const {
    field: { value, ...field },
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return <FileButton {...field} {...props} />;
}
