import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  build:{
    chunkSizeWarningLimit:700,
    rollupOptions:{
      external:['notyf']
    }
  },
  plugins: [svelte()],
  optimizeDeps: { exclude: ["svelte-navigator"] }
})
