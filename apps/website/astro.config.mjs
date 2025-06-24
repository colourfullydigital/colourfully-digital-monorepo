// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [
    react({
      include: ['**/react/*']
    })
  ],
  vite: {
    plugins: [tailwindcss()],
    server: {
      hmr: true,
      host: true
    },
    build: {
      sourcemap: true
    }
  },
  output: 'static',
  site: 'https://www.colourfully.digital',
  server: {
    port: 4321,
    host: true
  },
  devToolbar: {
    enabled: true
  }
});
