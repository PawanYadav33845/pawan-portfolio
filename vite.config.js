import { defineConfig } from 'vite'
import react from '@vitejs/react-refresh' 
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/pawan-portfolio/', 
})