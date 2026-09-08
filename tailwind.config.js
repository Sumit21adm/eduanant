/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background-default)',
        paper: 'var(--background-paper)',
        primary: {
          main: 'var(--primary-main)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
          contrastText: 'var(--primary-contrast)',
        },
        secondary: {
          main: 'var(--secondary-main)',
          light: 'var(--secondary-light)',
          dark: 'var(--secondary-dark)',
          contrastText: 'var(--secondary-contrast)',
        },
        // Brand palette direct values for use in gradients.
        // Navy = authority, amber = action. Old cyan keys kept their names so
        // existing `from-brand-navy` style classes keep resolving.
        brand: {
          navy:      '#0F172A',   // slate 950 — deepest institutional navy
          navyMid:   '#1E1B4B',   // midnight indigo — primary base
          indigo:    '#312E81',
          amber:     '#F59E0B',   // action accent
          amberDeep: '#EA580C',
          amberText: '#B45309',   // contrast-safe amber for small text
          // Logo cyan — the brand signature, used for confirmations,
          // link hovers and the active-portal indicator
          cyan:      '#00b6d5',
          cyanLight: '#63cae0',
          cyanDeep:  '#0f6187',
        },
        text: {
          primary:   'var(--text-primary)',
          secondary: 'var(--text-secondary)',
        },
        error:   { main: '#d32f2f', light: '#ef5350', dark: '#c62828' },
        warning: { main: '#ff9800', light: '#ffb74d', dark: '#f57c00' },
        success: { main: '#2e7d32', light: '#4caf50', dark: '#1b5e20' },
        info:    { main: '#0288d1', light: '#03a9f4', dark: '#01579b' },
      },
      fontFamily: {
        // Inter for everything you read, Plus Jakarta Sans for everything you scan
        sans:    ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      backgroundImage: {
        'brand-gradient':   'linear-gradient(135deg, #0F172A 0%, #1E1B4B 55%, #312E81 100%)',
        'brand-gradient-r': 'linear-gradient(90deg, #1E1B4B 0%, #312E81 100%)',
        'action-gradient':  'linear-gradient(135deg, #F59E0B 0%, #EA580C 55%, #C2410C 100%)',
      },
      boxShadow: {
        'elevation-1': '0px 2px 4px rgba(0,0,0,0.08)',
        'elevation-2': '0px 4px 8px rgba(0,0,0,0.12)',
        'elevation-4': '0px 8px 16px rgba(0,0,0,0.16)',
        'elevation-8': '0px 12px 24px rgba(0,0,0,0.20)',
        'glass':         '0 8px 32px 0 rgba(15,23,42,0.08)',
        'brand-glow':    '0 0 40px rgba(245,158,11,0.25)',
        'brand-glow-lg': '0 0 80px rgba(245,158,11,0.18)',
      },
      borderRadius: {
        'mui-btn': '8px',
        'mui-card': '12px',
      },
      animation: {
        'gradient-shift': 'gradient-shift 4s ease infinite',
        'logo-shimmer': 'logo-shimmer 3s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
        'ambient': 'ambient-pulse 20s ease-in-out infinite alternate',
      },
      keyframes: {
        'gradient-shift': {
          '0%, 100%': { backgroundPosition: '0% center' },
          '50%': { backgroundPosition: '100% center' },
        },
        'logo-shimmer': {
          '0%, 100%': { filter: 'drop-shadow(0 0 8px rgba(0,182,213,0.3))' },
          '50%': { filter: 'drop-shadow(0 0 24px rgba(0,182,213,0.7))' },
        },
        'ambient-pulse': {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '100% 100%' },
        },
      },
    },
  },
  plugins: [],
}
