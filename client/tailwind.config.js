/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      boxShadow: {
        yellow: '0.35px 2.35px 1rem rgba(255, 255, 0, 0.25)',
      },
      colors: {
        'yellow-custom': '#FFEB3B', // Custom yellow color
      },
      transitionDuration: {
        300: '300ms', // Custom transition duration
        100: '300ms', // Custom quick transition duration
      },
      transitionProperty: {
        'bg-yellow': 'background-color', // Transition for background color
        'text-color': 'color', // Transition for text color
      },
    },
  },
  plugins: [],
};
