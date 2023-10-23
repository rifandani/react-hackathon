# React App

React app built with:

- `vite` + `typescript` + `eslint` + `prettier` -> development productivity
- `vitest` + `@testing-library/react` -> unit test, integration test, coverage
- `msw` -> API response mocking for tests
- `tailwindcss` + `tailwindcss-animate` + `tailwind-merge` + `daisyui` -> easy styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount
- `axios` + `@tanstack/react-query` -> server state management + data fetching
- `zod` -> runtime schema validation
- `@iconify-icon/react` -> SVG icon on demand
- `react-hook-form` -> form management
- `zustand` -> performant global state
- `@mantine/core` + `@mantine/notifications` + `@mantine/dates` -> adaptive, accessible and robust styled UI components
- `typesafe-i18n` -> i18n, supports for "en" & "id" locales
- `type-fest` -> collection of useful type helpers
- `@mantine/hooks` + `ahooks` -> collection of useful react custom hooks
- `@rifandani/nxact-yutiriti` -> collection of useful utils
- `dayjs` -> collection of useful date utils (required if when we use `@mantine/dates`)
- `vite-plugin-pwa` + `@vite-pwa/assets-generator` + `@rollup/plugin-replace` + `https-localhost` + `workbox-core` + `workbox-precaching` + `workbox-routing` + `workbox-window` -> Progressive Web App (PWA)

## Development

Rename `.env.development.example` to `.env.development`.
Rename `.env.staging.example` to `.env.staging`.
Rename `.env.production.example` to `.env.production`.

```bash
# install deps
$ pnpm install

# Runs the app + PWA
$ pnpm dev
```

## Testing

```bash
# run test
$ pnpm test

# coverage with instanbul
$ pnpm test:coverage
```

## Build

```bash
# build app in "staging" mode
$ pnpm build:staging

# build app in "production" mode
$ pnpm build
```

## Start

PWA relies on [https-localhost](https://github.com/daquinoaldo/https-localhost) to serve the dist files on https://localhost/.
Please refer to it's docs for the steps to setup your local environment.

```bash
pnpm start
```

Open up https://localhost/, then restart the server, you will see a notification ask you to restart reload the offline content.

## Deployment

For now only supports deployment to Vercel.
Check out `vercel.json` file fo further details.

## Notes

- [ ] fix unit tests
