import { deleteBook, listBooks } from "../../services/BookServices";
import { useEffect, useState } from "react";
import SearchBar from "../header/SearchBar";
import RatingFilter from "../bookPage/bookFilter/RatingFilter";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { IoLibrarySharp } from "react-icons/io5";
import { useUser } from "../Context/UserContext";
import { FaStar } from "react-icons/fa";

import {
  categories as categoryData,
  languages as languageData,
  exampleBooks as exampleBooksData,
} from "../bookPage/bookFilter/BookFilterData";

import SortFilter from "../bookPage/bookFilter/SortFilter";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [result, setResult] = useState("Fiction");
  const [categoryExpand, setCategoryExpand] = useState(false);
  const [languageExpand, setLanguageExpand] = useState(false);
  const [resultCount, setResultCount] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const categories = categoryData;
  const languages = languageData;
  const exampleBooks = exampleBooksData;
  const [userRole, setUserRole] = useState(null);

  const removeFilter = () => {
    setShowButton(false);
  };

  const navigate = useNavigate();

  const removeAllFilter = () => {};

  const toggleCategoryExpand = () => {
    setCategoryExpand(!categoryExpand);
  };

  const toggleLanguageExpand = () => {
    setLanguageExpand(!languageExpand);
  };

  function getAllBooks() {
    listBooks()
      .then((response) => {
        console.log("I am now sending ...");
        setBooks(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function deleteAction(id) {
    deleteBook(id)
      .then((response) => {
        getAllBooks();
      })
      .then((error) => {
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

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
    getAllBooks();
  }, []);

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
        <div
          id="filter"
          className="w-full md:w-3/12 h-auto md:h-80 pl-8 mb-8 md:mb-0"
        >
          <div id="categoryFilter">
            <h2 className="font-semibold mb-3">Category</h2>
            {categories.map((category, index) => {
              if (!categoryExpand && index >= 3) return null;
              return (
                <div key={category.id}>
                  <input
                    id={category.id}
                    type="checkbox"
                    className="mb-2 mx-2"
                  />
                  <label htmlFor={category.id}>{category.label}</label>
                </div>
              );
            })}
            <a
              href="#"
              className="mb-2 mx-2 font-medium"
              onClick={toggleCategoryExpand}
            >
              {categoryExpand ? "Close" : "See More"}
            </a>
          </div>
          <br />
          <div id="languageFilter">
            <h2 className="font-semibold mb-3">Language</h2>
            {languages.map((language, index) => {
              if (!languageExpand && index >= 3) return null;
              return (
                <div key={language.id}>
                  <input
                    id={language.id}
                    type="checkbox"
                    className="mb-2 mx-2"
                  />
                  <label htmlFor={language.id}>{language.label}</label>
                </div>
              );
            })}
            <a
              href="#"
              className="mb-2 mx-2 font-medium"
              onClick={toggleLanguageExpand}
            >
              {languageExpand ? "Close" : "See More"}
            </a>
          </div>
          <br />
          <div id="ratingFilter">
            <h2 className="font-semibold mb-3">Rating</h2>
            <RatingFilter />
          </div>
        </div>
        <div className="w-full md:w-9/12 flex flex-col space-y-4">
          <div id="resultList" className="">
            <div className="flex justify-between">
              {books.length} products
              <SortFilter className="right-0" />
            </div>
          </div>
          <div className="w-full">
            {showButton && (
              <button
                className="text-sam-black border border-black rounded-3xl 
                px-8 py-2 text-center 
              hover:border-blue-500 hover:border items-center mr-4 relative 
              hover:text-blue-500"
                onClick={removeFilter}
              >
                Fiction
                <VscClose
                  className="w-6 h-6 absolute right-0 inset-y-2 py-1 mr-2 
                text-center pointer-events-auto  hover:text-blue-500"
                />
              </button>
            )}
            {showButton && (
              <button
                className="text-sam-black border border-black rounded-3xl 
                px-8 py-2 text-center 
              hover:border-blue-500 hover:border items-center mr-4 relative 
              hover:text-blue-500"
                onClick={removeFilter}
              >
                Fiction
                <VscClose
                  className="w-6 h-6 absolute right-0 
                inset-y-2 py-1 mr-2 text-center pointer-events-auto  hover:text-blue-500"
                />
              </button>
            )}
            {showButton && (
              <button
                className="text-sam-black border 
                border-black rounded-3xl px-8 py-2 text-center 
              hover:border-blue-500 hover:border items-center mr-4 relative 
              hover:text-blue-500"
                onClick={removeFilter}
              >
                Fiction
                <VscClose
                  className="w-6 h-6 absolute right-0 inset-y-2 py-1 
                mr-2 text-center pointer-events-auto  hover:text-blue-500"
                />
              </button>
            )}
            <a
              href="javascript:void(0);"
              className="inline-block pl-8 hover:text-blue-500"
              onClick={removeAllFilter}
            >
              Clear All
            </a>
            <br />
          </div>
          <br />
          <hr />
          <br />
          <div className="w-full mt-4 flex flex-wrap gap-5 mx-4">
            {books.map((book) => {
              return (
                <button
                  key={book.id}
                  className="w-full md:w-1/2 lg:w-1/3 xl:w-1/4"
                  onClick={() => viewOrEditBook(book.id)}
                >
                  <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow relative">
                    <img
                      loading="lazy"
                      class="p-8 rounded-t-lg h-80"
                      src={`${process.env.REACT_APP_BASE_URL}/books/${book.imageName}.png`}
                      alt="product image"
                    />
                    <div class="px-5 pb-5 text-left">
                      <a href="#">
                        <h5 class="font-bold text-gray-900 tracking-wider">
                          {book.title}
                        </h5>
                        <p class="text-gray-900 font-light mt-2 tracking-wide">
                          {book.author ? book.author : "Unknown"}
                        </p>
                      </a>
                      <div class="flex items-center mt-2.5 mb-5">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse">
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <FaStar className="w-4 h-4 text-yellow-400" />
                          <FaStar className="w-4 h-4 text-yellow-400" />
                        </div>
                        <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                          5
                        </span>
                        <span class="absolute  text-black text-right right-3 p-3 font-l">
                          4 item left
                        </span>
                      </div>
                      <div class="flex items-center justify-between">
                        {userRole === "USER" && (
                          <button
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 
            text-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              alert("Coming Soon!");
                            }}
                          >
                            Borrow Now
                          </button>
                        )}
                        {userRole === "ADMIN" && (
                          <button
                            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 
            text-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              editAction(book.id);
                            }}
                          >
                            Edit
                          </button>
                        )}
                        {userRole === "ADMIN" && (
                          <button
                            class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 
            focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 
            text-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteAction(book.id);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
          <div className="pt-32"></div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
