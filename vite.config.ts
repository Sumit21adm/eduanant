import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { execSync } from 'node:child_process'
import type { Plugin } from 'vite'
import { RATE_ANNUAL, RATE_MONTHLY, RATE_FLOOR_ANNUAL, CONTACT_SALES_ABOVE, inr } from './src/data/pricing'

/**
 * index.html is the one place pricing cannot be imported at runtime, and it is the
 * copy that reaches WhatsApp and Google. It carried "₹20/student" through two
 * repricings because nothing connected it to src/data/pricing.ts. These tokens do,
 * and an unresolved one fails the build rather than shipping a literal %RATE_ANNUAL%.
 */
function pricingTokens(): Plugin {
  const tokens: Record<string, string> = {
    '%RATE_ANNUAL%': String(RATE_ANNUAL),
    '%RATE_MONTHLY%': String(RATE_MONTHLY),
    '%RATE_FLOOR%': String(RATE_FLOOR_ANNUAL),
    '%LARGE_SCHOOL_FROM%': inr(CONTACT_SALES_ABOVE),
  }
  return {
    name: 'eduanant-pricing-tokens',
    transformIndexHtml(html) {
      const out = Object.entries(tokens).reduce(
        (acc, [k, v]) => acc.split(k).join(v),
        html,
      )
      const stray = out.match(/%(?:RATE_[A-Z_]+|LARGE_SCHOOL_FROM)%/)
      if (stray) {
        throw new Error(
          `index.html uses the pricing token ${stray[0]}, which pricingTokens() does not define. ` +
          `Add it there or correct the spelling — shipping it unresolved puts a literal % into the meta tags.`,
        )
      }
      return out
    },
  }
}

/**
 * The release workflow works the version out (scripts/next-version.mjs) and hands it to
 * the build as APP_VERSION; a pushed tag sets it directly.
 *
 * A local build has no release behind it, so it says "dev". It used to borrow
 * package.json's version, which nothing ever bumped — so every build, local or deployed,
 * read "v1.0.0" and looked like a real release number.
 */
function resolveVersion(): string {
  const ref = process.env.GITHUB_REF ?? ''
  const tag = ref.startsWith('refs/tags/') ? ref.replace('refs/tags/', '') : ''
  const version = tag || process.env.APP_VERSION || ''
  return version ? version.replace(/^v?/, 'v') : 'dev'
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
  plugins: [react(), pricingTokens()],
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
