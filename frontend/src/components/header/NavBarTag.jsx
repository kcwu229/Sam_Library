import React from "react";
import { Link } from "react-router-dom";

function NavBarTag({ href, text, isActive, onClick, iconImage }) {
  return (
    <li>
      <Link
        to={href}
        onClick={onClick}
        className={` flex felx-row py-2 px-4 rounded-lg transition duration-300 ease-in-out transform gap-2 ${
          isActive
            ? "bg-white text-gray-700 animate-push"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        {iconImage}

        {text}
      </Link>
    </li>
  );
}

export default NavBarTag;
