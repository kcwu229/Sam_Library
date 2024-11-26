import React from "react";
import RatingFilter from "./RatingFilter"; // Import RatingFilter if it's a separate component
import { listCategories } from "../../../services/BookServices";
import { useState } from "react";

const Filters = ({
  categories,
  categoryExpand,
  toggleCategoryExpand,
  setBooks,
  originalBooks,
  setCategoryGroup,
  selectedCategories,
  setSelectedCategories,
}) => {
  const filterHandler = (categoryId) => {
    let updatedSelectedCategories;
    if (selectedCategories.includes(categoryId)) {
      updatedSelectedCategories = selectedCategories.filter(
        (id) => id !== categoryId
      );
      // unchecked category, remove it from the list
    } else {
      updatedSelectedCategories = [...selectedCategories, categoryId];
      // checked category, add it to the list
    }
    setSelectedCategories(updatedSelectedCategories);
    setCategoryGroup(updatedSelectedCategories);

    if (updatedSelectedCategories.length === 0) {
      setBooks(originalBooks); // Return the original list of books if no categories are selected
    } else {
      const filteredBooks = originalBooks.filter((book) =>
        updatedSelectedCategories.some((categoryId) =>
          book.category.includes(categoryId)
        )
      );
      setBooks(filteredBooks);
    }
  };

  return (
    <div id="filter" className="px-3">
      <div id="categoryFilter" className="px-3 gap-1">
        <h2 className="font-semibold mb-3">Category</h2>
        {categories.map((category, index) => {
          if (!categoryExpand && index >= 3) return null;
          return (
            <div key={category.id}>
              <input
                id={category.id}
                type="checkbox"
                className="mb-2"
                checked={selectedCategories.includes(category.id)}
                onClick={(e) => {
                  filterHandler(category.id);
                }}
              />
              <label className="ml-4" htmlFor={category.id}>
                {category.label}
              </label>
            </div>
          );
        })}
        <a href="#" className="mb-2 font-medium" onClick={toggleCategoryExpand}>
          {categoryExpand ? "Close" : "See More"}
        </a>
      </div>
      <br />
      <br />
      <div id="ratingFilter ">
        <h2 className="font-semibold mb-3 p-2">Rating</h2>
        <RatingFilter />
      </div>
    </div>
  );
};

export default Filters;
