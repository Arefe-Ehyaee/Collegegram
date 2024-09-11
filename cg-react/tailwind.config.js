/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
        colors: {
      white:'#fff',
      okhra: {
        100:'#FFEBEB',
        200:"#EA5A69",
        300:'#F02D41',
        400: '#CC0000'
      },
      siah: "#262626",
      meshki: "#191919",
      khakeshtari: {
        100:'#F5F5F5',
        200:'#E1E1E1',
        300:'#F3F0EE',
        400:'#CDCDCD',
        500:'#A5A5A5',
        400: '#CDCDCD',
        500:'#f2f2f2',
        600: '#F8F9F9',
        700: '#C4C4D0'
      },
      sabz: {
        100: "#587052",
        200: "#17494D",
        300: "#C3F9C2",
        400: "#17494D",
      },
      gray: "#CDCDCD",
      tala:'#C19008',
      ghahvei: "#604A4A",
      darkBlue: "#17494D",
      yasi: "#E9E4FF",
    },
    extend: {
      fontFamily: {
        isf: ["IRANSansWeb", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
      },
    },
    boxShadow: {
      'main':'5px 5px 45px 0px #00000080',
      'check': '0px 0px 8px 0px #0000001A',
      'none': '0 0 #0000'
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp')
  ],
};
