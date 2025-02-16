/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      screens: {
        ltr: { min: "1024px", max: "1286px" },
        ltp: { min: "1281px" },
        dtp: { min: "1024px" },
        tle: { min: "768px", max: "1024px" },
        mbl: { max: "767px" },
      },
    },
  },
  plugins: [],
};
