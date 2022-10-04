import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vitejs.dev/config/
export default defineConfig({
  optimizeDeps:{
    include:['@stand-io/bienes-components']
  },
  plugins: [svelte()]
})
