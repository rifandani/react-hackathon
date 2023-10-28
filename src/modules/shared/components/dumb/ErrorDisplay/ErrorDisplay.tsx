import { Icon } from '@iconify/react';
import { Alert, Code } from '@mantine/core';
import { ComponentPropsWithoutRef } from 'react';

interface Props {
  error: Error;
  alert?: ComponentPropsWithoutRef<typeof Alert>;
}

export default function ErrorDisplay({ error, alert }: Props) {
  return (
    <Alert
      color="red"
      variant="light"
      title="Error"
      icon={<Icon icon="lucide:badge-x" />}
      {...alert}
    >
      <Code block>{JSON.stringify(error, null, 2)}</Code>
    </Alert>
  );
}
