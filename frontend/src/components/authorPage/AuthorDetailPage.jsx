import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthor } from "../../services/AuthorServices";
import { FaChevronRight, FaStar } from "react-icons/fa6";
import BlockQuote from "../atoms/BlockQuote"; // Import the BlockQuote component
import RatingSection from "../RatingSection";
import Comments from "../Comments";
import LeaveComment from "../LeaveComment";

function AuthorDetailPage() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const ratingType = "author";

  useEffect(() => {
    if (id) {
      getAuthor(id)
        .then((response) => {
          setAuthor(response.data);
          console.log("Author detail obj", response.data);
        })
        .catch((error) => console.error(error));
    }
  }, [id]);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-grow container mx-auto px-4 py-8 w-full md:w-10/12 lg:w-11/12">
        <div className="w-full md:pt-20">
          {/* hyperlink */}
          <div className="flex items-center text-left pt-4">
            <a href="/authors" className="font-light">
              Author
            </a>
            <FaChevronRight className="w-3 h-3 ml-2 font-light" />
            {author && (
              <a
                href={`/authors/${id}`}
                className="ml-2 font-light text-gray-500"
              >
                {author.name}
              </a>
            )}
          </div>

          <div className="flex flex-col md:flex-row mt-10">
            {/* Left Column */}
            <div className="md:w-1/3 flex flex-col items-center">
              {author && (
                <img
                  className="w-full md:w-8/12 lg:w-10/12 xl:w-full"
                  src={`${process.env.REACT_APP_BASE_URL}/authors/${author.imageName}.png`}
                  alt="author cover"
                />
              )}
            </div>

            {/* Right Column */}
            <div className="md:w-2/3 md:pl-10 mt-10 md:mt-0 ">
              {/* ISBN and Publish Year */}
              <div className="flex items-start mb-10">
                {author && author.country && (
                  <div className="p-3 rounded-2xl border border-black">
                    <p className="font-light text-sm">
                      Country : {author.country}
                    </p>
                  </div>
                )}
                <div className="w-6"></div>
                {author && (
                  <div className="p-3 rounded-2xl border border-black mb-4">
                    <p className="font-light text-sm">
                      Published Year:{" "}
                      {author.birthYear !== 0 ? author.birthYear : "Unknown"}
                    </p>
                  </div>
                )}
              </div>

              {/* BlockQuote */}
              <div className="mt-10 md:mt-0">
                <BlockQuote text={author && author.catchPhrase} />
              </div>

              {/* Author */}
              <div className="flex-col mt-10">
                <p>
                  <b className="text-xl block">Author</b>
                </p>
                <p className="block mt-4 font-light tracking-widest leading-loose text-gray-500">
                  {author && author.name}
                </p>
              </div>

              {/* Description */}
              <div className="flex-col w-full mt-10">
                <p>
                  <b className="text-xl block">Description</b>
                </p>
                <p className="block mt-4 font-light tracking-widest leading-loose text-gray-500">
                  {author && author.description}
                </p>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-rows gap-4">
            <RatingSection />
            <div className="flex flex-col gap-4">
              <Comments />
              <Comments />
              <Comments />
            </div>
            <div className="w-full md:w-8/12 mx-auto mt-10">
              {id ? <LeaveComment ratingType={ratingType} id={id} /> : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuthorDetailPage;
