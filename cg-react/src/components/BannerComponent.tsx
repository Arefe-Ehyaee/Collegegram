import React from "react";

interface bannerProps {
  text: string;
  iconsrc?: string;
  styling?: string;
}
const Banner: React.FC<bannerProps> = ({ text, iconsrc, styling }) => {
  return (
    <div
      className={`text-meshki flex h-[52px] w-[281px] items-center justify-center gap-2 rounded-2xl px-4 py-2 font-isf text-base font-normal subpixel-antialiased ${styling}`}
      dir="rtl"
    >
      {text}
      {iconsrc && (
        <img src={iconsrc} alt="icon" className="h-[16px] w-[16px]" />
      )}
    </div>
  );
};

export default Banner;
