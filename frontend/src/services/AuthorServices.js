import axios from "axios";
import axiosInstance from "../axioConfig";

const REST_AUTHOR_API_URL = "http://localhost:8080/api/authors";

export const listAuthors = (user) => axios.get(REST_AUTHOR_API_URL);

export const getAuthor = (authorId) =>
  axios.get(REST_AUTHOR_API_URL + "/" + authorId);

export const deleteAuthor = (authorId) =>
  axiosInstance.delete(REST_AUTHOR_API_URL + "/" + authorId);
