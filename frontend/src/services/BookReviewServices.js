import axios from "axios";
import { axiosInstance } from "../axioConfig";

const REST_BOOKREVIEW_API_URL = "/books-reviews";

export const createBookReview = (bookId, bookReviewData, userId) => {
  return axiosInstance.post(
    REST_BOOKREVIEW_API_URL + "/" + bookId,
    bookReviewData,
    {
      params: {
        userId: userId,
      },
    }
  );
};

export const listAllBookReviews = (bookId, page, pageSize) =>
  axios.get(REST_BOOKREVIEW_API_URL + "/all/" + bookId, {
    params: {
      page,
      pageSize,
    },
  });

export const deleteBookReview = (bookId, userId, bookReviewId) => {
  return axiosInstance.delete(REST_BOOKREVIEW_API_URL + "/" + bookId, {
    params: {
      bookReviewId: bookReviewId,
      userId: userId,
    },
  });
};
