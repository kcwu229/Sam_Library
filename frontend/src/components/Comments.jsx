// Comments.jsx
import React from "react";
import { FaStar } from "react-icons/fa";
import { useState } from "react";
import ConfirmDialog from "../components/ConfirmDialog";

function Comments({ logoImage, review, deleteAction, setBookReviewId }) {
  //console.log(review);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const userId = localStorage.getItem("userId");

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };
  const handleConfirmDelete = () => {
    deleteAction();
    setShowConfirmDialog(false);
  };
  const handleDeleteClick = (e) => {
    setBookReviewId(review.bookReviewDto.id);
    setShowConfirmDialog(true);
  };

  return (
    <div
      className="w-full md:w-10/12 lg:w-4/12 xl:w-3/12 
    bg-white shadow-xl rounded-lg text-gray-900 p-6 relative gap-10 mt-8 
    border-2 border-gray-200 hover:border-amber-500 hover:shadow-2xl"
    >
      {showConfirmDialog && (
        <ConfirmDialog
          message="Are you sure you want to delete this book?"
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
      <div
        className="mx-auto w-28 h-28 relative -mt-16 border-gray-700 rounded-full 
      overflow-hidden z-10 gap-10"
      >
        <img
          className="object-cover object-center h-full w-full"
          src={review.userImage}
          alt="User"
        />
      </div>
      <div className="text-center mt-8 ">
        {review.firstName && review.lastName && (
          <h2 className="font-bold text-xl text-black">
            {review.firstName} {review.lastName}
          </h2>
        )}

        <div className="text-center mt-4 text-sm text-slate-400">
          {review.bookReviewDto.createTimestamp}
        </div>
        <p className="text-lg mt-4 text-gray-600 break-words whitespace-pre-wrap">
          {review.bookReviewDto.title}
        </p>
      </div>

      <div className="mt-4 text-center text-base text-slate-400 px-4 break-words whitespace-pre-wrap">
        {review.bookReviewDto.review}
      </div>
      <div className="py-4 mt-4 text-gray-700 flex items-center justify-center">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < review.bookReviewDto.rating
                ? "text-yellow-500"
                : "text-gray-300"
            } w-4 h-4`}
          />
        ))}
        <p className="text-xs ml-4 text-center text-gray-600 font-light break-words whitespace-pre-wrap">
          {review.bookReviewDto.rating} out of 5
        </p>
      </div>
      {userId === review.userId && (
        <div className="flex justify-center mt-10">
          <div
            className="w-4/12 text-white bg-red-600 hover:bg-red-700 focus:ring-4
                  focus:outline-none focus:ring-blue-300 
                  font-medium rounded-lg
                  text-sm px-3 py-2.5 text-center cursor-pointer"
            onClick={() => {
              setBookReviewId(review.bookReviewDto.id);
              handleDeleteClick();
            }}
          >
            Delete
          </div>
        </div>
      )}
    </div>
  );
}

export default Comments;
