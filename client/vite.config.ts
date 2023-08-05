import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// const HOST = '0.0.0.0'; // IP or hostname the vue dev server should be bound to (0.0.0.0 uses 'localhost" and your external ip)
// const PORT = '8080'; // port for the vue proxy server
// const HTTPS = process.env.VUE_ENV_HTTPS == 'true' ? true : false; // enable or disable https for the vue proxy server
// const PFX = ''; // PKCS12 ksystore for ssl certificate
// const PFX_PASSPHRASE = ''; // passphrase for ssl keystore
const SERVER_URL = 'http://localhost:4000'; // host where the spring boot server is running / target of the proxy server

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   proxy: {
  //     '/^/api/.*': {
  //       target: 'http://localhost:4000',
  //       changeOrigin: true,
  //       secure: false,
  //       ws: true,
  //     },
  //   },
  // },
  server: {
    // host: HOST,
    // port: PORT,
    // https: {
    //   pfx: PFX,
    //   passphrase: PFX_PASSPHRASE,
    // },
    proxy: {
      '^/api/.*': {
        target: SERVER_URL,
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ''),
        // ssl: {
        //   pfx: PFX,
        //   passphrase: PFX_PASSPHRASE,
        // },
      },
    },
  },
});
