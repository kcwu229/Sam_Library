import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAuthor } from "../../services/AuthorServices";
import { FaChevronRight, FaStar } from "react-icons/fa6";
import BlockQuote from "../atoms/BlockQuote"; // Import the BlockQuote component
import RatingSection from "../RatingSection";
import Comments from "../Comments";
import LeaveComment from "../LeaveComment";
import { listAllAuthorReviews } from "../../services/AuthorReviewServices";
import LogoImage from "../../assets/images/article1.png";

function AuthorDetailPage() {
  const { id } = useParams();
  const [author, setAuthor] = useState(null);
  const [reiews, setReviews] = useState([]);
  const ratingType = "author";
  const [userRole, setUerRole] = useState(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("userRole");
    if (storedRole) {
      setUerRole(storedRole);
    }
    if (id) {
      getAuthor(id)
        .then((response) => {
          setAuthor(response.data);
          console.log("Author detail obj", response.data);
        })
        .catch((error) => console.error(error));
    }
    listAllAuthorReviews(id)
      .then((response) => {
        setReviews(response.data);
      })
      .catch((error) => console.error(error));
  }, [id]);

  useEffect(() => {
    console.log(reiews);
  }, [reiews]);

  const handleReviewAdded = (updatedReviews) => {
    setReviews(updatedReviews);
  };

  const sortedReviews = [...reiews].sort(
    (a, b) => new Date(b.createdTimestamp) - new Date(a.createdTimestamp)
  );

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
                  loading="lazy"
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
          <div className="w-full flex flex-col items-center mt-20">
            <RatingSection />
            <div className="w-full flex flex-wrap justify-center gap-8 mt-20">
              {sortedReviews.length > 0 ? (
                sortedReviews.map((review, i) => (
                  <Comments
                    key={i}
                    date={review.createTimestamp}
                    logoImage={LogoImage}
                    user="gggg"
                    review={review.review}
                    rating={review.rating}
                    title={review.title}
                  />
                ))
              ) : (
                <p>No reviews yet</p>
              )}
            </div>
          </div>
          {userRole && (
            <div className="w-full md:w-8/12 mx-auto mt-20">
              <LeaveComment
                ratingType={ratingType}
                id={id}
                onReviewAdded={handleReviewAdded}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthorDetailPage;
