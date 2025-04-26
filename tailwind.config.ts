import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans-adobe': ['akzidenz-grotesk-next-pro', 'hiragino-kaku-gothic-pron', 'sans-serif'],
      },
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        accent: 'var(--accent)',
      },
      screens: {
        'xs': '420px',
        '3xl': '1800px',
      },
    },
  },
  plugins: [],
} satisfies Config;
