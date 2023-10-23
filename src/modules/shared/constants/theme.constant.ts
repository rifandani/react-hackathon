import { DEFAULT_THEME, createTheme, mergeMantineTheme } from '@mantine/core';

/** Your theme configuration is merged with Mantine default theme */
export const appTheme = createTheme({
  fontFamily: 'Lato, sans-serif',
  defaultRadius: 'md',
  primaryColor: 'blue',
  colors: {
    'ocean-blue': [
      '#7AD1DD',
      '#5FCCDB',
      '#44CADC',
      '#2AC9DE',
      '#1AC2D9',
      '#11B7CD',
      '#09ADC3',
      '#0E99AC',
      '#128797',
      '#147885',
    ],
    'bright-pink': [
      '#F0BBDD',
      '#ED9BCF',
      '#EC7CC3',
      '#ED5DB8',
      '#F13EAF',
      '#F71FA7',
      '#FF00A1',
      '#E00890',
      '#C50E82',
      '#AD1374',
    ],
  },
});

export const theme = mergeMantineTheme(DEFAULT_THEME, appTheme);
