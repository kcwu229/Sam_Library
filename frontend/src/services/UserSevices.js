import axios from "axios";
import { axiosInstance } from "../axioConfig";

const REST_USER_API_URL = "/users";

export const getUser = (userId) => {
  return axiosInstance.get(REST_USER_API_URL + "/" + userId);
};

export const updateUser = (userId, formData) => {
  return axiosInstance.put(REST_USER_API_URL + "/" + userId, formData);
};
