/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      spacing: {
        '62': '15.5rem',
        '74': '18.5rem',
        '50': '12.5rem',
        '34': '8.5rem',
        '38': '9.5rem',
        '54': '13.5rem',
        '42': '10.5rem',
        '46': '11.5rem',
        '94': '23.5rem',
        '66': '16.5rem',
      },
      fontSize: {
        'xxl': '1.5rem', // Размер текста "очень большой"
      },
      screens: {
        'lg-xl': '1100px'
      },
    },
  },
  plugins: [],
}
