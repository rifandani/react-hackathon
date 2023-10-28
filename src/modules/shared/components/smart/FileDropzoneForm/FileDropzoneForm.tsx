import { Icon } from '@iconify/react';
import { Group, Text } from '@mantine/core';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';
import {
  FieldValues,
  UseControllerProps,
  useController,
} from 'react-hook-form';
import classes from './FileDropzoneForm.module.css';

type FileDropzoneFormProps<T extends FieldValues> = UseControllerProps<T> &
  Omit<DropzoneProps, 'onDrop'>;

export default function FileDropzoneForm<T extends FieldValues>({
  name,
  control,
  defaultValue,
  rules,
  shouldUnregister,
  multiple,
  ...props
}: FileDropzoneFormProps<T>) {
  const { field } = useController<T>({
    name,
    control,
    defaultValue,
    rules,
    shouldUnregister,
  });

  return (
    <Dropzone
      name={field.name}
      disabled={field.disabled}
      onDrop={(files) => {
        field.onChange(files);
      }}
      {...props}
    >
      <Group justify="center" gap="xl" mih={220} className={classes.group}>
        <Dropzone.Accept>
          <Icon
            icon="lucide:upload"
            height="3em"
            className={classes['icon-accept']}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <Icon
            icon="lucide:x"
            height="3em"
            className={classes['icon-reject']}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <Icon
            icon="lucide:image"
            height="3em"
            className={classes['icon-idle']}
          />
        </Dropzone.Idle>

        <div>
          <Text size="xl" inline>
            Drag images here or click to select files
          </Text>
          <Text size="sm" c="dimmed" inline mt={7}>
            Attach as many files as you like, each file should not exceed 5MB
          </Text>
        </div>
      </Group>
    </Dropzone>
  );
}
