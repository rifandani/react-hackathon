import {
  DatePickerInput,
  type DatePickerInputProps,
  type DatePickerType,
} from '@mantine/dates';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type DatePickerInputFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<DatePickerInputProps<DatePickerType>, 'value' | 'defaultValue'>;

export default function DatePickerInputForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: DatePickerInputFormProps<T>) {
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
    <DatePickerInput
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
