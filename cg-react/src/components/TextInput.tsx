import React, { useState } from "react";
interface InputProps {
  name: string;
  type: string;
  placeholder: string;
  iconsrc?: string;
  styling?: string;
  onChange?:React.FC
}

const InputField :React.FC<InputProps>= ({ name, placeholder, type, onChange, styling, iconsrc }) => {
  const [inputValue, setInputValue] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    if (onChange) {
      onChange(e);
    }
  };

  return(
    <div className="relative">
    {iconsrc && !inputValue && <img src={iconsrc} alt="user" className="h-4 w-4 absolute top-1/2 right-3 transform -translate-y-1/2 "/>}
    <input
      type={type}
      name={name}
      id={name}
      className={`flex flex-col items-center w-80 h-12 border border-gray px-4 py-2 rounded-2xl text-xs font-normal placeholder-gray font-isf ${styling} placeholder-start`}
      dir="rtl"
      placeholder={placeholder}
      onChange={handleChange}
    />
    </div>
  )
  
}

  


export default InputField;
