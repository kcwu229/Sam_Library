import { FaRegStar, FaStar } from "react-icons/fa"; // blank star and full star

function RatingFilter() {
  const ratings = [5, 4, 3, 2, 1];

  return (
    <div className="flex flex-col gap-1">
      {ratings.map((rating, index) => (
        <div key={index} className="flex items-center mb-2 ml-3">
          <input type="checkbox" className="mr-3" />
          <div className="flex">
            <FaStar className="w-5 h-5 text-yellow-500" />{" "}
            <p className="">{rating}</p>
          </div>
          <h1 className="ml-2">and up</h1>
        </div>
      ))}
    </div>
  );
}

export default RatingFilter;
