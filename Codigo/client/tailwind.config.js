/** @type {import('tailwindcss').Config} */
const plugin = require('tailwindcss/plugin')
const defaultTheme = require('tailwindcss/defaultTheme')

export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      fontSize: {
        8: '8px',
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
        22: '22px',
        24: '24px',
      },
      gap: {
        xxs: '2px',
        xs: '4px',
        sm: '8px',
        base: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      borderRadius: {
        2: '2px',
        4: '4px',
        8: '8px',
        12: '12px',
        16: '16px',
        20: '20px',
        24: '24px',
      },
      padding: {
        xxs: '2px',
        xs: '4px',
        sm: '6px',
        base: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '18px',
        '3xl': '20px',
        '4xl': '24px',
      },
      margin: {
        xxs: '2px',
        xs: '4px',
        sm: '6px',
        base: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '18px',
        '3xl': '20px',
        '4xl': '24px',
      },
      colors: {
        primary: {
          100: '#EAFFF3',
          200: '#B3E5D1',
          500: '#14C981',
          700: '#399671',
          800: '#247858',
        },
        gray: {
          100: '#F5F5F5',
          200: '#EAEAEA',
          300: '#D9D9D9',
          400: '#A6A6A6',
          500: '#5C5C5C',
        },
        red: {
          100: '#FFF0F0',
          500: '#F03232',
        },
        green: {
          100: '#F2FFF8',
          500: '#0FB75C',
        },
        blue: {
          100: '#F0FAFF',
          500: '#32ADF0',
        },
        yellow: {
          100: '#FFFCF0',
          500: '#F0D332',
        },
      },
      borderWidth: {
        1: '1px',
        3: '3px',
      },
      boxShadow: {
        'normal': '2px 2px 2px 2px rgba(0, 0, 0, 0.25)',
      },
    },
  },
  screens: {
    'xs': '352px',
    'sm': '640px',
    'md': '769px',
    'lg': '1024px',
    'xl': '1280px',
    '2xl': '1536px',
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    plugin(function ({ addVariant, e, postcss }) {
      addVariant('firefox', ({ container, separator }) => {
        const isFirefoxRule = postcss.atRule({
          name: '-moz-document',
          params: 'url-prefix()',
        })
        isFirefoxRule.append(container.nodes)
        container.append(isFirefoxRule)
        isFirefoxRule.walkRules((rule) => {
          rule.selector = `.${e(`firefox${separator}${rule.selector.slice(1)}`)}`
        })
      })
    }),
  ],
}

