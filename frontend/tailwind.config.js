module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        push: {
          "0%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(5px)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      transitionDelay: {
        0: "0ms",
        100: "100ms",
        200: "200ms",
        300: "300ms",
        400: "400ms",
        500: "500ms",
        600: "600ms",
        700: "700ms",
        800: "800ms",
        900: "900ms",
        1000: "1000ms",
        1100: "1100ms",
        1200: "1200ms",
        1300: "1300ms",
        1400: "1400ms",
        1500: "1500ms",
        2500: "2500ms",
        3500: "2500ms",
        4500: "2500ms",
      },
      animation: {
        push: "push 0.3s ease-in-out",
        fade: "fadeIn 1s ease-in-out",
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
