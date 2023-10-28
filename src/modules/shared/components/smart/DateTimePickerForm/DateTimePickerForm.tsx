import { DateTimePicker, type DateTimePickerProps } from '@mantine/dates';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type DateTimePickerFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<DateTimePickerProps, 'value' | 'defaultValue'>;

export default function DateTimePickerForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: DateTimePickerFormProps<T>) {
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
    <DateTimePicker
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
