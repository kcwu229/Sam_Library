// Comments.jsx
import React from "react";
import { FaStar } from "react-icons/fa";
import LogoImage from "../assets/images/logo.png";

function Comments() {
  return (
    <div
      className="py-4 grid grid-cols-12 border px-8 rounded-2xl 
    border-stone-950 max-xl:max-w-2xl max-xl:mx-auto"
    >
      <div className="grid col-span-2 md:col-span-1">
        <img
          src={LogoImage}
          alt=""
          className="md:w-8 md:h-8 rounded-full w-6 h-6 mt-2"
        />
      </div>
      <div className="grid col-span-10 md:col-span-11">
        <h4 className="font-normal md:font-semibold text-lg text-black flex-row">
          John Watson
        </h4>
        <div className="mt-1 flex items-center gap-2">
          <FaStar className="text-yellow-500 md:w-4 md:h-4 w-3 h-3" />
          <FaStar className="text-yellow-500 md:w-4 md:h-4 w-3 h-3" />
          <FaStar className="text-yellow-500 md:w-4 md:h-4 w-3 h-3" />
          <FaStar className="text-yellow-500 md:w-4 md:h-4 w-3 h-3" />
          <FaStar className="text-yellow-500 md:w-4 md:h-4 w-3 h-3" />
        </div>
        <p className="mt-1 md:text-base text-sm font-light leading-8 text-gray-600 flex-row">
          Nov 01, 2023
        </p>
        <p className="mt-1 text-gray-600 flex-row font-light tracking-widest text-left text-sm md:text-base mb-0">
          One of the standout features of Pagedone is its intuitive and
          user-friendly interface. Navigating through the system feels natural,
          and the layout makes it easy to locate and utilize various design
          elements.
        </p>
      </div>
    </div>
  );
}

export default Comments;
