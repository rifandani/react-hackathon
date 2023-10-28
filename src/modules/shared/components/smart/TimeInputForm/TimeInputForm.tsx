import { TimeInput, type TimeInputProps } from '@mantine/dates';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type TimeInputFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<TimeInputProps, 'value' | 'defaultValue'>;

export default function TimeInputForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: TimeInputFormProps<T>) {
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
    <TimeInput
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
