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

import {
  categories as categoryData,
  languages as languageData,
  exampleBooks as exampleBooksData,
} from "../bookPage/bookFilter/BookFilterData";

import SortFilter from "../bookPage/bookFilter/SortFilter";
import FilterButtons from "./bookFilter/FilterButton";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [result, setResult] = useState("Fiction");
  const [categoryExpand, setCategoryExpand] = useState(false);
  const [languageExpand, setLanguageExpand] = useState(false);
  const [showButton, setShowButton] = useState(true);
  const categories = categoryData;
  const [loading, setLoading] = useState(true);
  const languages = languageData;
  const exampleBooks = exampleBooksData;
  const [userRole, setUserRole] = useState(null);

  // pagination
  const pageSize = 20; // Set your desired page size
  const [currentPage, setCurrentPage] = useState(1);
  const startIndex = (currentPage - 1) * pageSize;
  const paginatedBooks = books.slice(startIndex, startIndex + pageSize);
  const totalPages = Math.ceil(books.length / pageSize);
  const navigate = useNavigate();

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
      />
      <div className="pt-10"></div>
      <h2 className="text-3xl font-bold text-center">Result for {result}</h2>
      <div className="flex flex-col md:flex-row mt-1">
        <Filters
          categories={categories}
          categoryExpand={categoryExpand}
          toggleCategoryExpand={toggleCategoryExpand}
          languages={languages}
          languageExpand={languageExpand}
          toggleLanguageExpand={toggleLanguageExpand}
        />
        <div className="w-full md:w-9/12 flex flex-col space-y-4">
          <div id="resultList" className="">
            <div className="flex justify-between">
              {books.length} products
              <SortFilter className="right-0" />
            </div>
          </div>
          <div className="w-full">
            <FilterButtons />
            <br />
          </div>
          <br />
          <hr />
          <br />
          <div className="w-full mt-4 flex flex-wrap gap-5 mx-4">
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
