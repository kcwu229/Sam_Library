import { deleteBook, listBooks } from "../../services/BookServices";
import { useEffect, useState } from "react";
import SearchBar from "../header/SearchBar";
import { useNavigate } from "react-router-dom";
import { IoLibrarySharp } from "react-icons/io5";
import { useUser } from "../Context/UserContext";
import Pagination from "../Pagination";
import BookCard from "./BookCard"; // Import the new BookCard component
import Filters from "./bookFilter/FilterList";
import LoadingSpinner from "../LoadingSpinner";

import categories from "../bookPage/bookFilter/BookFilterData";

import SortFilter from "../bookPage/bookFilter/SortFilter";
import FilterButtons from "./bookFilter/FilterButton";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [result, setResult] = useState("Fiction");
  const [categoryExpand, setCategoryExpand] = useState(false);
  const [languageExpand, setLanguageExpand] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const [loading, setLoading] = useState(true);
  const [userRole, setUserRole] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchField, setSearchField] = useState("");
  const [sortCriteria, setSortCriteria] = useState(""); // Add sorting state

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

  if (loading) {
    return <LoadingSpinner />;
  }

  async function fetchBooks(page, pageSize) {
    const response = await listBooks(page, pageSize);
    setBooks(response.data);
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
    <div className="w-full min-h-screen">
      <SearchBar
        buttonText="Book"
        onClickAction={createBook}
        logo={<IoLibrarySharp className="text-4xl" />}
        logoText={"BookList"}
        onSearchResults={handleSearchResults}
        setLoading={setLoading}
      />
      <div className="pt-10"></div>
      {searchField != "" && searchText != "" && (
        <h2 className="text-3xl font-bold text-center">
          Result for {searchField} field : {searchText}
        </h2>
      )}

      <div className="flex flex-col md:flex-row mt-1">
        <Filters
          categories={categories}
          categoryExpand={categoryExpand}
          toggleCategoryExpand={toggleCategoryExpand}
        />
        <div className="w-full md:w-9/12 flex flex-col space-y-4">
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
          <div className="w-full mt-4 flex flex-wrap gap-10 mx-4">
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
