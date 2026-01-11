import { defineConfig } from 'vite'

export default defineConfig({
  // Uncomment and update this line if deploying to GitHub Pages
  // base: '/your-repo-name/',

  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      input: {
        main: 'index.html',
        admin: 'admin.html',
      },
    },
  },
  server: {
    proxy: {
      '/.netlify': 'http://localhost:8888'
    }
  }
})
