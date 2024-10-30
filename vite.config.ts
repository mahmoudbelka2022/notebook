import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// });
export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Ensures Vite binds to 0.0.0.0
    port: 3000       // Optional: Set your desired port (Render expects it)
  },
});
port: parseInt(process.env.PORT) || 3000
