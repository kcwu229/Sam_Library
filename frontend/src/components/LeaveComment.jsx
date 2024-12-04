import { useState } from "react";
import InputTag from "./form/InputTag";
import LabelsTag from "./form/LabelsTag";
import CreateFormErrorTag from "./form/CreateFormErrorTag";
import TextAreaTag from "./form/TextAreaTag";
import { FaStar } from "react-icons/fa";
import { useToast } from "./Context/ToastMessageContext";

import {
  createAuthorReview,
  listAllAuthorReviews,
} from "../services/AuthorReviewServices";
import {
  createBookReview,
  listAllBookReviews,
} from "../services/BookReviewServices";
import { Link, useNavigate, useLocation } from "react-router-dom";

function LeaveComment({ ratingType, id, userData }) {
  const [title, setTitle] = useState("");
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0);
  const [errors, setErrors] = useState({
    title: "",
    review: "",
    rating: "",
  });

  const { showToast } = useToast();
  const navigate = useNavigate();
  const location = useLocation();

  function validateForm() {
    let valid = true;

    const errorsCopy = { ...errors };

    if (title.trim()) {
      errorsCopy.title = "";
    } else {
      valid = false;
      errorsCopy.title = "Title is required!";
    }

    if (review.trim()) {
      errorsCopy.review = "";
    } else {
      valid = false;
      errorsCopy.review = "review is required!";
    }

    setErrors(errorsCopy);
    return valid;
  }

  const submitComment = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (ratingType === "book") {
          const reviewData = {
            title,
            review,
            rating,
          };

          // call api to create book reviews
          const userId = localStorage.getItem("userId");

          const response = await createBookReview(id, reviewData, userId);
          if (response.status === 201) {
            showToast("Review added successfully!", "success");
          } else {
            showToast("Review not added!", "error");
          }
          //console.log("Book review created:", response.data);
          //const updatedReviews = await listAllBookReviews(id);
          //onReviewAdded(updatedReviews.data);
          setTitle("");
          setReview("");
          setRating(0);

          document
            .getElementById("commentSection")
            .scrollIntoView({ behavior: "smooth" }); // Scroll to comment section
          //window.scrollTo({ top: 0, behavior: "smooth" });
        } else if (ratingType === "author") {
          const reviewData = {
            title,
            review,
            rating,
          };

          // call api to create author reviews
          const response = await createAuthorReview(id, reviewData);
          console.log("author review created:", response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <div className="w-full flex items-center justify-center relative p-4">
      {!userData.firstName || !userData.lastName ? (
        <div className="flex flex-col gap-4 justify-center items-center text-center">
          <div className="flex items-center mt-3">
            <hr className="flex-grow border-t border-orange-500" />
            <span className="px-3 text-orange-500 font-bold text-3xl">
              Leave your comment
            </span>
            <hr className="flex-grow border-t border-orange-500" />
          </div>
          <p className="text-gray-500 font-light">
            Update your user firstName and lastName to enable the comment
            function
          </p>
          <div className="text-blue-500">
            <Link
              to={`/user-profile/${userData.id}`}
              state={{ from: location.pathname }}
            >
              click here
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-2xl">
          <form className="w-full relative" onSubmit={submitComment}>
            <h1 className="text-center font-bold text-2xl">Add your comment</h1>
            <br />
            <div className="mb-4 relative">
              <LabelsTag htmlFor="title" text="Title" required="*" />
              <InputTag
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                text="Title"
                error={errors.title}
              />
              {errors.title && <CreateFormErrorTag error={errors.title} />}
            </div>

            <div className="mb-4 relative">
              <LabelsTag
                htmlFor="rating"
                text="Rating   (Leave it empty if you don't think it's deserved)"
                required="*"
              />
              <div className="flex items-center">
                {[1, 2, 3, 4, 5].map((star) => (
                  <label key={star}>
                    <input
                      type="radio"
                      name="rating"
                      value={star}
                      onClick={() => setRating(star)}
                      className="hidden"
                      disabled={!userData.firstName || !userData.lastName}
                    />
                    <FaStar
                      className={`cursor-pointer ${
                        star <= rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      size={30}
                    />
                  </label>
                ))}
              </div>
              {errors.rating && <CreateFormErrorTag error={errors.rating} />}
            </div>

            <div className="mb-10 relative">
              <LabelsTag
                htmlFor="review"
                text="Write your review"
                required="*"
              />
              <TextAreaTag
                id="review"
                name="review"
                value={review}
                onChange={(e) => setReview(e.target.value)}
                text="Enter your review"
                error={errors.review}
              />
              <p className="mt-4 text-gray-600 text-xs italic">
                Not more than 2000 characters
              </p>
              {errors.review && <CreateFormErrorTag error={errors.review} />}
            </div>

            <button
              className="bg-amber-400 hover:bg-amber-500 text-white font-bold py-3 px-4 
            rounded focus:outline-none mt-4 focus:shadow-outline w-full"
              type="submit"
            >
              Leave Comment
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

export default LeaveComment;
