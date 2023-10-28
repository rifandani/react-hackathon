import { DateInput, type DateInputProps } from '@mantine/dates';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type DateInputFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<DateInputProps, 'value' | 'defaultValue'>;

export default function DateInputForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: DateInputFormProps<T>) {
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
    <DateInput
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
