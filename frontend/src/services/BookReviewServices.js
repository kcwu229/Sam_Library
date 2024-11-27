import axios from "axios";
import { axiosInstance } from "../axioConfig";

const REST_BOOKREVIEW_API_URL = "http://localhost:8080/api/books-reviews";

export const createBookReview = (bookId, bookReviewData, username) =>
  axiosInstance.post(REST_BOOKREVIEW_API_URL + "/" + bookId, bookReviewData, {
    params: {
      username: username,
    },
  });

export const listAllBookReviews = (bookId, page, pageSize) =>
  axios.get(REST_BOOKREVIEW_API_URL + "/all/" + bookId, {
    params: {
      page,
      pageSize,
    },
  });
