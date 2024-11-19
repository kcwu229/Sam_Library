import React from "react";
import { Link } from "react-router-dom";

function NavBarTag({ href, text, isActive, onClick }) {
  return (
    <li>
      <Link
        to={href}
        onClick={onClick}
        className={`block py-2 px-4 rounded-lg transition duration-300 ease-in-out transform ${
          isActive
            ? "bg-white text-gray-700 animate-push"
            : "text-gray-300 hover:bg-gray-700 hover:text-white"
        }`}
      >
        {text}
      </Link>
    </li>
  );
}

export default NavBarTag;
