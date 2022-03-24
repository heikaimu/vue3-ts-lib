/*
 * @Author: Yaowen Liu
 * @Date: 2022-03-11 16:26:27
 * @LastEditors: Yaowen Liu
 * @LastEditTime: 2022-03-24 14:51:01
 */
import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

const target = process.env.TARGET

let buildConfig: Record<string, unknown> = {
  outDir: 'netlify-page',
}

if (target === 'npm') {
  buildConfig = {
    lib: {
      entry: path.resolve(__dirname, 'lib/index.ts'),
      name: 'MyLib',
      fileName: (format: any) => `my-lib.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue',
        },
      },
    },
  }
}

export default defineConfig({
  build: { ...buildConfig },
  plugins: [vue()],
  server: {
    open: true,
  },
})
