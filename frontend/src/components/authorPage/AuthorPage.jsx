import { listAuthors, showAuthors } from "../../services/AuthorServices";
import { useEffect, useState } from "react";
import SearchBar from "../header/SearchBar";
import RatingFilter from "../authorPage/authorFilter/RatingFilter";
import { VscClose } from "react-icons/vsc";
import { useNavigate } from "react-router-dom";
import { FaPenNib } from "react-icons/fa";
import { deleteAuthor } from "../../services/AuthorServices";
import { useUser } from "../Context/UserContext";
import { FaStar } from "react-icons/fa";

import {
  categories as categoryData,
  languages as languageData,
  exampleBooks as exampleBooksData,
} from "../bookPage/bookFilter/BookFilterData";

import SortFilter from "../authorPage/authorFilter/SortFilter";

function AuthorPage() {
  const [authors, setAuthors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("Fiction");
  const [categoryExpand, setCategoryExpand] = useState(false);
  const [languageExpand, setLanguageExpand] = useState(false);
  const [resultCount, setResultCount] = useState(0);
  const [showButton, setShowButton] = useState(true);
  const categories = categoryData;
  const languages = languageData;
  const [userRole, setUserRole] = useState(null);
  const examplesBooks = exampleBooksData;

  const navigate = useNavigate();

  const removeFilter = () => {
    setShowButton(false);
  };

  const removeAllFilter = () => {};

  const toggleCategoryExpand = () => {
    setCategoryExpand(!categoryExpand);
  };

  const toggleLanguageExpand = () => {
    setLanguageExpand(!languageExpand);
  };

  function deleteAction(id) {
    deleteAuthor(id)
      .then((response) => {
        getAllAuthors();
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function editAction(id) {
    navigate(`/authors/update-author/${id}`);
  }

  function getAllAuthors() {
    listAuthors()
      .then((response) => {
        setAuthors(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function viewOrEditAuthor(id) {
    navigate(`/authors/${id}`);
  }

  function createAuthor() {
    navigate("/authors/create-author");
  }

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUserRole(storedRole);
    }
    getAllAuthors();
  }, []);

  return (
    <div className="w-full min-h-screen pb-32">
      <SearchBar
        buttonText="Author"
        onClickAction={createAuthor}
        logo={<FaPenNib className="text-4xl" />}
        logoText={"AuthorList"}
      />
      <div className="pt-10"></div>
      <h2 className="text-3xl font-bold text-center">Result for {result}</h2>
      <div className="flex flex-col md:flex-row mt-1">
        <div
          id="filter"
          className="w-full md:w-3/12 h-auto md:h-80 pl-10 mb-8 md:mb-0"
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
              {authors.length} products
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
            {authors.map((author) => {
              return (
                <button
                  key={author.id}
                  className="w-full md:w-2/3 lg:w-2/3 xl:w-3/4"
                  onClick={() => viewOrEditAuthor(author.id)}
                >
                  <div class="w-full md:w-5/12 max-w-sm bg-white border border-gray-200 rounded-lg shadow relative">
                    <img
                      loading="lazy"
                      class="p-10 rounded-t-lg h-80"
                      src={`${process.env.REACT_APP_BASE_URL}/authors/${author.imageName}.png`}
                      alt="author image"
                    />
                    <div class="px-5 pb-5">
                      <a href="#">
                        <h5 class="font-bold text-left text-gray-900 tracking-widest">
                          {author.name}
                        </h5>
                        <p class="text-gray-900 mt-2 text-left tracking-wider">
                          {author.birthYear ? author.birthYear : "Unknown"}
                        </p>
                      </a>
                      <div class="flex items-center mt-2.5 mb-5">
                        <div class="flex items-center space-x-1 rtl:space-x-reverse">
                          <FaStar className="w-4 h-4 text-yellow-400" />
                        </div>
                        <span
                          class="bg-green-100 text-green-800 text-xs 
          font-semibold px-2.5 py-0.5 rounded text-right ms-3"
                        >
                          5
                        </span>
                      </div>
                      <div className="flex justify-between">
                        {userRole === "ROLE_ADMIN" && (
                          <button
                            class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
            focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 
            text-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              editAction(author.id);
                            }}
                          >
                            Edit
                          </button>
                        )}

                        {userRole === "ROLE_ADMIN" && (
                          <button
                            class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 
            focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 
            text-center"
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteAction(author.id);
                            }}
                          >
                            Delete
                          </button>
                        )}
                      </div>
                      <div class="flex items-center justify-between"></div>
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

export default AuthorPage;
