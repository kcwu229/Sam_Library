import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../services/BookServices";
import { FaChevronRight } from "react-icons/fa6";
import BlockQuote from "../atoms/BlockQuote"; // Import the BlockQuote component
import RatingSection from "../RatingSection";
import Comments from "../Comments";
import LeaveComment from "../LeaveComment";
import { listAllBookReviews } from "../../services/BookReviewServices";
import LogoImage from "../../assets/images/article2.png";

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const ratingType = "book";

  useEffect(() => {
    if (id) {
      // get book info
      getBook(id)
        .then((response) => {
          setBook(response.data);
          console.log("Book detail obj", response.data);
        })
        .catch((error) => console.error(error));

      // get all comments on this book
      listAllBookReviews(id)
        .then((response) => {
          setReviews(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  useEffect(() => {
    console.log(reviews);
  }, [reviews]);

  const handleReviewAdded = (updatedReviews) => {
    setReviews(updatedReviews);
  };

  // Sort the comments by createdTimestamp
  const sortedReviews = [...reviews].sort(
    (a, b) => new Date(b.createTimestamp) - new Date(a.createTimestamp)
  );

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col min-h-screen">
        <div className="flex-grow container mx-auto px-4 py-8 w-full md:w-11/12 lg:w-10/12">
          <div className="w-full md:pt-10">
            {/* Hyperlink */}
            <div className="flex items-center text-left pt-4">
              <a href="/books" className="font-light text-gray-500">
                Book
              </a>
              <FaChevronRight className="w-3 h-3 ml-2 font-light text-gray-500" />
              {book && (
                <a
                  href={`/books/${id}`}
                  className="ml-2 font-light text-gray-500"
                >
                  {book.title}
                </a>
              )}
            </div>

            <div className="flex flex-col md:flex-row mt-10">
              {/* Left Column */}
              <div className="md:w-1/3 flex flex-col items-center">
                {book && (
                  <img
                    loading="lazy"
                    className="w-full md:w-8/12 lg:w-10/12 xl:w-full"
                    src={`${process.env.REACT_APP_BASE_URL}/books/${book.imageName}.png`}
                    alt="book cover"
                  />
                )}
              </div>

              {/* Right Column */}
              <div className="md:w-2/3 md:pl-10 mt-10 md:mt-0">
                {/* ISBN and Publish Year */}
                <div className="flex flex-col md:flex-row items-start mb-10">
                  {book && book.isbn && (
                    <div className="p-3 rounded-2xl border border-black mb-4 md:mb-0">
                      <p className="text-sm font-light">ISBN: {book.isbn}</p>
                    </div>
                  )}
                  <div className="w-6"></div>
                  {book && (
                    <div className="p-3 rounded-2xl border border-black">
                      <p className="text-sm font-light">
                        Published Year:{" "}
                        {book.publishedYear !== 0
                          ? book.publishedYear
                          : "Unknown"}
                      </p>
                    </div>
                  )}
                </div>

                {/* BlockQuote */}
                <div className="mt-10 md:mt-0">
                  <BlockQuote text={book && book.catchPhrase} />
                </div>

                {/* Author */}
                <div className="flex-col mt-10">
                  <p>
                    <b className="text-xl block">Author</b>
                  </p>
                  <p className="block mt-4 font-light tracking-widest leading-loose text-gray-500">
                    {book && book.author}
                  </p>
                </div>

                {/* Description */}
                <div className="flex-col w-full mt-10">
                  <p>
                    <b className="text-xl block">Description</b>
                  </p>
                  <p className="block mt-4 font-light tracking-widest leading-loose text-gray-500">
                    {book && book.bookDescription}
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
            <div className="w-full md:w-8/12 lg:w-6/12 mx-auto mt-20">
              {id ? (
                <LeaveComment
                  ratingType={ratingType}
                  id={id}
                  onReviewAdded={handleReviewAdded}
                />
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
