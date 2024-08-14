import React from "react";

interface ButtonProps {
  text?: string;
  iconsrc?: string;
  styling?: string;
  handleOnClick?:()=>void

}
const CustomButtonH52 = ({ text, iconsrc, styling,handleOnClick }:ButtonProps) => {
  return (
    <button onClick={handleOnClick}
      className={`flex h-52 items-center gap-2 rounded-3xl px-12 py-4 text-sm text-white font-isf subpixel-antialiased ${styling}`}
      dir="rtl"
    >
      {iconsrc && <img src={iconsrc} alt="logo" className="h-3.5 w-3.5" />}
      <span>{text}</span>
    </button>
  );
};

export default CustomButtonH52;
