import { showBooks } from "../services/BookServices";
import { useEffect, useState } from "react";
import SearchBar from "./header/SearchBar";
import RatingFilter from "./bookFilter/RatingFilter";
import {
  categories as categoryData,
  languages as languageData,
} from "./bookFilter/BookFilterData";
import SortFilter from "./bookFilter/SortFilter";

function BookPage() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [result, setResult] = useState("Fiction");
  const [categoryExpand, setCategoryExpand] = useState(false);
  const [languageExpand, setLanguageExpand] = useState(false);
  const [resultCount, setResultCount] = useState(0);

  const categories = categoryData;
  const languages = languageData;

  const toggleCategoryExpand = () => {
    setCategoryExpand(!categoryExpand);
  };

  const toggleLanguageExpand = () => {
    setLanguageExpand(!languageExpand);
  };

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await showBooks();
        setBooks(response.data);
        setLoading(false);
      } catch (error) {
        console.error("There was an error fetching the books!", error);
      }
    }
    fetchBooks();
  }, []);

  return (
    <div className="w-full">
      <SearchBar />
      <h1 className="text-4xl font-bold text-center">Result for {result}</h1>
      <br />
      <div className="flex mt-5">
        <div id="filter" className="w-3/12 h-80 pl-3">
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
          {/* 3. Rating Filter */}
          <div id="ratingFilter">
            <h2 className="font-semibold mb-3">Rating</h2>
            <RatingFilter />
          </div>
        </div>
        <div className="w-9/12 flex flex-col space-y-4">
          {/* Another halfpage */}
          <div id="resultList" className="">
            <div className="flex justify-between">
              {resultCount} products
              <SortFilter className="right-0" />
            </div>
          </div>
          <div className="w-full">
            <button className="text-sam-black border border-black rounded-lg px-4 py-1 text-center items-center mr-4">
              Fiction
            </button>
            <button className="text-sam-black border border-black rounded-lg px-4 py-1 text-center items-center mr-4">
              Fiction
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookPage;
