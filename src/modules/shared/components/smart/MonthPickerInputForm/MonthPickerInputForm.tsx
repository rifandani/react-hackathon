import {
  MonthPickerInput,
  type DatePickerType,
  type MonthPickerInputProps,
} from '@mantine/dates';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type MonthPickerInputFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<MonthPickerInputProps<DatePickerType>, 'value' | 'defaultValue'>;

export default function MonthPickerInputForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: MonthPickerInputFormProps<T>) {
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
    <MonthPickerInput
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
