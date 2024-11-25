// LoadingSpinner.jsx
import React from "react";
import "./../LoadingSpinner.css"; // Make sure to create this CSS file

const LoadingSpinner = () => {
  return (
    <div className="spinner-container flex flex-col gap-10">
      <div className="loading-spinner"></div>
      <div>
        <div className="loading-text text-xl">Preparing the data for you</div>
      </div>
    </div>
  );
};

export default LoadingSpinner;
