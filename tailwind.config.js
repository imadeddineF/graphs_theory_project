/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    colors: {
      white: "#ffffff",
      black: "#000000",

      primary1: "#52B788", // sub links
      primary1hover: "#40916C",

      primary2: "#2D6A4F", // main algorithm links
      primary2Hover: "#1B4332",

      primary3: "#1B4332", // header & footer & right sidebar

      primary4: "#D8F3DC", // pseudo code

      primary5: "#081C15", // buttons background
      primary5hover: "#153000",

      playGroundBg: "#ffffff",

      logData: "#D8F3DC",

      speed: "#95D5B2",

      instructions: "#D8F3DC", // pretty nice color for instructions
    },
  },
  plugins: [],
};
