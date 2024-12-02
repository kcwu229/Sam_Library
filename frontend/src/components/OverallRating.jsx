// OverallRating.jsx
import React from "react";
import { FaStar } from "react-icons/fa";
import { useState, useEffect } from "react";

function OverallRating({ overallRating, reviewerCount }) {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <div className="p-16 bg-amber-50 rounded-3xl flex items-center justify-center flex-col gap-5">
      <h2
        className={`font-manrope font-bold text-8xl text-amber-400 tracking-widest ${
          visible ? "animate-fade" : ""
        }
      `}
      >
        {overallRating}
      </h2>
      <div className="flex items-center justify-center gap-3 sm:gap-6">
        {[...Array(5)].map((_, index) => (
          <FaStar
            key={index}
            className={`${
              index < overallRating ? "text-yellow-500" : "text-gray-300"
            } w-5 h-5`}
          />
        ))}
      </div>
      <p className="font-light text-xl leading-8 text-gray-900 text-center tracking-wide">
        {reviewerCount} members has rated fot it.
      </p>
    </div>
  );
}

export default OverallRating;
