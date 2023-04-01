/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line @typescript-eslint/no-var-requires
const plugin = require('tailwindcss/plugin')
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    colors: {
      black: '#1F1F1F',
      yellow: '#E9E038',
      'yellow-100': '#f7ee4b',
      white: '#FFFFFF',
      gray: '#727272'
    }
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
    require('@tailwindcss/line-clamp'),
    plugin(function ({ addUtilities }) {
      const styles = {
        '.text-H1': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '35px',
          lineHeight: '42px'
        },
        '.text-H2': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '26px',
          lineHeight: '31px'
        },
        '.text-H3': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '29px'
        },
        '.text-H4': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '20px',
          lineHeight: '24px',
          letterSpacing: '0.03em'
        },
        '.text-H4--400': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '20px',
          lineHeight: '24px',
          letterSpacing: '0.03em'
        },
        '.text-H5': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '16px',
          lineHeight: '19px'
        },
        '.text-H6': {
          fontFamily: 'Inter',
          fontSize: '11px',
          fontWeight: 700,
          lineHeight: '13px',
          letterSpacing: '0.03em',
          textAlign: 'left'
        },
        '.text-P1': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 700,
          fontSize: '24px',
          lineHeight: '40px',
          letterSpacing: '0.05em'
        },
        '.text-P2': {
          fontFamily: 'Inter',
          fontStyle: 'normal',
          fontWeight: 400,
          fontSize: '16px',
          lineHeight: '40px',
          letterSpacing: '0.05em'
        },
        '.text-P3': {
          fontFamily: 'Inter',
          fontSize: '11px',
          fontWeight: 400,
          lineHeight: '24px',
          letterSpacing: '0.03em',
          textAlign: 'left'
        },
        '.text-P4': {
          fontFamily: 'Inter',
          fontSize: '14px',
          fontWeight: 400,
          lineHeight: '28px',
          textAlign: 'left'
        }
      }

      addUtilities(styles, ['responsive', 'hover'])
    })
  ]
}
