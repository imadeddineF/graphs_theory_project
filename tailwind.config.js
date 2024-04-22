/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff",
      black: "#000000",

      primary1: "#1D7B21", // sub links
      primary1hover: "#40916C",

      primary2: "#69EA6E", // main algorithm links
      primary2hover: "#1B4332",

      primaryAlgoTitles: "#69EA6E", // main algorithm titles

      primary3: "#64E469", // header & footer & right sidebar

      primary4: "#D8F3DC", // pseudo code

      primary5: "#032B12", // buttons background
      primary5hover: "#153000",
      primaryTextBtn: "#69EA6E",

      playGroundBg: "#ffffff",

      logData: "#D8F3DC",

      pseudocode: "#4C862D",

      speed: "#95D5B2",

      instructions: "#D8F3DC", // pretty nice color for instructions
    },
  },
  plugins: [],
};
