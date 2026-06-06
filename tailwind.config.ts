import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--pf-bg)',
        surface: 'var(--pf-surface)',
        primary: 'var(--pf-text)',
        accent: 'var(--pf-accent)',
        muted: 'var(--pf-text-muted)',
        'surface-soft': 'var(--pf-surface-soft)',
        'surface-strong': 'var(--pf-surface-strong)',
      },
      boxShadow: {
        card: 'var(--pf-shadow-card)',
        soft: 'var(--pf-shadow-soft)',
        control: 'var(--pf-shadow-control)',
      },
    },
  },
  plugins: [],
};

export default config;
