import React from "react";

function DropdownTag({ href, value, text }) {
  return (
    <li>
      <a
        href={href}
        value={value}
        class="block px-4 py-2 hover:bg-gray-100
                 dark:hover:bg-gray-600 dark:hover:text-white"
      >
        {text}
      </a>
    </li>
  );
}

export default DropdownTag;
