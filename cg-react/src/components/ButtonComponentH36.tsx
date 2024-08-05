import React from "react";

interface ButtonProps {
  text: string;
  iconsrc?: string;
  styling?: string;
  handleOnClick?:React.FC
}
const CustomButtonH36: React.FC<ButtonProps> = ({ text, iconsrc, styling,handleOnClick }) => {
  return (
    <button onClick={handleOnClick}
      className={`h-9 flex items-center gap-2 rounded-2xl py-2 px-4 text-sm text-white font-isf subpixel-antialiased ${styling}`}
      dir="rtl"
    >
      {iconsrc && <img src={iconsrc} alt="logo" className="h-3.5 w-3.5" />}
      {text}
    </button>
  );
};

export default CustomButtonH36;
