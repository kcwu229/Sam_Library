import React from "react";
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="flex pagination-controls gap-10 justify-center items-center">
      <div onClick={handlePreviousPage} disabled={currentPage === 1}>
        <FaAngleLeft className="w-8 h-8 cursor-pointer" />
      </div>
      <span>
        {currentPage} of {totalPages ? totalPages : 1}
      </span>
      <div onClick={handleNextPage} disabled={currentPage === totalPages}>
        <FaAngleRight className="w-8 h-8 cursor-pointer tracking-wider" />
      </div>
    </div>
  );
};

export default Pagination;
