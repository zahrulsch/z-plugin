import { defineConfig } from 'vite'
import { resolve } from "path"
import vue from '@vitejs/plugin-vue'
import dts from "vite-plugin-dts"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), dts({insertTypesEntry: true})],
  build: {
    lib: {
      entry: resolve(__dirname, "src/lib.ts"),
      name: "ZPlugin",
      fileName: "z-plugin",
      formats: ['es', 'umd']
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: "Vue"
        }
      }
    },
    cssCodeSplit: false
  }
})
