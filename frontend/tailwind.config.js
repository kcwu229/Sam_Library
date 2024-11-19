module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        push: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        push: "push 0.3s ease-in-out",
      },
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
