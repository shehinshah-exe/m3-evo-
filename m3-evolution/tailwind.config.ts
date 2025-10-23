/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'm-blue': '#1C69D4',
        'm-purple': '#B02A8F',
        'm-red': '#E4002B',
        'bmw-silver': '#BFBFBF',
      },
      fontFamily: {
        'display': ['Bebas Neue', 'sans-serif'],
        'heading': ['Bebas Neue', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
        'tech': ['Rajdhani', 'sans-serif'],
      },
      animation: {
        'marquee': 'marquee 40s linear infinite',
        'marquee-reverse': 'marquee-reverse 40s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}