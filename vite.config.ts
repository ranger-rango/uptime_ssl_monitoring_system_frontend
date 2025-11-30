import { defineConfig, loadEnv } from 'vite'
import { devtools } from '@tanstack/devtools-vite'
import viteReact from '@vitejs/plugin-react'
import { tanstackRouter } from '@tanstack/router-plugin/vite'
import { fileURLToPath, URL } from 'node:url'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  const isDev = mode === 'development';

  return {
    plugins: [
      devtools(),
      tanstackRouter({ target: 'react', autoCodeSplitting: true }),
      viteReact(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: isDev
      ? {
          proxy: {
            '/api': {
              target: env.VITE_BASE_HOST,
              changeOrigin: true,
              secure: false,
            },
          },
        }
      : undefined,
  };
});

// export default defineConfig(({ mode }) => {
//   const env = loadEnv(mode, process.cwd(), '');

//   return {
//     plugins: [
//       devtools(),
//       tanstackRouter({
//         target: 'react',
//         autoCodeSplitting: true,
//       }),
//       viteReact(),
//     ],
//     resolve: {
//       alias: {
//         '@': fileURLToPath(new URL('./src', import.meta.url)),
//       },
//     },
//     server: {
//       proxy: {
//         '/api': {
//           target: env.VITE_BASE_HOST,
//           changeOrigin: true,
//           secure: false,
//         }
//       }
//     }
//   };
// });
