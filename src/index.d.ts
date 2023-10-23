import { DefaultMantineColor, MantineColorsTuple } from '@mantine/core';
import 'react';

declare module 'react' {
  interface CSSProperties {
    [key: `--${string}`]: string | number;
  }
}

type ExtendedCustomColors = 'ocean-blue' | 'bright-pink' | DefaultMantineColor;

declare module '@mantine/core' {
  export interface MantineThemeColorsOverride {
    colors: Record<ExtendedCustomColors, MantineColorsTuple>;
  }
}
