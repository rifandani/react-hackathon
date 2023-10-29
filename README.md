# React Template for Hackathon

## Features

React Hackathon Template built with:

- `vite` + `typescript` + `eslint` + `prettier` -> development productivity
- `tailwindcss` + `tailwindcss-animate` + `tailwind-merge` + `daisyui` -> easy styling
- `@formkit/auto-animate` -> automate transition animation when component mount/unmount/changed
- `axios` + `@tanstack/react-query` -> server state management + data fetching (the only reason I use axios is because it supports upload progress)
- `zod` -> runtime schema validation
- `@iconify-icon/react` -> SVG icon on demand
- `react-hook-form` -> form management
- `zustand` -> performant global state
- `@mantine/core` + `@mantine/notifications` + `@mantine/dates` + `@mantine/spotlight` -> adaptive, accessible and robust styled UI components
- `typesafe-i18n` -> i18n, supports for "en" & "id" locales
- `type-fest` -> collection of useful type helpers
- `@mantine/hooks` -> collection of useful react custom hooks
- `@rifandani/nxact-yutiriti` -> collection of useful utils
- `dayjs` -> collection of useful date utils (required if when we use `@mantine/dates`)
- `firebase` + `reactfire` -> fullstack capability using firebase free services such as firestore, storage, realtime database, auth, remote config, hosting, and firebase emulator suite.
- `vite-plugin-pwa` + `@vite-pwa/assets-generator` + `@rollup/plugin-replace` + `https-localhost` + `workbox-core` + `workbox-precaching` + `workbox-routing` + `workbox-window` -> Progressive Web App (PWA)

## Development

Rename `.env.development.example` to `.env.development`.
Rename `.env.production.example` to `.env.production`.

We use firebase free services to accelerate the short development. We also running firebase emulators suite UI in development. Currently we only use free services such as: "firestore", "storage", "database", and "auth". Paid services such as: "functions", "pubsub" and "eventarc" are not included.

When we start firebase emulator, it will try to import the seed data from `./firebase-data` folder. And when we stop the server, it will try to update & export your latest data to `./firebase-data` folder.

To start, install and then run the app.

```bash
# install deps
$ pnpm install

# running firebase emulators concurrently with the app seems to not work correctly
# so we need to run it in separate terminal

# Runs the app with PWA + sync with i18n changes
$ pnpm on:dev
# Runs the firebase emulator in another terminal
$ pnpm emu:start
```

## Build

```bash
# build app in "production" mode
$ pnpm build
```

## Start

PWA relies on [https-localhost](https://github.com/daquinoaldo/https-localhost) to serve the dist files on https://localhost/.
Please refer to it's docs for the steps to setup your local environment.

```bash
# build and serve using https
pnpm start
```

Open up https://localhost/, then restart the server, you will see a notification ask you to restart reload the offline content.

## Deployment

We supports deployment to Vercel and Firebase Hosting. We recommends using firebase hosting.
Check out `firebase.json` for Firebase Hosting. Check out `vercel.json` for Vercel.
