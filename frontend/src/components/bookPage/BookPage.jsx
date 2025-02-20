import { deleteBook, listBooks } from "../../services/BookServices";
import { useEffect, useState } from "react";
import SearchBar from "../header/SearchBar";
import { useNavigate } from "react-router-dom";
import { IoLibrarySharp } from "react-icons/io5";
import { MdOutlineFilterAlt } from "react-icons/md";
import Pagination from "../Pagination";
import { useToast } from "../Context/ToastMessageContext";

import BookCard from "./BookCard"; // Import the new BookCard component
import Filters from "./bookFilter/Filters";
import LoadingSpinner from "../LoadingSpinner";

import categories from "../bookPage/bookFilter/BookFilterData";

import SortFilter from "../bookPage/bookFilter/SortFilter";
import FilterButtons from "./bookFilter/FilterButton";
import PageNotFound from "../PageNotFound";

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
  const [hasNetworkError, setHasNetworkError] = useState(false);

  // pagination
  const pageSize = 20; // Set your desired page size
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBooks = books.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(books.length / pageSize);
  const navigate = useNavigate();
  const { showToast } = useToast();

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
    const fetchData = async () => {
      await fetchBooks(currentPage, pageSize);
    };
    fetchData();
  }, [currentPage, hasNetworkError]);

  async function fetchBooks(page, pageSize) {
    try {
      const response = await listBooks(page, pageSize);
      setBooks(response.data);
      setOriginalBooks(response.data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setHasNetworkError(true);
    }
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

  async function deleteAction(bookId) {
    try {
      await deleteBook(bookId); // Assuming deleteBook is a function that makes the API call to delete the book
      setBooks((prevBooks) => prevBooks.filter((book) => book.id !== bookId));
      setOriginalBooks((prevBooks) =>
        prevBooks.filter((book) => book.id !== bookId)
      );
      //showToast("Book deleted successfully", "success");
    } catch (error) {
      console.error("Error deleting book:", error);
      showToast("Error deleting book", "error");
    }
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
    <>
      {!hasNetworkError ? (
        <div className="w-full min-h-screen relative bg-gray-100">
          <SearchBar
            id="searchBar"
            buttonText="Book"
            onClickAction={createBook}
            onSearchResults={handleSearchResults}
            setLoading={setLoading}
          />

          <div className="flex flex-col items-center justify-center mt-14">
            <FilterButtons
              className="md:flex md:justify-center hidden"
              filterButtons={categoryGroup}
            />
            {searchField != "" && searchText != "" && (
              <h2 className="text-4xl font-bold text-center mt-14">
                Result for {searchField} field : {searchText}
              </h2>
            )}
          </div>

          <div className="flex flex-col md:flex-row">
            {/* The filter section */}
            <div>
              <button>
                <div className="bg-gray-700 opacity-100 p-3 px-5 mt-20 rounded-tr-2xl flex flex-col gap-3">
                  <MdOutlineFilterAlt
                    className="w-8 h-8 text-white"
                    onClick={handlingFilter}
                  />
                  <p className="text-white">Filter</p>
                </div>
              </button>

              {showFilter && (
                <div>
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
            <div className="w-full md:w-9/12 flex flex-col space-y-4">
              <div id="resultList">
                <div className="flex justify-between text-xl tracking-wider mt-10">
                  <div className="flex justify-start"></div>
                  <h3 className="flex justify-center text-2xl font-semibold tracking-wide">
                    {books.length > 0
                      ? books.length.toLocaleString() + " results found "
                      : "No results found"}
                  </h3>
                  <SortFilter
                    onSortChange={handleSortChange}
                    currentSort={sortCriteria}
                    className="right-0 flex justify-end"
                  />
                  <></>
                </div>
                {loading && <LoadingSpinner />}
              </div>
              <br />

              <div className="flex flex-wrap justify-center items-center gap-5 mt-4 w-full">
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
      ) : (
        <>
          <PageNotFound />
        </>
      )}
    </>
  );
}

export default BookPage;
