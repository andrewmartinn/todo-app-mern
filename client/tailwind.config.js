/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#EA40A4",
          200: "#3A82EE",
          300: "#EEE",
          400: "#313154",
          500: "#FF5B57",
        },
      },
      fontFamily: {
        "dm-sans": "'DM Sans', serif",
      },
    },
  },
  plugins: [],
};
