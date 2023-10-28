import { ChipGroup, type ChipGroupProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type ChipGroupFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<ChipGroupProps<boolean>, 'value' | 'defaultValue'>;

export default function ChipGroupForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: ChipGroupFormProps<T>) {
  const {
    field: { onChange: fieldOnChange, ref, ...field },
  } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <ChipGroup
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      {...field}
      {...props}
    />
  );
}
