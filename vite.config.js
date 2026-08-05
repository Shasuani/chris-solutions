import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// GitHub Pages serves the site from /<repo>/, so the build needs a matching
// base path. The deploy workflow sets VITE_BASE; local dev and any other host
// (Netlify, Vercel, a custom domain) fall back to serving from the root.
export default defineConfig({
  base: process.env.VITE_BASE || '/',
  plugins: [react()],
})
