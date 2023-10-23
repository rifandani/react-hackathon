const forms = require('@tailwindcss/forms');
const typography = require('@tailwindcss/typography');
const animate = require('tailwindcss-animate');
const defaultTheme = require('tailwindcss/defaultTheme');
const plugin = require('tailwindcss/plugin');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class', // default 'media'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Lato', ...defaultTheme.fontFamily.sans],
      },
      lineClamp: {
        7: '7',
        8: '8',
        9: '9',
        10: '10',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0px' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0px' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.3s cubic-bezier(0.87, 0, 0.13, 1)',
        'accordion-up': 'accordion-up 0.3s cubic-bezier(0.87, 0, 0.13, 1)',
      },
    },
  },
  plugins: [
    typography,
    forms,
    animate,
    plugin(({ matchUtilities }) => {
      matchUtilities({
        vg: (value) => ({
          // eslint-disable-next-line @typescript-eslint/no-unsafe-call
          [`@apply ${value.replaceAll(',', ' ')}`]: {},
        }),
      });
    }),
  ],
};
