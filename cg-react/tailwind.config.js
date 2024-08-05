/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    height:{
      52: '52px'
    },
    colors: {
      white:'#fff',
      okhra: {
        100:'#FFEBEB',
        200:"#EA5A69",
        300:'#F02D41'
      },
      siah: "#262626",
      khakeshtari: {
        100:'#F5F5F5',
        200:'#E1E1E1',
        300:'#F3F0EE'
      },
      sabz: {
        100: "#587052",
        200: "#17494D",
      },
    },
    extend: {
      fontFamily: {
        isf: ["IRANSansWeb", "sans-serif"],
        mont: ["Montserrat", "sans-serif"],
      },
    },
  },
  plugins: [],
};
