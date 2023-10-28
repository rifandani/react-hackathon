import { Icon } from '@iconify/react';
import { Group, Text } from '@mantine/core';
import { Dropzone, DropzoneProps } from '@mantine/dropzone';

export function FileDropzone(props: DropzoneProps) {
  return (
    <Dropzone {...props}>
      <Group
        justify="center"
        gap="xl"
        mih={220}
        className="pointer-events-none rounded-md"
        style={{
          backgroundColor: 'var(--mantine-color-dark-5)',
        }}
      >
        <Dropzone.Accept>
          <Icon
            icon="lucide:upload"
            height="3em"
            style={{
              color: 'var(--mantine-color-blue-6)',
            }}
          />
        </Dropzone.Accept>
        <Dropzone.Reject>
          <Icon
            icon="lucide:x"
            height="3em"
            style={{
              color: 'var(--mantine-color-red-6)',
            }}
          />
        </Dropzone.Reject>
        <Dropzone.Idle>
          <Icon
            icon="lucide:image"
            height="3em"
            style={{
              color: 'var(--mantine-color-dimmed)',
            }}
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
