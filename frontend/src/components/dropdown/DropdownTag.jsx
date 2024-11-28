import React from "react";

function DropdownTag({ value, text }) {
  return (
    <a
      value={value}
      className="block px-4 py-2 hover:bg-blue-500 hover:text-white
                "
    >
      {text}
    </a>
  );
}

export default DropdownTag;
