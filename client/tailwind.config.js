// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

//   theme: {
//     extend: {
//       boxShadow: {
//         yellow: '0.35px 2.35px 1rem rgba(255, 255, 0, 0.25)',
//       },
//       colors: {
//         'yellow-custom': '#FFEB3B', // Custom yellow color
//       },
//       transitionDuration: {
//         300: '300ms', // Custom transition duration
//         100: '300ms', // Custom quick transition duration
//       },
//       transitionProperty: {
//         'bg-yellow': 'background-color', // Transition for background color
//         'text-color': 'color', // Transition for text color
//       },
//     },
//   },
//   plugins: [],
// };

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

//   theme: {
//     extend: {
//       boxShadow: {
//         yellow: '0.35px 2.35px 1rem rgba(255, 255, 0, 0.25)',
//       },
//       colors: {
//         'yellow-custom': '#FFEB3B', // Custom yellow color
//       },
//       transitionDuration: {
//         300: '300ms', // Custom transition duration
//         500: '500ms', // Add another custom transition duration
//         700: '700ms', // Add another custom transition duration
//         100: '100ms', // Custom quick transition duration
//       },
//       transitionProperty: {
//         'bg-yellow': 'background-color', // Transition for background color
//         'text-color': 'color', // Transition for text color
//       },
//       transitionTimingFunction: {
//         in: 'ease-in', // Custom timing function for "in" transition
//         out: 'ease-out', // Custom timing function for "out" transition
//         'in-out': 'ease-in-out', // Custom timing function for "in-out" transition
//       },
//     },
//   },
//   plugins: [],
// };

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  important: true,
  theme: {
    extend: {
      rotate: {
        '-45': '-45deg', // Add the -45 degree rotation
        0: '0deg', // Add the 0 degree rotation
        45: '45deg', // Add the 45 degree rotation
        // Add more degree values as needed
        360: '360deg', // Add the 360 degree rotation
      },
      boxShadow: {
        yellow: '0.35px 2.35px 1rem rgba(255, 255, 0, 0.25)',
        blue: '0 4px 6px -1px rgba(0, 0, 255, 0.1), 0 2px 4px -1px rgba(0, 0, 255, 0.06)',
        red: '0 0 1px rgba(255, 0, 0, 0.5)',
        green:
          '0 4px 6px -1px rgba(0, 255, 0, 0.1), 0 2px 4px -1px rgba(0, 255, 0, 0.06)',
        purple:
          '0 4px 6px -1px rgba(128, 0, 128, 0.1), 0 2px 4px -1px rgba(128, 0, 128, 0.06)',
        orange:
          '0 4px 6px -1px rgba(255, 165, 0, 0.1), 0 2px 4px -1px rgba(255, 165, 0, 0.06)',
        // Add more as needed...
      },
      colors: {
        'yellow-custom': '#FFEB3B', // Custom yellow color
      },
      transitionDuration: {
        300: '300ms', // Custom transition duration
        500: '500ms', // Add another custom transition duration
        700: '700ms', // Add another custom transition duration
        100: '100ms', // Custom quick transition duration
      },
      transitionProperty: {
        'bg-yellow': 'background-color', // Transition for background color
        'text-color': 'color', // Transition for text color
      },
      transitionTimingFunction: {
        in: 'ease-in', // Custom timing function for "in" transition
        out: 'ease-out', // Custom timing function for "out" transition
        'in-out': 'ease-in-out', // Custom timing function for "in-out" transition
      },
      backgroundSize: {
        auto: 'auto',
        cover: 'cover',
        contain: 'contain',
      },
      backgroundRepeat: {
        'no-repeat': 'no-repeat', // Add no-repeat for background images
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['night', 'retro'],
  },
};
