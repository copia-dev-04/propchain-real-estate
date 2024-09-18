import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#030712',
          950: '#020617',
        },
        'cyber-teal': '#2DD4BF',
        gold: {
          50: '#FEFDF0',
          100: '#FDF9D7',
          200: '#FBF0A0',
          300: '#F7E263',
          400: '#F0CA2A',
          500: '#D4AF37',
          600: '#B8941E',
          700: '#8B6D12',
          800: '#5C470C',
          900: '#2E2306',
        },
        navy: {
          50: '#F0F2F8',
          100: '#D8DDF0',
          200: '#B0BBE1',
          300: '#7A8FCC',
          400: '#4A63B5',
          500: '#2D3D8F',
          600: '#1F2E72',
          700: '#1A1F2E',
          800: '#131720',
          900: '#0A0C12',
        },
        // New: Electric Indigo accent — technology, blockchain, innovation
        indigo: {
          50:  '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        // New: Champagne variant for rich heading text
        champagne: {
          100: '#fff8e7',
          200: '#fcefc7',
          300: '#f5e1a0',
          400: '#edcc6e',
          500: '#e0b84a',
        },
      },
      fontFamily: {
        outfit: ['var(--font-outfit)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-serif)', 'Georgia', 'serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        'card-hover': '0 8px 40px rgba(212,175,55,0.2)',
        glow: '0 0 30px rgba(212,175,55,0.4)',
        'glow-sm': '0 0 15px rgba(212,175,55,0.3)',
        'inner-gold': 'inset 0 1px 0 rgba(212,175,55,0.2)',
        // New indigo glows
        'indigo-glow': '0 0 30px rgba(99,102,241,0.45)',
        'indigo-glow-sm': '0 0 15px rgba(99,102,241,0.3)',
        // Premium card shadow
        'premium': '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(212,175,55,0.15)',
        'premium-hover': '0 30px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(212,175,55,0.35)',
      },
      animation: {
        shimmer: 'shimmer 1.5s infinite',
        'pulse-gold': 'pulseGold 2s ease-in-out infinite',
        float: 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'bounce-slow': 'bounce 2s infinite',
        'spin-slow': 'spin 8s linear infinite',
        // New animations
        ticker: 'ticker 30s linear infinite',
        scan: 'scan 3s ease-in-out infinite',
        'border-spin': 'borderSpin 4s linear infinite',
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGold: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212,175,55,0.4)' },
          '50%': { boxShadow: '0 0 0 12px rgba(212,175,55,0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scan: {
          '0%, 100%': { opacity: '0.3', transform: 'translateY(0)' },
          '50%': { opacity: '1', transform: 'translateY(-4px)' },
        },
        borderSpin: {
          '0%': { '--border-angle': '0deg' },
          '100%': { '--border-angle': '360deg' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(99,102,241,0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(99,102,241,0.6), 0 0 60px rgba(212,175,55,0.2)' },
        },
      },
      backgroundImage: {
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F0CA2A 50%, #B8941E 100%)',
        'gradient-navy': 'linear-gradient(135deg, #1A1F2E 0%, #0A0C12 100%)',
        'gradient-hero': 'linear-gradient(135deg, #1A1F2E 0%, #1F2E72 50%, #1A1F2E 100%)',
        'gradient-card': 'linear-gradient(135deg, #0891B2 0%, #1A1F2E 100%)',
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        // New gradient entries
        'gradient-indigo': 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #818cf8 100%)',
        'gradient-dual': 'linear-gradient(135deg, #D4AF37 0%, #6366f1 100%)',
        'gradient-obsidian': 'linear-gradient(180deg, #020617 0%, #0a0c1a 50%, #020617 100%)',
        'gradient-premium': 'linear-gradient(135deg, #020617 0%, #0f0f2a 50%, #0a0a0e 100%)',
        'gradient-cta': 'linear-gradient(135deg, #0a0a1a 0%, #12103a 40%, #0a0e1a 100%)',
        'gradient-border': 'linear-gradient(90deg, #D4AF37, #6366f1, #D4AF37)',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151',
            a: { color: '#D4AF37', '&:hover': { color: '#B8941E' } },
            h1: { fontFamily: 'var(--font-cormorant)', color: '#1A1F2E' },
            h2: { fontFamily: 'var(--font-cormorant)', color: '#1A1F2E' },
            h3: { fontFamily: 'var(--font-cormorant)', color: '#1A1F2E' },
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
