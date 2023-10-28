import {
  YearPickerInput,
  type YearPickerInputProps as $YearPickerInputProps,
  type DatePickerType,
} from '@mantine/dates';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type YearPickerInputProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<$YearPickerInputProps<DatePickerType>, 'value' | 'defaultValue'>;

export default function YearPickerInputForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: YearPickerInputProps<T>) {
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
    <YearPickerInput
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
