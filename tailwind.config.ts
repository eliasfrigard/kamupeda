import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

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
          50: '#e7f7f9',
          100: '#c3e7ef',
          200: '#90d0de',
          300: '#43abc7',
          400: '#286071',
          500: '#16404d',
          600: '#143441',
          700: '#142a34',
          800: '#152229',
          900: '#10181d',
          950: '#0a1318',
        },
        accent: {
          50: '#fcfaf2',
          100: '#faf4df',
          200: '#f3e6c0',
          300: '#ebd497',
          400: '#e2b867',
          500: '#dda853',
          600: '#d49240',
          700: '#bc732b',
          800: '#965c2b',
          900: '#794c26',
          950: '#412612',
        },
        secondary: {
          50: '#fffffd',
          100: '#fffffc',
          200: '#fffffa',
          300: '#fefdf7',
          400: '#fefcf4',
          500: '#fbf5dd',
          600: '#f5dc9d',
          700: '#eab75d',
          800: '#dc9b43',
          900: '#cd8132',
          950: '#794414',
        },
        // primary: {
        //   50:  '#E3F2F3',
        //   100: '#C7E4E5',
        //   200: '#A3D1D3',
        //   300: '#7EBEC1',
        //   400: '#5AA8AB',
        //   500: '#396C6F', /* Base color */
        //   600: '#2E585A',
        //   700: '#234345',
        //   800: '#192D30',
        //   900: '#0F1718',
        // },
        // secondary: {
        //   50:  '#E5EDF5',
        //   100: '#CCDAEB',
        //   200: '#99B6D6',
        //   300: '#6691C1',
        //   400: '#3F72A8',
        //   500: '#355B8C', /* Base color */
        //   600: '#2A4870',
        //   700: '#203554',
        //   800: '#152338',
        //   900: '#0B121C',
        // },
        // accent: {
        //   50:  '#FBEAE8',
        //   100: '#F6D2CB',
        //   200: '#ECA99A',
        //   300: '#E17F6A',
        //   400: '#D9644A', /* Accent base color */
        //   500: '#B64F3B',
        //   600: '#923C2D',
        //   700: '#6E291F',
        //   800: '#4A1813',
        //   900: '#260905',
        // },
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            'li p': {
              margin: '0', // Removes margin for p inside li
            },
          },
        },
      }),
    },
  },
  plugins: [
    typography,
  ],
};

export default config;
