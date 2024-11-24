import axios from "axios";
import { axiosInstance, axiosFileInstance } from "../axioConfig";

// api route for book Object
const REST_BOOK_API_URL = "http://localhost:8080/api/books";

// common list book function, no need auth
export const listBooks = (books) => axiosInstance.get(REST_BOOK_API_URL);

export const getBook = (bookId) =>
  axiosInstance.get(REST_BOOK_API_URL + "/" + bookId);

export const deleteBook = (bookId) =>
  axiosInstance.delete(REST_BOOK_API_URL + "/" + bookId);

export const createBook = (formData) =>
  axiosFileInstance.post(REST_BOOK_API_URL, formData);

export const updateBook = (bookId, formData) =>
  axiosFileInstance.put(REST_BOOK_API_URL + "/" + bookId, formData);
