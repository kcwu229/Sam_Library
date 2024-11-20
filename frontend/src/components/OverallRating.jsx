// OverallRating.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

function OverallRating() {
  return (
    <div className="p-10 bg-amber-50 rounded-3xl flex items-center justify-center flex-col">
      <h2 className="font-manrope font-bold text-5xl text-amber-400 mb-6 tracking-widest">
        4.3
      </h2>
      <div className="flex items-center justify-center gap-3 sm:gap-6 mb-4">
        {[...Array(5)].map((_, index) => (
          <FaStar key={index} className="text-amber-400 w-8 h-8" />
        ))}
      </div>
      <p className="font-light text-xl leading-8 text-gray-900 text-center tracking-wide">
        46 Ratings
      </p>
    </div>
  );
}

export default OverallRating;
