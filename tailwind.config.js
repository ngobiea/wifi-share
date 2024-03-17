/** @type {import('tailwindcss').Config} */
import withMit from '@material-tailwind/react/utils/withMT';

export default withMit({
  content: ['./src/**/*.{html,js}', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
});
  
