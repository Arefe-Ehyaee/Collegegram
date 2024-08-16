import React from "react";

interface ButtonProps {
  text: string;
  iconsrc: string|null;
  styling?: string;
  handleOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const CustomButtonH32: React.FC<ButtonProps> = ({ text, iconsrc, styling,handleOnClick }) => {
  return (
    <button onClick={handleOnClick}
      className={`h-[32px] flex items-center gap-2 rounded-2xl py-2 px-4 text-sm font-isf subpixel-antialiased ${styling}`}
      dir="rtl"
    >
      {iconsrc && <img src={iconsrc} alt="logo" className="h-3.5 w-3.5" />}
      {text}
    </button>
  );
};

export default CustomButtonH32;
