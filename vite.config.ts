import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import { readFileSync } from 'node:fs'

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'))

/** A tag push sets the version; otherwise fall back to package.json. */
function resolveVersion(): string {
  const ref = process.env.GITHUB_REF ?? ''
  const tag = ref.startsWith('refs/tags/') ? ref.replace('refs/tags/', '') : ''
  return (tag || process.env.APP_VERSION || `v${pkg.version}`).replace(/^v?/, 'v')
}

function resolveCommit(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA.slice(0, 7)
  try {
    return execSync('git rev-parse --short HEAD', { stdio: ['ignore', 'pipe', 'ignore'] }).toString().trim()
  } catch {
    return 'local'
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(resolveVersion()),
    __APP_COMMIT__: JSON.stringify(resolveCommit()),
    __APP_BUILT_AT__: JSON.stringify(new Date().toISOString()),
  },
  build: {
    // No manualChunks here on purpose. Hand-splitting React into its own vendor
    // chunk produced a load order where framer-motion evaluated before React was
    // initialised — "Cannot read properties of undefined (reading
    // 'createContext')" — which broke every page, not just the prerender. Rollup
    // works the dependency graph out correctly on its own, and the route-level
    // React.lazy boundaries in App.tsx already deliver the split that matters.
    chunkSizeWarningLimit: 700,
  },
})
