import { resolve } from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import alias from '@rollup/plugin-alias'

const projectRootDir = resolve(__dirname);

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/main.js'),
      name: 'VueGameCard',
      // the proper extensions will be added
      fileName: 'vue-game-card',
    },
  },
  resolve: {
    alias: {
      '@': resolve(projectRootDir, 'src')
    }
  },
  plugins: [vue(),
    alias({
      entries: [
        {
          find: '@',
          replacement: resolve(projectRootDir, 'src')
        }
      ]
    })],
})
