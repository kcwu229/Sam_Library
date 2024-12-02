// RatingSection.jsx
import React from "react";
import OverallRating from "./OverallRating";
import Comments from "./Comments";

function RatingSection({ overallRating, reviewerCount }) {
  return (
    <div className="py-4 relative">
      <div className="w-full max-w-7xl px-4 md:px-5 lg:px-6 mx-auto">
        <h2 className="font-manrope font-bold text-xl text-black mb-8 text-center">
          Overall reviews
        </h2>
        <div className="flex flex-col md:flex-row justify-center">
          <OverallRating
            className="flex"
            overallRating={overallRating}
            reviewerCount={reviewerCount}
          />
        </div>
      </div>
    </div>
  );
}

export default RatingSection;
