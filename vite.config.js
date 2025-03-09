import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/act5/',  // Ensure this matches your GitHub Pages subfolder
  plugins: [react()],
});
