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
    function ({ addComponents }) {
      addComponents({
        'hr': {
          background: 'linear-gradient(to right, #dda853, #16404d)',
          opacity: '0.2',
          marginTop: '1rem',
          marginBottom: '1rem',
          height: '2px',  // Optional: Adjust thickness of the `<hr>`
        },
      })
    },
  ],
};

export default config;
