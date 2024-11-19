import { MdExpandMore } from "react-icons/md";
import { useState } from "react";
import DropdownTag from "../../dropdown/DropdownTag";

function SortFilter() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // Adjust the delay as needed
  };

  return (
    <div className="relative group flex ml-4">
      <button
        id="dropdownButton"
        onClick={toggleDropdown}
        className="text-white bg-gray-700 hover:bg-gray-800 
          focus:ring-4 focus:outline-none focus:ring-blue-300 
          rounded-l-lg px-4 py-1 text-center items-center 
         inline-flex"
      >
        Sort By <MdExpandMore className="w-5 h-5 ml-2" />
      </button>

      <div
        id="dropdownDelay"
        className={`z-10 absolute mt-14 ${
          dropdownOpen ? "block" : "hidden"
        } bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
        onMouseLeave={closeDropdown}
      >
        <ul
          className="py-2 text-sm text-gray-700"
          aria-labelledby="dropdownBtn"
        >
          <DropdownTag href="" text="Title" value="title" />
          <DropdownTag href="" text="Author" value="author" />
          <DropdownTag href="" text="Date" value="date" />
          <DropdownTag href="" text="Rating" value="rating" />
        </ul>
      </div>
    </div>
  );
}

export default SortFilter;
