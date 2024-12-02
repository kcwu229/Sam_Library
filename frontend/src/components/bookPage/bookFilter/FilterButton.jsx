import React from "react";
import { VscClose } from "react-icons/vsc";

const FilterButtons = ({ filterButtons, removeFilter, removeAllFilter }) => {
  return (
    <div className="md:flex flex-wrap items-center hidden">
      {filterButtons.length > 0 && (
        <>
          {filterButtons.map((filterButton, index) => (
            <div
              key={index}
              className=" border rounded-3xl px-8 py-2 text-center border-blue-600 items-center mr-4 relative text-blue-600"
            >
              {filterButton}
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default FilterButtons;
