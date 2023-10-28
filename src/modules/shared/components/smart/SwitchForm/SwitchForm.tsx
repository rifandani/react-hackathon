import { Switch, type SwitchProps } from '@mantine/core';
import {
  useController,
  type FieldValues,
  type UseControllerProps,
} from 'react-hook-form';
import SwitchGroupForm from './SwitchGroupForm';

type SwitchFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<SwitchProps, 'value' | 'checked' | 'defaultValue'>;

export default function SwitchForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  onChange,
  ...props
}: SwitchFormProps<T>) {
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
    <Switch
      checked={field.value}
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

SwitchForm.Group = SwitchGroupForm;
SwitchForm.Item = Switch;
