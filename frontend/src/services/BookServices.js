import { axiosInstance, axiosFileInstance } from "../axioConfig";

// api route for book Object
const REST_BOOK_API_URL = "/books";

// common list book function, no need auth
export const listBooks = (page, pageSize) =>
  axiosInstance.get(REST_BOOK_API_URL, {
    params: {
      page: page,
      per_page: pageSize,
    },
  });

export const getBook = (bookId) =>
  axiosInstance.get(REST_BOOK_API_URL + "/" + bookId);

export const deleteBook = (bookId) =>
  axiosInstance.delete(REST_BOOK_API_URL + "/" + bookId);

export const createBook = (formData) =>
  axiosFileInstance.post(REST_BOOK_API_URL, formData);

export const updateBook = (bookId, formData) =>
  axiosFileInstance.put(REST_BOOK_API_URL + "/" + bookId, formData);

export const listCategories = (categories) =>
  axiosInstance.get(REST_BOOK_API_URL + "/categories");

export const listSearchResult = (searchField, searchText) =>
  axiosInstance.get(REST_BOOK_API_URL + "/search", {
    params: {
      searchField: searchField,
      searchText: searchText,
    },
  });
