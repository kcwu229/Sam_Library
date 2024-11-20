import axios from "axios";
import axiosInstance from "../axioConfig";

const REST_AUTHOR_API_URL = "http://localhost:8080/api/authors-reviews";

export const createAuthorReview = (authorId) =>
  axiosInstance.post(REST_AUTHOR_API_URL + "/" + authorId);

export const listAuthorReviews = (authorId) =>
  axiosInstance.get(REST_AUTHOR_API_URL + "/" + authorId);
