/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        one: "#6C5070",
        two: "#DF6A6A",
        three: "#F6F6E3",
        four: "#C2DBC1",
      },
    },
  },
  plugins: [],
};
