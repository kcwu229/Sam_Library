import axios from "axios";
import { axiosInstance } from "../axioConfig";

const REST_AUTHOR_API_URL = "/authors-reviews";

export const createAuthorReview = (authorId, reviewData) =>
  axiosInstance.post(REST_AUTHOR_API_URL + "/" + authorId, reviewData);

export const listAllAuthorReviews = (authorId) =>
  axios.get(REST_AUTHOR_API_URL + "/all/" + authorId);
