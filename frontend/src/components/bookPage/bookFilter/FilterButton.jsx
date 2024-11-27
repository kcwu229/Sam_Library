import React from "react";
import { VscClose } from "react-icons/vsc";

const FilterButtons = ({ filterButtons, removeFilter, removeAllFilter }) => {
  return (
    <div className="flex flex-wrap items-center">
      {filterButtons.map((filterButton, index) => (
        <button
          key={index}
          className="text-sam-black border border-black rounded-3xl px-8 py-2 text-center hover:border-blue-500 hover:border items-center mr-4 relative hover:text-blue-500"
          onClick={() => removeFilter(filterButton)}
        >
          {filterButton}
          <VscClose className="w-6 h-6 absolute right-0 inset-y-2 py-1 mr-2 text-center pointer-events-auto hover:text-blue-500" />
        </button>
      ))}
      <a
        href="#"
        className="inline-block pl-8 hover:text-blue-500"
        onClick={(e) => {
          e.preventDefault();
          removeAllFilter();
        }}
      >
        Clear All
      </a>
    </div>
  );
};

export default FilterButtons;
