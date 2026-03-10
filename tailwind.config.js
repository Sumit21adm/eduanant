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
        // Core background colors reflecting MUI mode
        background: 'var(--background-default)',
        paper: 'var(--background-paper)',

        // CSS Variables for dynamic theme switching
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

        // Static feedback colors from MUI theme
        error: {
          main: '#d32f2f',
          light: '#ef5350',
          dark: '#c62828',
        },
        warning: {
          main: '#ff9800',
          light: '#ffb74d',
          dark: '#f57c00',
        },
        success: {
          main: '#2e7d32',
          light: '#4caf50',
          dark: '#1b5e20',
        },
        info: {
          main: '#0288d1',
          light: '#03a9f4',
          dark: '#01579b',
        }
      },
      fontFamily: {
        sans: [
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          '"Helvetica Neue"',
          'Arial',
          'sans-serif'
        ],
      },
      boxShadow: {
        // Mirroring MUI elevation shadows
        'elevation-1': '0px 2px 4px rgba(0,0,0,0.08)',
        'elevation-2': '0px 4px 8px rgba(0,0,0,0.12)',
        'elevation-4': '0px 8px 16px rgba(0,0,0,0.16)',
        'elevation-8': '0px 12px 24px rgba(0,0,0,0.20)',
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.07)',
      },
      borderRadius: {
        'mui-btn': '8px',
        'mui-card': '12px',
      }
    },
  },
  plugins: [],
}
