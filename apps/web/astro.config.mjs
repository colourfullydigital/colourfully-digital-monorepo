// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  vite: {
    // @ts-ignore - Tailwind CSS plugin type compatibility issue
    plugins: [tailwindcss()]
  }
});