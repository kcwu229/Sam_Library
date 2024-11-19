import { listAuthors, showAuthors } from "../../services/AuthorServices";
import { useEffect, useState } from "react";
import SearchBar from "../header/SearchBar";
import RatingFilter from "../authorPage/authorFilter/RatingFilter";
import { VscClose } from "react-icons/vsc";
import AuthorCard from "../authorPage/authorFilter/AuthorCard";
import { useNavigate } from "react-router-dom";
import { FaPenNib } from "react-icons/fa";
import { deleteAuthor } from "../../services/AuthorServices";

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
    navigate(`/authors/${id}`);
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
      <h2 className="text-3xl font-bold text-center pt-32">
        Result for {result}
      </h2>
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
                  <AuthorCard
                    id={author.id}
                    imageSource={`${process.env.REACT_APP_BASE_URL}/authors/${author.imageName}.png`}
                    name={author.name}
                    yearOfBirth={
                      author.birthYear ? author.birthYear : "Unknown"
                    }
                    rating={5}
                    remainingCount={4}
                    deleteAction={() => deleteAction(author.id)}
                    editAction={() => editAction(author.id)}
                  />
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
