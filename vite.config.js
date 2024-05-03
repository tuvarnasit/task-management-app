import { sveltekit } from '@sveltejs/kit/vite';
import { dirname, resolve } from 'path';
import { fileURLToPath } from 'url';
import { defineConfig } from 'vite';

const _dir = dirname(fileURLToPath(import.meta.url));
export default defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $server: resolve(_dir, 'src/lib/server'),
      $assets: resolve(_dir, 'src/lib/assets'),
      $shadcn: resolve(_dir, 'src/lib/components/ui'),
      $components: resolve(_dir, 'src/lib/components'),
      $stores: resolve(_dir, 'src/lib/stores'),
      $lib: resolve(_dir, 'src/lib')
    }
  }
});
