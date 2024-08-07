import React from 'react';

interface BoxProps {
  height: string;
  children?: React.ReactNode;
}

const Box: React.FC<BoxProps> = ({ height, children }) => {
  return (
    <div
      className={`relative box-width box-style rounded-3xl py-16 px-0  flex items-center justify-center`}
      style={{ height: `${height}` }}
    >
      {children}
    </div>
  );
};

export default Box;
