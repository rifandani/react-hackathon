import { Input, type InputProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type InputFormProps<T extends FieldValues> = UseControllerProps<T> & InputProps;

export default function InputForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  ...props
}: InputFormProps<T>) {
  const { field, fieldState } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return <Input error={fieldState.error?.message} {...field} {...props} />;
}
