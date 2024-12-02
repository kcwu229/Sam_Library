import { MdExpandMore } from "react-icons/md";
import { useState } from "react";
import DropdownTag from "../../dropdown/DropdownTag";

function SortFilter({ onSortChange, currentSort }) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // Adjust the delay as needed
  };

  const handleSortSelect = (value) => {
    onSortChange(value);
    closeDropdown();
  };

  return (
    <div className="relative group flex ml-4">
      <button
        id="dropdownButton"
        onClick={toggleDropdown}
        className="text-white bg-gray-700 hover:bg-gray-800 
          focus:ring-4 focus:outline-none focus:ring-blue-300  text-sm font-light
          rounded-lg px-4 py-2 text-center items-center 
         inline-flex"
      >
        Sort By {currentSort} <MdExpandMore className="w-5 h-5 ml-2" />
      </button>

      <div
        id="dropdownDelay"
        className={`z-10 absolute mt-14 ${
          dropdownOpen ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44`}
        onMouseLeave={closeDropdown}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownBtn"
        >
          <li onClick={() => handleSortSelect("title")}>
            <DropdownTag text="Title" value="title" />
          </li>
          <li onClick={() => handleSortSelect("author")}>
            <DropdownTag text="Author" value="author" />
          </li>
          <li onClick={() => handleSortSelect("date")}>
            <DropdownTag text="Date" value="date" />
          </li>
          <li onClick={() => handleSortSelect("rating")}>
            <DropdownTag text="Rating" value="rating" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default SortFilter;
