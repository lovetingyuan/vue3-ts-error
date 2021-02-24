import { defineConfig } from 'vite'
import type { Plugin } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), {
    name: 'test-plugin',
    resolveId (id) {
      if (id === 'pages/foo.html') return id
    },
    load(id) {
      if (id === 'pages/foo.html') {
        return `
        <!DOCTYPE html>
        <html lang="en">
          <head>
            <meta charset="UTF-8" />
            <link rel="icon" href="/favicon.ico" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>fooooo</title>
          </head>
          <body>
            <div id="app">this is foo</div>
            <script type="module" src="/src/main.ts"></script>
          </body>
        </html>
        `
      }
    },
    config (userConfig, env) {
      if (env.command === 'build') {
        return {
          build: {
            rollupOptions: {
              input: {
                index: './index.html',
                foo: 'pages/foo.html'
              },
            }
          }
        }
      }
    }
  } as Plugin]
})
