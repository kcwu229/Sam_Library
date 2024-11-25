import React from "react";
import { VscClose } from "react-icons/vsc";

const FilterButtons = ({ showButton, removeFilter, removeAllFilter }) => {
  return (
    <div>
      {showButton && (
        <button
          className="text-sam-black border border-black rounded-3xl 
          px-8 py-2 text-center 
          hover:border-blue-500 hover:border items-center mr-4 relative 
          hover:text-blue-500"
          onClick={removeFilter}
        >
          Fiction
          <VscClose
            className="w-6 h-6 absolute right-0 inset-y-2 py-1 mr-2 
            text-center pointer-events-auto hover:text-blue-500"
          />
        </button>
      )}
      {showButton && (
        <button
          className="text-sam-black border border-black rounded-3xl 
          px-8 py-2 text-center 
          hover:border-blue-500 hover:border items-center mr-4 relative 
          hover:text-blue-500"
          onClick={removeFilter}
        >
          Fiction
          <VscClose
            className="w-6 h-6 absolute right-0 
            inset-y-2 py-1 mr-2 text-center pointer-events-auto hover:text-blue-500"
          />
        </button>
      )}
      {showButton && (
        <button
          className="text-sam-black border 
          border-black rounded-3xl px-8 py-2 text-center 
          hover:border-blue-500 hover:border items-center mr-4 relative 
          hover:text-blue-500"
          onClick={removeFilter}
        >
          Fiction
          <VscClose
            className="w-6 h-6 absolute right-0 inset-y-2 py-1 
            mr-2 text-center pointer-events-auto hover:text-blue-500"
          />
        </button>
      )}
      <a
        href="javascript:void(0);"
        className="inline-block pl-8 hover:text-blue-500"
        onClick={removeAllFilter}
      >
        Clear All
      </a>
    </div>
  );
};

export default FilterButtons;
