import { defineConfig, mergeConfig } from 'vitest/config';
import viteConfig from './vite.config';
// https://vitest.dev/config/
const vitestConfig = defineConfig({
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/test-setup.ts'],
    server: {
      deps: {
        inline: [
          /@react-spectrum\//,
          /@adobe\/react-spectrum/,
          /@spectrum-icons\/.*/,
        ],
      },
    },
    clearMocks: true,
    restoreMocks: true,
  },
});

export default mergeConfig(viteConfig, vitestConfig);
