/** @type {import('tailwindcss').Config} */

/** A colour driven by a CSS variable, still alpha-aware (`bg-ink-900/70`). */
const v = (name) => `rgb(var(${name}) / <alpha-value>)`

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        /* ---- Surfaces: flip between the dark and light themes ---- */
        ink: {
          950: v('--ink-950'), // page background
          900: v('--ink-900'), // cards / panels
          850: v('--ink-850'), // mid gradient tone
          800: v('--ink-800'), // inputs / chips
          700: v('--ink-700'), // borders / dividers
        },

        /* ---- Semantic foreground scale ---- */
        fg: v('--fg'), // headings, strong text
        body: v('--fg-body'), // paragraphs
        muted: v('--fg-muted'), // secondary text
        subtle: v('--fg-subtle'), // captions
        faint: v('--fg-faint'), // hints

        /* ---- Fixed tokens that must never flip ---- */
        pure: '#ffffff', // literal white: overlays and text on accent fills
        carbon: '#050b18', // literal near-black: text on light accent fills

        primary: {
          50: '#ecfeff',
          400: '#22d3ee',
          500: '#06b6d4',
          600: '#0891b2',
          700: '#0e7490',
        },
      },
      fontFamily: {
        sans: ['var(--font-ui)', 'Inter', 'system-ui', 'sans-serif'],
        arabic: ['var(--font-ar)', 'Tajawal', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 40px -10px rgb(var(--glow) / 0.45)',
      },
    },
  },
  plugins: [],
}
