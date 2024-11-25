import React from "react";
import RatingFilter from "./RatingFilter"; // Import RatingFilter if it's a separate component

const Filters = ({
  categories,
  categoryExpand,
  toggleCategoryExpand,
  languages,
  languageExpand,
  toggleLanguageExpand,
}) => {
  return (
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
              <input id={category.id} type="checkbox" className="mb-2 mx-2" />
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
              <input id={language.id} type="checkbox" className="mb-2 mx-2" />
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
  );
};

export default Filters;
