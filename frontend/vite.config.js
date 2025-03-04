import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import envCompatible from "vite-plugin-env-compatible"
// https://vitejs.dev/config/
export default defineConfig({
  envPrefix: "REACT_APP_",
  plugins: [react(),

  envCompatible(),
  ],
 /*  server: {
    port: 4000, // Set your custom port here
    strictPort: true, // Optional: Prevents Vite from auto-switching ports if 4000 is in use
  }, */
})