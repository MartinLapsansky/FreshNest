// import { defineConfig } from 'vite';
//
// export default defineConfig({
//   // other Vite configurations
//   define: {
//     'process.env.VITE_ASSETS': process.env.NODE_ENV === 'test' ? 'true' : 'false',
//   },
//   plugins: [],
// });

import { defineConfig } from 'vite';

export default defineConfig({
  // other Vite configurations
  define: {
    'process.env.VITE_ASSETS': process.env.NODE_ENV === 'test' ? 'true' : 'false',
  },
  plugins: [],
  esbuild: {
    target: 'esnext',
  },
});


