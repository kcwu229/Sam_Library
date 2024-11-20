// Comments.jsx
import React from "react";
import { FaStar } from "react-icons/fa";

function Comments() {
  return (
    <div className="pt-11 w-full pb-8 border px-14 rounded-2xl py-1 border-stone-950 max-xl:max-w-2xl max-xl:mx-auto">
      <div className="flex items-center gap-3 mb-4">
        <FaStar className="text-yellow-500 w-6 h-6" />
        <FaStar className="text-yellow-500 w-6 h-6" />
        <FaStar className="text-yellow-500 w-6 h-6" />
        <FaStar className="text-yellow-500 w-6 h-6" />
        <FaStar className="text-yellow-500 w-6 h-6" />
      </div>
      <h3 className="font-manrope font-semibold text-xl sm:text-2xl leading-9 text-black mb-6">
        Outstanding Experience!!!
      </h3>
      <div className="flex sm:items-center flex-col min-[400px]:flex-row justify-between gap-5 mb-4">
        <div className="flex items-center gap-3">
          <img
            src="https://pagedone.io/asset/uploads/1704349572.png"
            alt="John image"
            className="w-8 h-8 rounded-full object-cover"
          />
          <h6 className="font-semibold text-lg leading-8 text-indigo-600">
            John Watson
          </h6>
        </div>
        <p className="font-normal text-lg leading-8 text-gray-400">
          Nov 01, 2023
        </p>
      </div>
      <p className="font-normal text-lg leading-8 text-gray-400 max-xl:text-justify">
        One of the standout features of Pagedone is its intuitive and
        user-friendly interface. Navigating through the system feels natural,
        and the layout makes it easy to locate and utilize various design
        elements. This is particularly beneficial for designers looking to
        streamline their workflow.
      </p>
    </div>
  );
}

export default Comments;
