import { resolve } from 'path'
import { defineConfig, externalizeDepsPlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from 'tailwindcss'

export default defineConfig({
  main: {
    plugins: [externalizeDepsPlugin()]
  },
  preload: {
    plugins: [externalizeDepsPlugin()]
  },
  renderer: {
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src'),
        '~tailwindcss': resolve('src/renderer/src/tailwindcss.css'),
      }
    },
    plugins: [vue()]
  },
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  }
})
