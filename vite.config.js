import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    chunkSizeWarningLimit: 1200, // extended chunk size
  },
  server: {
    host: true, // expone a la red
    port: 80  // opcional si quieres forzar puerto
  },
})
