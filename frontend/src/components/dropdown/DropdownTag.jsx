import React from "react";

function DropdownTag({ value, text }) {
  return (
    <a
      value={value}
      className="block px-4 py-2 hover:bg-gray-100
                "
    >
      {text}
    </a>
  );
}

export default DropdownTag;
