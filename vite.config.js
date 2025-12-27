import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
   base: '/jepx-emo/', // ← 同样是仓库名
  plugins: [vue()],
  server: {
    open: true, // 启动项目自动打开浏览器
    port: 5173, // 默认端口
    host: '0.0.0.0'
  }
})