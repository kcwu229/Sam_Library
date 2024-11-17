import { useState } from "react";
import { IoLibrarySharp } from "react-icons/io5";
import { IoMdSearch } from "react-icons/io";
import { MdExpandMore } from "react-icons/md";
import DropdownTag from "../dropdown/DropdownTag";

function SearchBar() {
  const [bookName, setBookName] = useState("");
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
    <div className="fixed pt-4 top-28 w-full bg-white shadow z-50">
      <div className="flex items-center justify-between px-3 pb-4">
        <div className="hidden md:flex" id="bookLogo">
          <IoLibrarySharp className="text-4xl" />
          <span className="ml-2 text-4xl font-bold">Book List</span>
        </div>

        <div className="flex w-full max-w-5xl ml-4">
          <div className="relative group flex">
            <button
              id="dropdownButton"
              onClick={toggleDropdown}
              className="text-sam-gray bg-blue-700 hover:bg-blue-800 
              focus:ring-4 focus:outline-none focus:ring-blue-300 
              rounded-l-lg px-4 py-2 text-center items-center 
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 inline-flex"
            >
              Category <MdExpandMore className="w-5 h-5 ml-2" />
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
                <DropdownTag href="" text="All" value="all" />
                <DropdownTag href="" text="Title" value="title" />
                <DropdownTag href="" text="Author" value="author" />
                <DropdownTag href="" text="ISBN" value="isbn" />
                <DropdownTag href="" text="Publisher" value="publisher" />
                <DropdownTag href="" text="AdvanceSearch" value="advance" />
              </ul>
            </div>
          </div>

          <input
            className="shadow appearance-none border-t border-b border-r w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="searchField"
            type="text"
            placeholder="Enter book name"
            value={bookName}
            onChange={(e) => setBookName(e.target.value)}
          />
          <button
            id="searchButton"
            className="bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 py-2 px-4 rounded-r-lg text-white flex items-center justify-center"
          >
            <IoMdSearch className="w-5 h-5" />
          </button>
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default SearchBar;
