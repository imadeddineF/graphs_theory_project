/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff",
      black: "#000000",

      primary1: "#3A0CA3", // sub links
      primary1hover: "#291e6c",

      primary2: "#3F37C9", // main algorithm links
      primary2Hover: "#2A045D",

      primary3: "#23456E", // header & footer & right sidebar

      primary4: "#111111", // pseudo code

      primary5: "#000000", // buttons background
      primary5hover: "#153000",

      playGroundBg: "#ffffff",

      logData: "#D5f5f5",

      speed: "#12f5f5",

      instructions: "#dbe2ef", // pretty nice color for instructions
    },
  },
  plugins: [],
};
