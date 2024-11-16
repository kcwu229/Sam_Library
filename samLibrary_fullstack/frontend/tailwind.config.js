module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Open Sans", "sans-serif"],
      },
      colors: {
        "sam-black": "#080d0c",
        "sam-dark-gray": "#bfb7b0",
        "sam-orange": "#e45f2b",
        "sam-light-brown": "#a68c7c",
        "sam-gray": "#f2f2f2",
      },
    },
    fontFamily: {
      sans: ["Open Sans", "sans-serif"],
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
