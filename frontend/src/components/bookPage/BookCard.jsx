import React from "react";
import { FaStar } from "react-icons/fa";
import ConfirmDialog from "../ConfirmDialog";
import { useState } from "react";
import { useToast } from "../Context/ToastMessageContext";
import NotFoundImage from "../../assets/images/ImageNotFound.jpg";

const BookCard = ({
  book,
  userRole,
  viewOrEditBook,
  editAction,
  deleteAction,
}) => {
  const { showToast } = useToast();
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setShowConfirmDialog(true);
  };

  // Generate a cache-busting query parameter
  const cacheBuster = new Date().getTime();

  const handleImageError = (event) => {
    event.target.src = NotFoundImage;
  };

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };
  const handleConfirmDelete = () => {
    deleteAction(book.id);
    //showToast("The book is deleted", "success");
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
      <div
        className="flex justify-center items-center"
        key={book.id}
        onClick={() => viewOrEditBook(book.id)}
      >
        <div
          className="w-full max-w-sm bg-white border 
        hover:translate-y-2 hover:border-amber-400 hover:border-2 border-gray-300 rounded-xl shadow relativ items-center"
        >
          {book.image != null && (
            <img
              loading="lazy"
              className="p-8 rounded-t-lg h-80 w-60 md:w-10/12"
              src={
                book.image.startsWith("http")
                  ? `${book.image}?${cacheBuster}`
                  : `${process.env.REACT_APP_GCP_BUCKET_LOCATION}/${book.image}.jpg?${cacheBuster}`
              }
              onError={handleImageError}
              alt="product image"
            />
          )}

          <div className="px-5 pb-5 text-left">
            <a href="#">
              {book.title && (
                <h5 className="font-bold text-gray-900 tracking-wider">
                  {book.title.length >= 25
                    ? book.title.slice(0, 25) + "..."
                    : book.title}
                </h5>
              )}
              {book.author && (
                <p className="text-gray-900 font-light mt-2 tracking-wide">
                  {book.author
                    ? book.author.length > 15
                      ? book.author.slice(0, 15) + "..."
                      : book.author
                    : "Unknown Author"}
                </p>
              )}
              {book.publishedDate && (
                <p className="text-gray-900 font-light mt-2 tracking-wide">
                  {book.publishedDate ? book.publishedDate : "Unknown Date"}
                </p>
              )}
            </a>
            <div className="flex items-center mt-2.5 mb-5">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-2 rounded dark:bg-blue-200 dark:text-blue-800">
                {book.category.length > 0
                  ? book.category.length > 15
                    ? book.category.slice(0, 15) + " ..."
                    : book.category
                  : "No category"}
              </span>
            </div>
            <div className="flex items-center justify-between">
              {userRole === "USER" && (
                <div
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
                font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
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
                font-medium rounded-lg text-sm px-5 py-2.5 text-center cursor-pointer"
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
                  text-sm px-5 py-2.5 text-center cursor-pointer"
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
