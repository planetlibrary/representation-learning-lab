import typography from '@tailwindcss/typography';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        // Single accent: MIT/Stanford-style crimson-free neutral ink
        // We use a true neutral ink black + warm off-white surface
        ink: {
          DEFAULT: '#0a0a0a',
          soft:    '#1a1a1a',
          muted:   '#525252',
          subtle:  '#737373',
          faint:   '#a3a3a3',
        },
        surface: {
          DEFAULT: '#ffffff',
          raised:  '#fafafa',
          muted:   '#f5f5f5',
          border:  '#e5e5e5',
          divider: '#d4d4d4',
        },
        // Single brand accent — a deep academic blue (like MIT's #750014 is to them,
        // this #1d4ed8 / adjusted below is ours). Kept to ONE shade, used sparingly.
        accent: {
          DEFAULT: '#1a1a1a', // primary CTA = ink itself (like MIT's clean black buttons)
          blue:    '#2563eb', // hyperlink blue — the universal academic convention
          hover:   '#1d4ed8',
        },
      },

      fontFamily: {
        // Neue Haas Grotesk Display — loaded via @font-face in Layout.astro
        // Falls back to system grotesques that are visually close
        display: ['"Neue Haas Grotesk Display"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        // Geist Sans — loaded from Vercel's CDN via @font-face
        sans:    ['"Geist Sans"', '"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
        // JetBrains Mono — loaded from Google Fonts
        mono:    ['"JetBrains Mono"', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },

      fontSize: {
        '2xs': ['0.65rem', { lineHeight: '1rem' }],
      },

      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },

      borderRadius: {
        'sm': '0.25rem',
        DEFAULT: '0.375rem',
        'md': '0.5rem',
        'lg': '0.625rem',
      },

      boxShadow: {
        'card':       '0 1px 3px 0 rgba(0,0,0,0.08), 0 1px 2px -1px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 12px 0 rgba(0,0,0,0.10), 0 2px 4px -1px rgba(0,0,0,0.06)',
        'sm':         '0 1px 2px 0 rgba(0,0,0,0.05)',
      },

      typography: (theme) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body':        theme('colors.ink.soft'),
            '--tw-prose-headings':    theme('colors.ink.DEFAULT'),
            '--tw-prose-lead':        theme('colors.ink.muted'),
            '--tw-prose-links':       theme('colors.accent.blue'),
            '--tw-prose-bold':        theme('colors.ink.DEFAULT'),
            '--tw-prose-counters':    theme('colors.ink.muted'),
            '--tw-prose-bullets':     theme('colors.ink.faint'),
            '--tw-prose-hr':          theme('colors.surface.border'),
            '--tw-prose-quotes':      theme('colors.ink.soft'),
            '--tw-prose-quote-borders': theme('colors.surface.divider'),
            '--tw-prose-captions':    theme('colors.ink.subtle'),
            '--tw-prose-code':        theme('colors.ink.soft'),
            '--tw-prose-pre-code':    theme('colors.ink.soft'),
            '--tw-prose-pre-bg':      theme('colors.surface.muted'),
            '--tw-prose-th-borders':  theme('colors.surface.divider'),
            '--tw-prose-td-borders':  theme('colors.surface.border'),
            maxWidth: 'none',
            fontFamily: theme('fontFamily.sans').join(', '),
            fontSize: '1rem',
            lineHeight: '1.75',
            a: {
              color: theme('colors.accent.blue'),
              textDecoration: 'underline',
              textDecorationColor: 'rgba(37,99,235,0.3)',
              textUnderlineOffset: '3px',
              fontWeight: '400',
              '&:hover': { textDecorationColor: theme('colors.accent.blue') },
            },
            'h1,h2,h3,h4': {
              fontFamily: theme('fontFamily.display').join(', '),
              fontWeight: '700',
              letterSpacing: '-0.02em',
            },
            code: {
              fontFamily: theme('fontFamily.mono').join(', '),
              fontSize: '0.875em',
              fontWeight: '400',
              backgroundColor: theme('colors.surface.muted'),
              borderRadius: '0.25rem',
              padding: '0.15em 0.4em',
              color: theme('colors.ink.soft'),
            },
            'code::before': { content: '""' },
            'code::after':  { content: '""' },
            pre: {
              fontFamily: theme('fontFamily.mono').join(', '),
              backgroundColor: theme('colors.surface.muted'),
              border: `1px solid ${theme('colors.surface.border')}`,
              borderRadius: '0.5rem',
              color: theme('colors.ink.soft'),
            },
            blockquote: {
              borderLeftColor: theme('colors.surface.divider'),
              color: theme('colors.ink.muted'),
              fontStyle: 'normal',
            },
            hr: { borderColor: theme('colors.surface.border') },
            '.math': { overflowX: 'auto', fontFamily: theme('fontFamily.mono').join(', ') },
          },
        },
      }),

      keyframes: {
        'fade-up': {
          '0%':   { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'fade-in': {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out forwards',
        'fade-in': 'fade-in 0.4s ease-out forwards',
      },
    },
  },
  plugins: [typography],
};