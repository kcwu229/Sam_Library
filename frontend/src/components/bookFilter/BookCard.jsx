import { FaStar } from "react-icons/fa";
import Article1Image from "../../assets/images/article1.png";

function BookCard({ title, author, rating, remainingCount }) {
  return (
    <div class="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow relative">
      <img class="p-8 rounded-t-lg" src={Article1Image} alt="product image" />
      <div class="px-5 pb-5">
        <a href="#">
          <h5 class="font-bold text-gray-900">{title}</h5>
          <p class="text-gray-900 mt-2">{author}</p>
        </a>
        <div class="flex items-center mt-2.5 mb-5">
          <div class="flex items-center space-x-1 rtl:space-x-reverse">
            <FaStar className="w-4 h-4 text-yellow-400" />
            <FaStar className="w-4 h-4 text-yellow-400" />
            <FaStar className="w-4 h-4 text-yellow-400" />
            <FaStar className="w-4 h-4 text-yellow-400" />
            <FaStar className="w-4 h-4 text-yellow-400" />
          </div>
          <span class="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
            {rating}
          </span>
          <span class="absolute  text-black text-right right-3 p-3">
            {remainingCount} item left
          </span>
        </div>
        <div class="flex items-center justify-between">
          <button
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm px-5 py-2.5 
            text-center"
          >
            Borrow Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookCard;
