import { deleteBook, listBooks } from "../../services/BookServices";
import { useEffect, useState } from "react";
import SearchBar from "../header/SearchBar";
import { useNavigate } from "react-router-dom";
import { IoLibrarySharp } from "react-icons/io5";
import { MdOutlineFilterAlt } from "react-icons/md";
import Pagination from "../Pagination";
import BookCard from "./BookCard"; // Import the new BookCard component
import Filters from "./bookFilter/Filters";
import LoadingSpinner from "../LoadingSpinner";

import categories from "../bookPage/bookFilter/BookFilterData";

import SortFilter from "../bookPage/bookFilter/SortFilter";
import FilterButtons from "./bookFilter/FilterButton";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [originalBooks, setOriginalBooks] = useState([]);
  const [categoryExpand, setCategoryExpand] = useState(false);
  const [languageExpand, setLanguageExpand] = useState(false);

  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sortCriteria, setSortCriteria] = useState(""); // Add sorting state
  const [categoryGroup, setCategoryGroup] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // pagination
  const pageSize = 20; // Set your desired page size
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBooks = books.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(books.length / pageSize);
  const navigate = useNavigate();

  //search result
  const handleSearchResults = (data, searchField, searchText) => {
    setBooks(data);
    setSearchField(searchField);
    setSearchText(searchText);
    setLoading(false);
  };

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
    fetchBooks(currentPage, pageSize);
  }, [currentPage]);

  async function fetchBooks(page, pageSize) {
    const response = await listBooks(page, pageSize);
    setBooks(response.data);
    setOriginalBooks(response.data);
    setLoading(false);
  }

  const toggleCategoryExpand = () => {
    setCategoryExpand(!categoryExpand);
  };

  const toggleLanguageExpand = () => {
    setLanguageExpand(!languageExpand);
  };

  // sorting
  const handleSortChange = (criteria) => {
    setSortCriteria(criteria);
    sortBooks(criteria);
  };

  const handlingFilter = () => {
    setShowFilter(!showFilter);
  };

  const sortBooks = (criteria) => {
    const sortedBooks = [...books].sort((a, b) => {
      if (criteria === "title") {
        return a.title.localeCompare(b.title);
      } else if (criteria === "author") {
        return a.author.localeCompare(b.author);
      } else if (criteria === "date") {
        return a.publishedDate.localeCompare(b.publishedDate);
      } else if (criteria === "rating") {
        return a.rating - b.rating;
      }
      return 0;
    });
    setBooks(sortedBooks);
  };

  function deleteAction(id) {
    deleteBook(id)
      .then((response) => {
        console.log(response);
        fetchBooks(currentPage, pageSize);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function createBook() {
    navigate("/books/create-book");
  }

  function viewOrEditBook(id) {
    navigate(`/books/${id}`);
  }

  function editAction(id) {
    navigate(`/books/update-book/${id}`);
  }

  return (
    <div className="w-full min-h-screen relative">
      <SearchBar
        buttonText="Book"
        onClickAction={createBook}
        logo={<IoLibrarySharp className="text-4xl" />}
        logoText={"BookList"}
        onSearchResults={handleSearchResults}
        setLoading={setLoading}
      />

      <div className="flex items-center justify-center mt-14">
        <FilterButtons
          className="flex justify-center"
          filterButtons={categoryGroup}
          removeFilter={""}
          removeAllFilter={""}
        />
        {searchField != "" && searchText != "" && (
          <h2 className="text-3xl font-bold text-center mt-14">
            Result for {searchField} field : {searchText}
          </h2>
        )}
      </div>

      <div className="flex flex-col md:flex-row">
        {/* The filter section */}
        <div>
          <button>
            <div className="bg-slate-800 p-2 mt-20 rounded">
              <MdOutlineFilterAlt
                className="w-8 h-8 text-white"
                onClick={handlingFilter}
              />
              <p className="text-white">Filter</p>
            </div>
          </button>

          {showFilter && (
            <div className="py-4 px-2">
              <Filters
                categories={categories}
                categoryExpand={categoryExpand}
                toggleCategoryExpand={toggleCategoryExpand}
                setBooks={setBooks}
                originalBooks={originalBooks}
                setCategoryGroup={setCategoryGroup}
                categoryGroup={categoryGroup}
                selectedCategories={selectedCategories}
                setSelectedCategories={setSelectedCategories} //
              />
            </div>
          )}
        </div>
        <div className="w-full md:w-9/12 flex flex-col space-y-4 items-center justify-center">
          <div id="resultList">
            <div className="flex justify-between text-xl tracking-wider mt-4">
              {books.length > 0
                ? books.length.toLocaleString() + " results found "
                : "No results found"}

              <SortFilter
                onSortChange={handleSortChange}
                currentSort={sortCriteria}
                className="right-0"
              />
            </div>
          </div>
          <br />
          <div className="flex flex-wrap justify-center items-center gap-5 mt-4">
            {loading && <LoadingSpinner />}
            {paginatedBooks.map((book) => {
              return (
                <BookCard
                  key={book.id}
                  book={book}
                  userRole={userRole}
                  viewOrEditBook={viewOrEditBook}
                  editAction={editAction}
                  deleteAction={deleteAction}
                />
              );
            })}
          </div>
          <br />
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
          <div className="pt-32"></div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
