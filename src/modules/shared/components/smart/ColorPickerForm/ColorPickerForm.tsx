import { ColorPicker, type ColorPickerProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';

type ColorPickerFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<ColorPickerProps, 'value' | 'defaultValue'>;

export default function ColorPickerForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: ColorPickerFormProps<T>) {
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
    <ColorPicker
      onChange={(e) => {
        fieldOnChange(e);
        onChange?.(e);
      }}
      {...field}
      {...props}
    />
  );
}
