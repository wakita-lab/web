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
        'sans-en': ['var(--font-sans-en)', 'Inter', 'sans-serif'],
        'sans-ja': ['var(--font-sans-ja)', 'Karla', 'sans-serif'],
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
    },
  },
  plugins: [],
} satisfies Config;
