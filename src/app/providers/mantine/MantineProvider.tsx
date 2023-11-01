import '@mantine/carousel/styles.css';
import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import '@mantine/dropzone/styles.css';
import '@mantine/spotlight/styles.css';
import { theme } from '@shared/constants/theme.constant';
import { PropsWithChildren } from 'react';

export default function AppMantineProvider({ children }: PropsWithChildren) {
  return (
    <MantineProvider defaultColorScheme="auto" theme={theme}>
      {children}
    </MantineProvider>
  );
}
