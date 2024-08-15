import React from 'react';

interface BoxTitleProps {
  text: string;
}

const BoxTitle: React.FC<BoxTitleProps> = ({ text }) => {
  return (
    <div className={"text-xl text-siah text-center"}>
        {text}
    </div>
  );
};

export default BoxTitle;
