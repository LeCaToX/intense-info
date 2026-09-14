import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base './' để chạy dưới mọi tên repo Pages và custom domain.
// appType 'spa' + HashRouter: refresh/deep-link luôn hoạt động, không cần 404.html.
export default defineConfig({
  base: './',
  appType: 'spa',
  plugins: [react(), tailwindcss()],
})
