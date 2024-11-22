import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography"

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50:  '#E3F2F3',
          100: '#C7E4E5',
          200: '#A3D1D3',
          300: '#7EBEC1',
          400: '#5AA8AB',
          500: '#396C6F', /* Base color */
          600: '#2E585A',
          700: '#234345',
          800: '#192D30',
          900: '#0F1718',
        },
        secondary: {
          50:  '#E5EDF5',
          100: '#CCDAEB',
          200: '#99B6D6',
          300: '#6691C1',
          400: '#3F72A8',
          500: '#355B8C', /* Base color */
          600: '#2A4870',
          700: '#203554',
          800: '#152338',
          900: '#0B121C',
        },
        accent: {
          50:  '#FBEAE8',
          100: '#F6D2CB',
          200: '#ECA99A',
          300: '#E17F6A',
          400: '#D9644A', /* Accent base color */
          500: '#B64F3B',
          600: '#923C2D',
          700: '#6E291F',
          800: '#4A1813',
          900: '#260905',
        },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [
    typography,
  ],
};
export default config;
