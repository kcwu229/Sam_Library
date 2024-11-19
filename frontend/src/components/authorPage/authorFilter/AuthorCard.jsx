import { FaStar } from "react-icons/fa";

function AuthorCard({
  name,
  yearOfBirth,
  rating,
  imageSource,
  editAction,
  deleteAction,
}) {
  return (
    <div class="w-full md:w-5/12 max-w-sm bg-white border border-gray-200 rounded-lg shadow relative">
      <img
        class="p-10 rounded-t-lg h-80"
        src={imageSource}
        alt="author image"
      />
      <div class="px-5 pb-5">
        <a href="#">
          <h5 class="font-bold text-left text-gray-900 tracking-widest">
            {name}
          </h5>
          <p class="text-gray-900 mt-2 text-left tracking-wider">
            {yearOfBirth}
          </p>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
          <div class="flex items-center space-x-1 rtl:space-x-reverse">
            <FaStar className="w-4 h-4 text-yellow-400" />
            <FaStar className="w-4 h-4 text-yellow-400" />
            <FaStar className="w-4 h-4 text-yellow-400" />
            <FaStar className="w-4 h-4 text-yellow-400" />
            <FaStar className="w-4 h-4 text-yellow-400" />
          </div>
          <span
            class="bg-green-100 text-green-800 text-xs 
          font-semibold px-2.5 py-0.5 rounded text-right ms-3"
          >
            {rating}
          </span>
        </div>
        <div className="flex justify-between">
          <button
            class="text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 
            focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 
            text-center"
            onClick={(e) => {
              e.stopPropagation();
              editAction();
            }}
          >
            Edit
          </button>
          <button
            class="text-white bg-red-600 hover:bg-red-700 focus:ring-4 
            focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 
            text-center"
            onClick={(e) => {
              e.stopPropagation();
              deleteAction();
            }}
          >
            Delete
          </button>
        </div>
        <div class="flex items-center justify-between"></div>
      </div>
    </div>
  );
}

export default AuthorCard;
