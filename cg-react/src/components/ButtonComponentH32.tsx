import React from "react";
import { JsxElement } from "typescript";

interface ButtonProps {
  text: string;
  iconsrc: string | null;
  styling?: string;
  children?: React.ReactNode;
  handleOnClick?: React.MouseEventHandler<HTMLButtonElement>;
}
const CustomButtonH32: React.FC<ButtonProps> = ({
  text,
  iconsrc,
  styling,
  handleOnClick,
  children,
}) => {
  return (
    <button
      onClick={handleOnClick}
      className={`flex h-[32px] items-center gap-2 rounded-2xl px-4 py-2 font-isf text-sm subpixel-antialiased ${styling}`}
      dir="rtl"
    >
      {children}
      {iconsrc && <img src={iconsrc} alt="logo" className="h-3.5 w-3.5" />}

      {text}
    </button>
  );
};

export default CustomButtonH32;
