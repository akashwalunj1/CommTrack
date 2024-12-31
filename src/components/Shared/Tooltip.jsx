
import React from 'react';

const Tooltip = ({ text, children }) => {
  return (
    <div className="relative group">
      {children}
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-full mb-2 w-32 p-2 bg-gray-800 text-white text-center rounded opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        {text}
      </div>
    </div>
  );
};

export default Tooltip;
