import React from "react";

function DropdownTag({ value, text, iconImage, isActive }) {
  return (
    <a
      value={value}
      className="flex flex-row px-3 py-2 gap-3 items-center hover:bg-blue-500 hover:text-white
      
                "
    >
      {isActive ? (
        <p className="text-purple-600 font-extrabold text-3xl">l</p>
      ) : null}
      {iconImage}
      {text}
    </a>
  );
}

export default DropdownTag;
