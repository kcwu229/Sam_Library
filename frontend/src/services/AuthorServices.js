import axios from "axios";
import { axiosInstance, axiosFileInstance } from "../axioConfig";

const REST_AUTHOR_API_URL = "/authors";

export const listAuthors = (user) => axiosInstance.get(REST_AUTHOR_API_URL);

export const getAuthor = (authorId) =>
  axiosInstance.get(REST_AUTHOR_API_URL + "/" + authorId);

export const deleteAuthor = (authorId) =>
  axiosInstance.delete(REST_AUTHOR_API_URL + "/" + authorId);

export const createAuthor = (formData) =>
  axiosFileInstance.post(REST_AUTHOR_API_URL, formData);

export const updateAuthor = (authorId, formData) =>
  axiosFileInstance.put(REST_AUTHOR_API_URL + "/" + authorId, formData);
