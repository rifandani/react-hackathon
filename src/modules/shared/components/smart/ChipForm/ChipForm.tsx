import { Chip, type ChipProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import ChipGroupForm from './ChipGroupForm';

type ChipFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<ChipProps, 'value' | 'defaultValue'>;

export default function ChipForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: ChipFormProps<T>) {
  const {
    field: { onChange: fieldOnChange, ...field },
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <Chip
      checked={field.value}
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      {...field}
      {...props}
    />
  );
}

ChipForm.Group = ChipGroupForm;
ChipForm.Item = Chip;
