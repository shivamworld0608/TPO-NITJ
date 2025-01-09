export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0369A0',
      },
      animation: {
        'card-scroll': 'card-scroll 7s linear infinite',
      },
      keyframes: {
        'card-scroll': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
      },
    },
  },
  plugins: [],
};
