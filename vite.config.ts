import replace, { RollupReplaceOptions } from '@rollup/plugin-replace';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, type PluginOption } from 'vite';
import { ManifestOptions, VitePWA, VitePWAOptions } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

const pwaOptions: Partial<VitePWAOptions> = {
  mode: 'development',
  base: '/',
  includeAssets: ['favicon.svg'],
  manifest: {
    name: 'React App',
    short_name: 'React App',
    description: 'Bulletproof React 18 SPA Template',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-192x192.png', // <== don't add slash, for testing
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/pwa-512x512.png', // <== don't remove slash, for testing
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png', // <== don't add slash, for testing
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any maskable',
      },
    ],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    /* when using generateSW the PWA plugin will switch to classic */
    type: 'module',
    navigateFallback: 'index.html',
  },
  // workbox: {
  //   globPatterns: [
  //     '**/*.{js,json,css,html,txt,svg,png,ico,webp,woff,woff2,ttf,eot,otf,wasm}',
  //   ],
  // },
};

const replaceOptions: RollupReplaceOptions = {
  __DATE__: new Date().toISOString(),
};
const sw = process.env.SW === 'true';
const claims = process.env.CLAIMS === 'true';
const reload = process.env.RELOAD_SW === 'true';
const selfDestroying = process.env.SW_DESTROY === 'true';

if (sw) {
  pwaOptions.srcDir = 'src';
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts';
  pwaOptions.strategies = 'injectManifest';
  (pwaOptions.manifest as Partial<ManifestOptions>).name =
    'PWA Inject Manifest';
  (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject';
}

if (claims) pwaOptions.registerType = 'autoUpdate';
// eslint-disable-next-line no-underscore-dangle
if (reload) replaceOptions.__RELOAD_SW__ = 'true';
if (selfDestroying) pwaOptions.selfDestroying = selfDestroying;

export default defineConfig({
  server: {
    port: 3300,
  },
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  plugins: [
    tsconfigPaths(),
    react(),
    visualizer() as unknown as PluginOption,
    VitePWA(pwaOptions),
    replace(replaceOptions) as unknown as PluginOption,
  ],
});
