/// <reference types="vitest" />
import { sentryVitePlugin } from '@sentry/vite-plugin';
import { defineConfig } from 'vite';
import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

export default defineConfig({
  plugins: [
    react(),
    svgr({ include: '**/*.svg' }),
    sentryVitePlugin({
      org: 'cleeng',
      project: 'mediastore-sdk',
      authToken: process.env.SENTRY_AUTH_TOKEN,
      // disable: mode !== 'production',
      reactComponentAnnotation: { enabled: true }
    })
  ],
  build: {
    target: 'es2015',
    cssCodeSplit: true,
    lib: {
      entry: {
        'cleeng-mediastore-sdk': path.resolve(__dirname, 'src/package.ts'),
        'styles/msdFont': path.resolve(__dirname, 'src/styles/msdFont.css'),
        'cleeng-script': path.resolve(__dirname, 'src/scripts/index.js')
      },
      name: '@cleeng/mediastore-sdk',
      formats: ['es']
    },
    rollupOptions: {
      external: ['react', 'react-redux', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-redux': 'reactRedux',
          'styled-components': 'styled-components'
        }
      }
    },
    sourcemap: true
  },
  resolve: {
    alias: {
      test: path.resolve(__dirname, './test'),
      components: path.resolve(__dirname, './src/components'),
      containers: path.resolve(__dirname, './src/containers'),
      appRedux: path.resolve(__dirname, './src/appRedux'),
      util: path.resolve(__dirname, './src/util'),
      styles: path.resolve(__dirname, './src/styles'),
      assets: path.resolve(__dirname, './src/assets'),
      services: path.resolve(__dirname, './src/services'),
      api: path.resolve(__dirname, './src/api'),
      hooks: path.resolve(__dirname, './src/hooks'),
      i18NextInit: path.resolve(__dirname, './src/i18NextInit.js'),
      scripts: path.resolve(__dirname, './src/scripts'),
      types: path.resolve(__dirname, './src/types')
    }
  },
  test: {
    globals: true,
    include: ['**/*.test.{js,jsx,ts,tsx}', '**/*.spec.{js,jsx,ts,tsx}'],
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts']
  }
});
