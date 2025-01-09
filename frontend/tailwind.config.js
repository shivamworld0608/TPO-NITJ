export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'custom-blue': '#0369A0',
      },
      animation: {
        'card-scroll': 'card-scroll 7s linear infinite',
        'bounce-slow': 'bounce 3s infinite',
        'bounce-slower': 'bounce 3.5s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blob': 'blob 7s infinite',
        'fade-in': 'fadeIn 0.5s ease-out',
      },
      keyframes: {
        'card-scroll': {
          '0%': { transform: 'translateY(0%)' },
          '100%': { transform: 'translateY(-100%)' },
        },
        blob: {
          '0%': {
            transform: 'scale(1)',
          },
          '33%': {
            transform: 'scale(1.1)',
          },
          '66%': {
            transform: 'scale(0.9)',
          },
          '100%': {
            transform: 'scale(1)',
          },
        },
        fadeIn: {
          '0%': { 
            opacity: '0', 
            transform: 'translateY(10px)' 
          },
          '100%': { 
            opacity: '1', 
            transform: 'translateY(0)' 
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
  safelist: [
    'from-indigo-50',
    'to-indigo-100/10',
    'bg-indigo-100/20',
    'from-yellow-50',
    'to-yellow-100/10',
    'bg-yellow-100/20',
    'from-blue-50',
    'to-blue-100/10',
    'bg-blue-100/20',
    'from-red-50',
    'to-red-100/10',
    'bg-red-100/20',
  ],
};