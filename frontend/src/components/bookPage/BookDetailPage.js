import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { getBook } from "../../services/BookServices";
import { FaChevronRight } from "react-icons/fa6";
import BlockQuote from "../atoms/BlockQuote";
import RatingSection from "../RatingSection";
import Comments from "../Comments";
import Pagination from "../Pagination";
import { useNavigate } from "react-router-dom";
import { useToast } from "../Context/ToastMessageContext";
import LeaveComment from "../LeaveComment";
import { FaStar } from "react-icons/fa";
import ConfirmDialog from "../../components/ConfirmDialog";
import { getUser } from "../../services/UserSevices";
import {
  deleteBookReview,
  listAllBookReviews,
} from "../../services/BookReviewServices";
import LogoImage from "../../assets/images/article2.png";
import { Client } from "@stomp/stompjs";
import SockJS from "sockjs-client";

function BookDetailPage() {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [userRole, setUserRole] = useState(null);
  const [userData, setUserData] = useState(null);
  const ratingType = "book";

  // pagination
  const pageSize = 5;
  const [currentPage, setCurrentPage] = useState(1);
  const [reviewCount, setReviewCount] = useState(0);
  const [avgRating, setAvgRating] = useState(0);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const { showToast } = useToast();
  const [bookReviewId, setBookReviewId] = useState(null);

  const [showConfirmDialog, setShowConfirmDialog] = useState(false);

  const handleCancelDelete = () => {
    setShowConfirmDialog(false);
  };
  const handleConfirmDelete = () => {
    handleDeleteAction();
    setShowConfirmDialog(false);
  };
  const handleDeleteClick = (reviewId) => {
    setBookReviewId(reviewId);
    setShowConfirmDialog(true);
  };

  const cacheBuster = new Date().getTime();

  useEffect(() => {
    if (id) {
      // get book info
      getUser(userId)
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error(error);
        });
      getBook(id)
        .then((response) => {
          //console.log("Book detail obj", response.data.image);
          setBook(response.data);
        })
        .catch((error) => console.error(error));

      // get all comments on this book
      listAllBookReviews(id, currentPage, pageSize)
        .then((response) => {
          setReviews(response.data.bookReviews || []);
          setReviewCount(response.data.reviewerCount);
          setAvgRating(response.data.averageRating);
        })
        .catch((error) => {
          console.error(error);
        });

      const storedRole = localStorage.getItem("userRole");
      if (storedRole) {
        setUserRole(storedRole);
      }
    }
  }, [id, currentPage]);

  useEffect(() => {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = new Client({
      webSocketFactory: () => socket,
      debug: (str) => {
        //console.log(str);
      },
      onConnect: () => {
        stompClient.subscribe("/topic/reviews", (message) => {
          const updatedReview = JSON.parse(message.body);
          console.log("Updated review", updatedReview);
          if (updatedReview && updatedReview.rating !== undefined) {
            setReviews((prevReviews) => [updatedReview, ...prevReviews]);
            setAvgRating((prevAvgRating) => {
              const newAvgRating = (
                (prevAvgRating * reviewCount + updatedReview.rating) /
                (reviewCount + 1)
              ).toFixed(2);
              return newAvgRating;
            });
            setReviewCount((prevReviewCount) => prevReviewCount + 1);
          } else {
            console.error("Invalid data structure received:", updatedReview);
          }
        });
      },
    });

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };

    stompClient.activate();

    return () => {
      stompClient.deactivate();
    };
  }, [reviewCount]);

  const handleReviewAdded = (updatedReview) => {
    setReviews((prevReviews) => [updatedReview, ...prevReviews]);
    setAvgRating((prevAvgRating) => {
      const newAvgRating =
        (prevAvgRating * reviewCount + updatedReview.rating) /
        (reviewCount + 1);
      return newAvgRating;
    });
    setReviewCount((prevReviewCount) => prevReviewCount + 1);
  };

  const handleBookReviewId = (reviewId) => {
    setBookReviewId(reviewId);
  };

  function handleDeleteAction() {
    deleteBookReview(id, userId, bookReviewId)
      .then((response) => {
        if (response.status === 200) {
          //console.log("Comment deleted");
          showToast("Comment deleted", "success");
          listAllBookReviews(id, currentPage, pageSize)
            .then((response) => {
              setReviews(response.data.bookReviews || []);
              setReviewCount(response.data.reviewerCount);
              setAvgRating(response.data.averageRating);
            })
            .catch((error) => {
              console.error(error);
            });
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  const paginatedReviews = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return reviews.slice(startIndex, startIndex + pageSize);
  }, [reviews, currentPage, pageSize]);

  const totalPages = useMemo(() => {
    return Math.ceil(reviews.length / pageSize);
  }, [reviews.length, pageSize]);

  const testReview = {
    userImage: "/static/media/userIcon3.374b35dbed09ea94348c.jpg",
    firstName: "admin",
    lastName: "admin",
    username: "admin",
    createTimestamp: "2024-12-04T06:00:52.529017",
    title: "Sample Title",
    review: "Sample Review",
  };

  return (
    <div className="container mx-auto w-screen">
      <div className="flex flex-col min-h-screen">
        {showConfirmDialog && (
          <ConfirmDialog
            message="Are you sure you want to delete this book?"
            onConfirm={handleConfirmDelete}
            onCancel={handleCancelDelete}
          />
        )}
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
                    className="w-7/12 md:w-8/12 lg:w-10/12 xl:w-full"
                    src={
                      book.image.startsWith("http")
                        ? `${book.image}?${cacheBuster}`
                        : `${process.env.REACT_APP_GCP_BUCKET_LOCATION}/${book.image}.jpg?${cacheBuster}`
                    }
                    alt="book cover"
                  />
                )}
              </div>

              {/* Right Column */}
              <div className="md:w-2/3 md:pl-10 mt-10 md:mt-0">
                {/* ISBN and Publish Date */}
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
                        Published Date:{" "}
                        {book.publishedDate !== 0
                          ? book.publishedDate
                          : "Unknown"}
                      </p>
                    </div>
                  )}
                </div>

                {/* BlockQuote */}
                {book && book.catchPhrase && (
                  <div className="mt-10 md:mt-0">
                    <BlockQuote
                      text={book && book.catchPhrase}
                      className="flex"
                    />
                  </div>
                )}

                {/* Author */}
                <div className="flex-col mt-10">
                  <p>
                    <b className="text-xl block">Author</b>
                  </p>
                  <p className="block mt-4 font-light tracking-widest leading-loose text-gray-500">
                    {book && book.author ? book.author : "Unknown"}
                  </p>
                </div>

                {/* Publisher */}
                <div className="flex-col mt-10">
                  <p>
                    <b className="text-xl block">Publisher</b>
                  </p>
                  <p className="block mt-4 font-light tracking-widest leading-loose text-gray-500">
                    {book && book.publisher}
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
              <RatingSection
                overallRating={avgRating}
                reviewerCount={reviewCount}
              />
              <div
                id="commentSection"
                className="w-full flex flex-wrap justify-center gap-8 mt-20"
              >
                {paginatedReviews.length > 0 ? (
                  paginatedReviews.map((review, i) => {
                    //console.log("Review object:", review);
                    return (
                      <div
                        key={i}
                        className="w-full md:w-10/12 lg:w-4/12 xl:w-3/12 bg-white shadow-xl rounded-lg text-gray-900 p-6 relative gap-10 mt-8 border-2 border-gray-200 hover:border-amber-500 hover:shadow-2xl"
                      >
                        <div className="mx-auto w-28 h-28 relative -mt-16 border-gray-700 rounded-full overflow-hidden z-10 gap-10">
                          {userData && (
                            <img
                              className="object-cover object-center h-full w-full"
                              src={userData.image}
                              alt="User"
                            />
                          )}
                        </div>
                        <div className="text-center mt-8 ">
                          {userData && (
                            <h2 className="font-bold text-xl text-black">
                              {userData.firstName} {userData.lastName}
                            </h2>
                          )}
                          {userData && (
                            <p className="text-sm text-gray-500">
                              {userData.username}
                            </p>
                          )}
                          <div className="text-center mt-4 text-sm text-slate-400">
                            {review.createTimestamp}
                          </div>
                          <p className="text-lg mt-4 text-gray-600 break-words whitespace-pre-wrap">
                            {review.title}
                          </p>
                          <div className="mt-4 text-center text-base text-slate-400 px-4 break-words whitespace-pre-wrap">
                            {review.review}
                          </div>
                          <div className="py-4 mt-4 text-gray-700 flex items-center justify-center">
                            {[...Array(5)].map((_, index) => (
                              <FaStar
                                key={index}
                                className={`${
                                  index < review.rating
                                    ? "text-yellow-500"
                                    : "text-gray-300"
                                } w-4 h-4`}
                              />
                            ))}
                            <p className="text-xs ml-4 text-center text-gray-600 font-light break-words whitespace-pre-wrap">
                              {review.rating} out of 5
                            </p>
                          </div>
                        </div>
                        {userId === review.userId && (
                          <div className="flex justify-center mt-10">
                            <div
                              className="w-4/12 text-white bg-red-600 hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center cursor-pointer"
                              onClick={(e) =>
                                handleDeleteClick(review.reviewId)
                              }
                            >
                              Delete
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <p>No reviews yet</p>
                )}
              </div>
            </div>
            <div className="w-full md:w-8/12 lg:w-6/12 mx-auto mt-20">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
              <br />
              {userRole && (
                <LeaveComment
                  ratingType={ratingType}
                  id={id}
                  onReviewAdded={handleReviewAdded}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
