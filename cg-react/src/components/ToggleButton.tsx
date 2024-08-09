import React from 'react'


interface ToggleButtonProps {
    label: string;
}

const ToggleSwitch: React.FC<ToggleButtonProps> =({ label }) => {
    return (
        <label className="inline-flex items-center cursor-pointer space-x-4">
            <span className="ms-3 text-sm font-normal text-sabz-200 dark:text-gray-300">{label}</span>
          <input
            type="checkbox"
            id="flexSwitchCheckDefault"
            className="sr-only peer"
          />
          <div className="relative w-[40px] h-[24px] bg-white peer-focus:outline-none  peer-checked:bg-okhra-200 peer-focus:ring-0 focus:ring-white dark:peer-focus:ring-khakeshtari-400 rounded-full peer dark:bg-gray-700 peer-checked:bg-blue-600 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-[20px] after:w-[20px] after:transition-all dark:border-gray-600"></div>

        </label>
      );
  };

export default ToggleSwitch
