import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#ffffff',
        surface: '#f8fafc',
        primary: '#0f172a',     // Slate 900
        secondary: '#475569',   // Slate 600
        accent: '#0066ff',      // Corporate Blue
        
        // Dark Theme Specifics (for Tech Stack)
        void: '#050505',
        tungsten: '#111111',
        neon: '#00ff9d',
        silver: '#E0E0E0',
        
        'slate-soft': '#64748b',
        'border-light': '#f1f5f9',
      },
      fontFamily: {
        sans: ['var(--font-inter-tight)', 'sans-serif'],
        display: ['var(--font-syne)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      animation: {
        'morph': 'morph 15s ease-in-out infinite',
      },
      keyframes: {
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40% / 50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%' },
        }
      }
    },
  },
  plugins: [],
};
export default config;