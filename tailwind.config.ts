import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridColumn: {
        'span-16': 'span 16 / span 16',
      },
      gridTemplateColumns: {
        '20': 'repeat(20, minmax(0, 1fr))',
      },
      fontFamily: {
        'sans-adobe': ['akzidenz-grotesk-next-pro', 'hiragino-kaku-gothic-pron', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
      },
      listStyleType: {
        hyphen: 'hyphen',
      },
      screens: {
        '3xl': { 'min': '1800px' },
      },
      animation: {
        'matrix-1': 'matrix-1 2s steps(1) infinite',
        'matrix-2': 'matrix-2 2s steps(1) infinite',
        'matrix-3': 'matrix-3 2s steps(1) infinite',
        'matrix-4': 'matrix-4 2s steps(1) infinite',
        'matrix-5': 'matrix-5 2s steps(1) infinite',
      },
      keyframes: {
        'matrix-1': {
          '0%, 100%': { transform: 'var(--work-affin-matrix-1)' },
          '25%': { transform: 'var(--work-affin-matrix-1-1)' },
          '50%': { transform: 'var(--work-affin-matrix-1-2)' },
          '75%': { transform: 'var(--work-affin-matrix-1-3)' },
        },
        'matrix-2': {
          '0%, 100%': { transform: 'var(--work-affin-matrix-2)' },
          '25%': { transform: 'var(--work-affin-matrix-2-1)' },
          '50%': { transform: 'var(--work-affin-matrix-2-2)' },
          '75%': { transform: 'var(--work-affin-matrix-2-3)' },
        },
        'matrix-3': {
          '0%, 100%': { transform: 'var(--work-affin-matrix-3)' },
          '25%': { transform: 'var(--work-affin-matrix-3-1)' },
          '50%': { transform: 'var(--work-affin-matrix-3-2)' },
          '75%': { transform: 'var(--work-affin-matrix-3-3)' },
        },
        'matrix-4': {
          '0%, 100%': { transform: 'var(--work-affin-matrix-4)' },
          '25%': { transform: 'var(--work-affin-matrix-4-1)' },
          '50%': { transform: 'var(--work-affin-matrix-4-2)' },
          '75%': { transform: 'var(--work-affin-matrix-4-3)' },
        },
        'matrix-5': {
          '0%, 100%': { transform: 'var(--work-affin-matrix-5)' },
          '25%': { transform: 'var(--work-affin-matrix-5-1)' },
          '50%': { transform: 'var(--work-affin-matrix-5-2)' },
          '75%': { transform: 'var(--work-affin-matrix-5-3)' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
