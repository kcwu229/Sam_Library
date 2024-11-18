import axios from "axios";
import axiosInstance from "../axioConfig";

const REST_API_URL = "http://localhost:8080/api";

axios.defaults.baseURL = REST_API_URL;

export const listBooks = (user) => axiosInstance.get(REST_API_URL + "/books");
export const createBook = (book) =>
  axiosInstance.post(REST_API_URL + "/books", book);
