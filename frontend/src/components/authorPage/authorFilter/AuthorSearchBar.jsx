import { useState } from "react";
import { FaPenFancy } from "react-icons/fa";
import { IoMdSearch } from "react-icons/io";
import { MdExpandMore } from "react-icons/md";
import DropdownTag from "../../dropdown/DropdownTag";
import { useNavigate } from "react-router-dom";

function AuthorSearchBar() {
  const [authorName, setauthorName] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  const closeDropdown = () => {
    setTimeout(() => {
      setDropdownOpen(false);
    }, 200); // Adjust the delay as needed
  };

  const createAuthor = () => {
    navigate("create-author");
  };

  return (
    <div className="fixed pt-4 top-28 w-full bg-white shadow z-50">
      <div className="flex items-center justify-between px-3 pb-4">
        <div className="hidden md:flex" id="bookLogo">
          <FaPenFancy className="text-4xl" />
          <span className="ml-2 text-3xl font-bold">Author List</span>
        </div>
        <div className="flex w-full max-w-5xl ml-4">
          <div className="relative group flex">
            <button
              id="dropdownButton"
              onClick={toggleDropdown}
              className="text-white bg-green-600 hover:bg-green-800 
              focus:ring-4 focus:outline-none focus:ring-green-300 
              rounded-l-lg px-4 py-2 text-center items-center 
              inline-flex"
            >
              Category <MdExpandMore className="w-5 h-5 ml-2" />
            </button>
            <div
              id="dropdownDelay"
              className={`z-10 absolute mt-14 ${
                dropdownOpen ? "block" : "hidden"
              } bg-white divide-y divide-yellow-100 rounded-lg shadow w-44`}
              onMouseLeave={closeDropdown}
            >
              <ul className="py-2 text-sm" aria-labelledby="dropdownBtn">
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
            className="shadow appearance-none border-t border-b border-r w-full py-2 px-3 text-yellow-700 leading-tight focus:outline-none focus:shadow-outline"
            id="searchField"
            type="text"
            placeholder="Enter author name"
            value={authorName}
            onChange={(e) => setauthorName(e.target.value)}
          />
          <button
            id="searchButton"
            className="bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 py-2 px-4 rounded-r-lg text-white flex items-center justify-center"
          >
            <IoMdSearch className="w-5 h-5" />
          </button>
        </div>
        <button
          class="text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:outline-none focus:ring-yellow-600 
            font-bold rounded-lg text-sm px-5 py-2.5 
            text-center"
          onClick={createAuthor}
        >
          Create Author
        </button>
        <div></div>
      </div>
    </div>
  );
}

export default AuthorSearchBar;
