module.exports = {
  mode: "jit",
  purge: [
    "src/**/*.js",
    "src/**/*.jsx",
    "src/**/*.ts",
    "src/**/*.tsx",
    "public/**/*.html",
  ],
  theme: {
    extend: {},
    fontFamily: {
      header: ["Montserrat"],
      body: ["Montserrat"],
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: "#000",
      white: "#fff",
      green: {
        light: "#a1a14c",
        DEFAULT: "#939341",
        dark: "#939341",
        confirm: "#a6ba68",
      },
      grey: {
        light: "#393d36",
        DEFAULT: "#393d36",
        dark: "#2d302a",
      },
      mocha: {
        light: "#afa694",
        DEFAULT: "#afa694",
        dark: "#998f7e",
      },
      cream: {
        light: "#eae6da",
        DEFAULT: "#eae6da",
        dark: "#e0dcd1",
      },
      eggshell: {
        DEFAULT: "#f4f1ed",
      },
      white: {
        DEFAULT: "#fff",
      },
      red: {
        bad: "#d16a46",
        bright: "#f27b57",
      },
    },
    variants: {},
    plugins: {
      "postcss-import": {},
      "tailwindcss/nesting": {},
      tailwindcss: {},
    },
  },
};
