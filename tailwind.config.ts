/* tailwind.config.ts */

import type { Config } from "tailwindcss";
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'sans-serif'],
        serif: ['var(--font-bodoni)', 'serif'],
      },
      backgroundImage: {
        'fbm-cinematic': 'linear-gradient(135deg, #f7efd0 0%, #ead9a5 22%, #d6bb78 45%, #b89252 63%, #40506b 82%, #1b2838 100%)',
      },
      colors: {
        // FBM Navy Blue Paleti
        fbm: {
          'sage-200': '#c2a971',
          'gold-400': '#bc9648',
          'navy-900': '#1b2838',
          'cream-100': '#ebdb9d',
          'cream-50': '#f2e2a3',
          'slate-800': '#222f3e',
          'champagne-150': '#dfcb8f',
          'denim-700': '#30435c',
          'denim-750': '#24364b',
          'denim-775': '#233449',
          'amber-250': '#d0b26c',
          'amber-200': '#d9bd79',
          'graphite-700': '#2b333c',
          'graphite-800': '#1b2732',
          'graphite-650': '#31373e',
          'graphite-900': '#141e2e',
          'bronze-400': '#a67e3d',
          'bronze-500': '#a2722f',
        },
      },
      animation: {
        'reveal-line': 'reveal-line 1s ease-out forwards',
      },
      keyframes: {
        'reveal-line': {
          '0%': { transform: 'scaleX(0)' },
          '100%': { transform: 'scaleX(1)' },
        },
      },
    },
  },
  plugins: [
    plugin(function({ addBase, matchUtilities, theme }) {
      const fbmColors = theme('colors.fbm');
      const toRGB = (hex: string) => {
        const normalized = hex.replace('#', '');
        const bigint = parseInt(normalized, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r} ${g} ${b}`;
      };

      addBase({
        ':root': {
          '--fbm-color-sage-200': fbmColors['sage-200'],
          '--fbm-rgb-sage-200': toRGB(fbmColors['sage-200']),
          '--fbm-color-gold-400': fbmColors['gold-400'],
          '--fbm-rgb-gold-400': toRGB(fbmColors['gold-400']),
          '--fbm-color-navy-900': fbmColors['navy-900'],
          '--fbm-rgb-navy-900': toRGB(fbmColors['navy-900']),
          '--fbm-color-cream-100': fbmColors['cream-100'],
          '--fbm-rgb-cream-100': toRGB(fbmColors['cream-100']),
          '--fbm-color-cream-50': fbmColors['cream-50'],
          '--fbm-rgb-cream-50': toRGB(fbmColors['cream-50']),
          '--fbm-color-slate-800': fbmColors['slate-800'],
          '--fbm-rgb-slate-800': toRGB(fbmColors['slate-800']),
          '--fbm-color-champagne-150': fbmColors['champagne-150'],
          '--fbm-rgb-champagne-150': toRGB(fbmColors['champagne-150']),
          '--fbm-color-denim-700': fbmColors['denim-700'],
          '--fbm-rgb-denim-700': toRGB(fbmColors['denim-700']),
          '--fbm-color-denim-750': fbmColors['denim-750'],
          '--fbm-rgb-denim-750': toRGB(fbmColors['denim-750']),
          '--fbm-color-denim-775': fbmColors['denim-775'],
          '--fbm-rgb-denim-775': toRGB(fbmColors['denim-775']),
          '--fbm-color-amber-250': fbmColors['amber-250'],
          '--fbm-rgb-amber-250': toRGB(fbmColors['amber-250']),
          '--fbm-color-amber-200': fbmColors['amber-200'],
          '--fbm-rgb-amber-200': toRGB(fbmColors['amber-200']),
          '--fbm-color-graphite-700': fbmColors['graphite-700'],
          '--fbm-rgb-graphite-700': toRGB(fbmColors['graphite-700']),
          '--fbm-color-graphite-800': fbmColors['graphite-800'],
          '--fbm-rgb-graphite-800': toRGB(fbmColors['graphite-800']),
          '--fbm-color-graphite-650': fbmColors['graphite-650'],
          '--fbm-rgb-graphite-650': toRGB(fbmColors['graphite-650']),
          '--fbm-color-graphite-900': fbmColors['graphite-900'],
          '--fbm-rgb-graphite-900': toRGB(fbmColors['graphite-900']),
          '--fbm-color-bronze-400': fbmColors['bronze-400'],
          '--fbm-rgb-bronze-400': toRGB(fbmColors['bronze-400']),
          '--fbm-color-bronze-500': fbmColors['bronze-500'],
          '--fbm-rgb-bronze-500': toRGB(fbmColors['bronze-500']),
        },
      });

      matchUtilities(
        {
          'text-shadow': (value) => ({
            textShadow: value,
          }),
        },
        { values: theme('textShadow') }
      );
    }),
  ],
};

export default config;

