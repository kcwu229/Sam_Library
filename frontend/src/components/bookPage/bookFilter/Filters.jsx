import React from "react";
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
    <div
      id="filter"
      className="pr-10 py-8 pl-5 h-10/12 bg-white opacity-80 rounded-r-3xl shadow-md"
    >
      <div id="categoryFilter" className="px-3 gap-5 flex flex-col">
        <h2 className="font-semibold mb-3 text-xl">Category</h2>
        {categories.map((category, index) => {
          if (!categoryExpand && index >= 3) return null;
          return (
            <div className="text-lg" key={category.id}>
              <input
                id={category.id}
                type="checkbox"
                className="mb-4 w-4 h-4"
                checked={selectedCategories.includes(category.id)}
                onClick={(e) => {
                  filterHandler(category.id);
                }}
              />
              <label className="ml-4 text-gray-700" htmlFor={category.id}>
                <span className="bg-gray-600 text-white text-sm font-normal px-3 py-1 rounded">
                  {category.label}
                </span>
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
    </div>
  );
};

export default Filters;
