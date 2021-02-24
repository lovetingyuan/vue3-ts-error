import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import { readFileSync } from 'fs'

const virtualEntry = 'pages/index2.html'
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), {
    name: 'test-plugin',
    resolveId (id) {
      if (id === virtualEntry) return id
      if (id === '@page') return resolve(__dirname, 'src/Bar.vue')
    },
    load(id) {
      if (id === virtualEntry) {
        return readFileSync('index.html', 'utf8').replace('main.ts', 'main2.ts')
      }
    },
    config (userConfig, env) {
      if (env.command === 'build') {
        return {
          build: {
            rollupOptions: {
              input: {
                index: './index.html',
                index2: virtualEntry
              },
            }
          }
        }
      }
    }
  }]
})
