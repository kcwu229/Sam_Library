import { useEffect, useState } from "react";
import { viewAuthor } from "../../services/AuthorServices";
import { FaRegStar, FaStar } from "react-icons/fa";
import { useParams } from "react-router";
import { FaChevronRight } from "react-icons/fa6";
import { FaPenNib } from "react-icons/fa";
import BlockQuote from "../atoms/BlockQuote";

function AuthorDetailPage() {
  const [author, setAuthor] = useState(null);
  const { id } = useParams(); // Retrieve the id from the URL

  function getAuthor() {
    viewAuthor(id) // Pass the id as a parameter
      .then((response) => {
        setAuthor(response.data);
        console.log(response.data);
      })
      .catch((error) => console.error(error));
  }

  useEffect(() => {
    if (id) {
      getAuthor();
    }
  }, [id]);

  // Todo
  return (
    <div className="w-full pt-32">
      {/* hyperlink */}
      <div className="flex items-center text-left pt-4 ml-28">
        <a href="/authors" className="font-light">
          Author
        </a>{" "}
        <FaChevronRight className="w-3 h-3 ml-2 font-light" />
        {author && (
          <a href="#" className="ml-2 font-light">
            {author.name}
          </a>
        )}
      </div>
      <br />

      {/* Heading */}
      <h1 className="font-bold text-2xl mt-2 ml-28 md:flex-nowrap">
        Meet the Author: A Journey Through Words
      </h1>
      <div className="flex items-center w-full mt-10 flex-col md:flex-row">
        <div className="w-5/12 h-80 md:ml-28">
          {author && (
            <img
              className="md:w-8/12 w-full"
              src={`${process.env.REACT_APP_BASE_URL}/authors/${author.imageName}.png`}
              alt="author image"
            ></img>
          )}

          {/* Ratings */}
          <div className="mt-10">
            <div className="">
              <p>
                <b className="text-xl mt-10">Rating</b>
              </p>
            </div>
            <div className="flex mt-4">
              <FaStar className="w-8 h-8 text-yellow-500" />
              <FaStar className="w-8 h-8 text-yellow-500 ml-4" />
              <FaStar className="w-8 h-8 text-yellow-500 ml-4" />
              <FaRegStar className="w-8 h-8 text-yellow-500 ml-4" />
              <FaRegStar className="w-8 h-8 text-yellow-500 ml-4" />
            </div>
          </div>
        </div>

        {/* Birth Year to Death */}
        <div className="w-7/12 h-80 mr-36">
          <hr className="bg-black text-black h-1 border-0"></hr>
          <div className="w-full md:flex hidden mt-8">
            {author && (
              <div
                className="w-3/12 text-sam-black border 
                border-black rounded-3xl px-5 py-2 text-center 
              items-center mr-4 relative
              justify-center
              md:flex"
              >
                {author.birthYear ? author.birthYear : "Unknown"}
              </div>
            )}
            <br />

            {/* Country */}
            {author && (
              <div
                className="w-3/12 text-sam-black border border-black 
                rounded-3xl px-5 py-2 text-center 
              items-center mr-4 relative
              justify-center
              md:flex"
              >
                <p className="">{author.country}</p>
              </div>
            )}
          </div>

          {/* Country */}
          {author && (
            <h1 className="text-4xl font-bold mt-20 tracking-widest">
              {author.name}
            </h1>
          )}
          <br />
          <br />

          {/* Block Quote */}
          {author && (
            <BlockQuote
              className="w-full"
              text={author && author.catchPhrase}
            />
          )}
          <div className="flex-col">
            <p>
              <b className="text-xl block mt-20">Description:</b>
            </p>
            <p className="block mt-4 font-light tracking-widest leading-loose">
              {author && author.description}
            </p>
          </div>
        </div>
      </div>

      <div className="flex items-center w-full mt-20 h-96"></div>
      <div className="flex items-center w-full mt-20 h-20"></div>
    </div>
  );
}

export default AuthorDetailPage;
