// Comments.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

function Comments({ logoImage, review }) {
  //const formattedDate = new Date(date).toLocaleDateString();
  console.log(review);

  return (
    <div className="w-full md:w-10/12 lg:w-4/12 xl:w-3/12 bg-white shadow-xl rounded-lg text-gray-900 p-6 relative gap-8 mt-8">
      <div className="mx-auto w-28 h-28 relative -mt-16 border-4 border-white rounded-full overflow-hidden z-10">
        <img
          className="object-cover object-center h-full w-full"
          src={logoImage}
          alt="User"
        />
      </div>
      <div className="text-center mt-8">
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
    </div>
  );
}

export default Comments;
