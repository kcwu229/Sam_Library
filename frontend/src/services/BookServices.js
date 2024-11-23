import axios from "axios";
import axiosInstance from "../axioConfig";

// base api route
const REST_API_URL = "http://localhost:8080/api/";
axios.defaults.baseURL = REST_API_URL;

// api route for book Object
const REST_BOOK_API_URL = "http://localhost:8080/api/books";

// common list book function, no need auth
export const listBooks = (books) => axios.get(REST_BOOK_API_URL);

export const getBook = (bookId) => axios.get(REST_BOOK_API_URL + "/" + bookId);

export const deleteBook = (bookId) =>
  axiosInstance.delete(REST_BOOK_API_URL + "/" + bookId);
