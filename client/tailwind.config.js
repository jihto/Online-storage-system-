/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}", 
    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    screens:{
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px'
    },
    extend: {
      textShadow: {
        'default': '2px 2px 4px rgba(0, 0, 0, 0.5)',
        'large': '4px 4px 8px rgba(0, 0, 0, 0.5)',
      },
      colors:{
        'default': '#28d2e9',
        'ouline': '#272727'
      },
      boxShadow: {
        '3xl': '10px 10px 10px rgba(0, 0, 0, 0.5)',
      },
      borderWidth:{
        'base': '1px'
      },
      animation:{
        quiver: 'quiver 0.3s linear 4 alternate-reverse',
        'spin-slow': 'spin 4s ease-in-out infinite alternate-reverse',
        'moving': 'moving 20s ease-in-out infinite alternate-reverse',
        'moving-slow' : 'moving-slow 20s ease-in-out infinite',
      },
      keyframes: {
        moving:{
          '0%': { transform: 'translateX(85%)' },
          '50%': { transform: 'translateX(0%)'},
          '100%': { transform: 'translateX(85%)'},
        },
        'moving-slow':{
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(85%)'}, 
        },
        quiver: {
          '0%': { transform: 'translateX(-5px)' },
          '50%': { transform: 'translateX(5px)'},
          '100%': { transform: 'translateX(0)'},
        }
      }
    },
  },
  plugins: [],
}

