import axios from "axios";
import axiosInstance from "../axioConfig";

const REST_BOOK_API_URL = "http://localhost:8080/api/books-reviews";

export const createBookReview = (bookId) =>
  axiosInstance.post(REST_BOOK_API_URL + "/" + bookId);

export const listBookReviews = (bookId) =>
  axiosInstance.get(REST_BOOK_API_URL + "/" + bookId);
