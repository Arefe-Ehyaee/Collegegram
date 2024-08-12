import React from 'react';

interface HashtagProps {
  text: string;
}

const Hashtag: React.FC<HashtagProps> = ({ text }) => {
  return (
    <span className="bg-okhra-200 text-white text-xs font-medium me-1 px-[6px] h-[24px] rounded dark:bg-gray-700 dark:text-blue-400 border border-blue-400">{` ${text} `}</span>
  );
};

export default Hashtag;
