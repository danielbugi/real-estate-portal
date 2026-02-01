/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ocean: {
          50: '#e6f3f7',
          100: '#cce7ef',
          200: '#99cfdf',
          300: '#66b7cf',
          400: '#339fbf',
          500: '#0087AF', // Main ocean blue
          600: '#006c8c',
          700: '#005169',
          800: '#003646',
          900: '#001b23',
        },
        gold: {
          50: '#fef9e7',
          100: '#fdf3cf',
          200: '#fbe79f',
          300: '#f9db6f',
          400: '#f7cf3f',
          500: '#D4AF37', // Luxury gold
          600: '#aa8c2c',
          700: '#7f6921',
          800: '#554616',
          900: '#2a230b',
        },
        brown: {
          50: '#f5f3f0',
          100: '#ebe7e1',
          200: '#d7cfc3',
          300: '#c3b7a5',
          400: '#af9f87',
          500: '#8B7355', // Luxury brown
          600: '#6f5c44',
          700: '#534533',
          800: '#382e22',
          900: '#1c1711',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        body: ['var(--font-heebo)', 'sans-serif'],
        sans: ['var(--font-heebo)', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-in-out',
        'slide-up': 'slideUp 0.6s ease-out',
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(30px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
};
