/// <reference types="vitest" />
import * as path from 'node:path';

import tsconfigPaths from 'vite-tsconfig-paths';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { configDefaults } from 'vitest/config';

export default defineConfig({
  plugins: [react(), tsconfigPaths(),],
  test: {
      alias: {
          '@constants': path.resolve(__dirname, './src/constants'),
          '@components': path.resolve(__dirname, './src/components'),
          '@pages': path.resolve(__dirname, './src/pages'),
          '@hooks': path.resolve(__dirname, './src/hooks'),
          '@root': path.resolve(__dirname, './src'),
      },
    setupFiles: ['./src/setupTest.ts'],
    globals: true,
    environment: 'jsdom',
    coverage: {
      exclude: [...configDefaults.coverage.exclude, 'dist', 'dist/**', 'src/index.tsx', '**/__*__/**',],
      provider: 'v8',
      thresholds: {
        branches: 100,
        functions: 100,
        lines: 100,
        statements: 100,
      },
    },
  },
});
