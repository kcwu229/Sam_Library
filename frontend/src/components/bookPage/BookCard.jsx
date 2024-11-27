import React from "react";
import { FaStar } from "react-icons/fa";
import ConfirmDialog from "../ConfirmDialog";
import { useState } from "react";

const BookCard = ({
  book,
  userRole,
  viewOrEditBook,
  editAction,
  deleteAction,
}) => {
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowConfirmDialog(true);
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };
  const handleConfirmDelete = () => {
    deleteAction(book.id);
    setShowConfirmDialog(false);
  };
  return (
    <div className="md:w-1/2 lg:w-1/3 xl:w-1/4 sm:justify-center">
      {showConfirmDialog && (
        <ConfirmDialog
          message="Are you sure you want to delete this book?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div key={book.id} onClick={() => viewOrEditBook(book.id)}>
        <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow relative">
          <img
            loading="lazy"
            className="p-8 rounded-t-lg h-80"
            // to-do add handling for missing image && if image is on server or local
            src={
              book.image.startsWith("http")
                ? book.image
                : `${process.env.REACT_APP_BASE_URL}/books/${book.image}.png`
            }
            alt="product image"
          />
          <div className="px-5 pb-5 text-left">
            <a href="#">
              <h5 className="font-bold text-gray-900 tracking-wider">
                {book.title.length >= 25
                  ? book.title.slice(0, 25) + "..."
                  : book.title}
              </h5>
              <p className="text-gray-900 font-light mt-2 tracking-wide">
                {book.author
                  ? book.author.length > 10
                    ? book.author.slice(0, 10) + "..."
                    : book.author
                  : "Unknown Author"}
              </p>
              <p className="text-gray-900 font-light mt-2 tracking-wide">
                {book.publishedDate ? book.publishedDate : "Unknown Date"}
              </p>
            </a>
            <div className="flex items-center mt-2.5 mb-5">
              <div className="flex items-center space-x-1 rtl:space-x-reverse">
                <FaStar className="w-4 h-4 text-yellow-400" />
              </div>
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                5
              </span>
            </div>
            <div className="flex items-center justify-between">
              {userRole === "USER" && (
                <div
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    alert("Coming Soon!");
                  }}
                >
                  Borrow Now
                </div>
              )}
              {userRole === "ADMIN" && (
                <div
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                  onClick={(e) => {
                    e.stopPropagation();
                    editAction(book.id);
                  }}
                >
                  Edit
                </div>
              )}
              {userRole === "ADMIN" && (
                <div
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-4
                  focus:outline-none focus:ring-blue-300 font-medium rounded-lg
                  text-sm px-5 py-2.5 text-center"
                  onClick={handleDeleteClick}
                >
                  Delete
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
