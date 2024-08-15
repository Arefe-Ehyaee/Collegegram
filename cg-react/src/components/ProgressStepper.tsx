import React from "react";

interface ProgressStepperProps {
  currentStep: number; // To determine the current step
}

const ProgressStepper: React.FC<ProgressStepperProps> = ({ currentStep }) => {
  return (
    <div className="relative">
      <h2 className="sr-only">Steps</h2>

      {/* Connecting line: full width with dynamic color */}
      <div className="absolute top-[1.75rem] left-0 right-0 h-1 bg-khakeshtari-400 z-0"></div>

      {/* Active line segments */}
      <div
        className={`absolute top-[1.75rem] left-0 h-1 z-10 ${
          currentStep >= 2 ? "bg-siah" : "bg-transparent"
        }`}
        style={{ width: currentStep >= 3 ? "100%" : "50%" }}
      ></div>

      <ol className="text-siah relative z-20 grid grid-cols-3 text-sm font-medium">
        {/* Step 1 */}
        <li className="relative flex flex-col items-start">
          <span
            className={`absolute -bottom-[1.75rem] start-0 rounded-full border ${
              currentStep >= 1 ? "bg-siah border-siah text-white" : "bg-white border-siah"
            }`}
          >
            {/* SVG icon for completed */}
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="hidden sm:block mt-6"> Details </span>
        </li>

        {/* Step 2 */}
        <li className="relative flex flex-col items-center">
          <span
            className={`absolute -bottom-[1.75rem] left-1/2 -translate-x-1/2 rounded-full border ${
              currentStep >= 2 ? "bg-siah border-siah text-white" : "bg-white border-siah"
            }`}
          >
            {/* SVG icon for completed */}
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="hidden sm:block mt-6"> Address </span>
        </li>

        {/* Step 3 */}
        <li className="relative flex flex-col items-end">
          <span
            className={`absolute -bottom-[1.75rem] end-0 rounded-full border ${
              currentStep >= 3 ? "bg-siah border-siah text-white" : "bg-white border-siah"
            }`}
          >
            {/* SVG icon for completed */}
            <svg
              className="h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
          </span>
          <span className="hidden sm:block mt-6"> Payment </span>
        </li>
      </ol>
    </div>
  );
};

export default ProgressStepper;
