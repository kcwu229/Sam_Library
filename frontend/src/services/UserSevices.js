import axios from "axios";

const REST_USER_API_URL = "http://localhost:8080/api/users";

export const createUser = (userData) =>
  axios.post(REST_USER_API_URL + "/register", userData);

export const loginUser = (loginData) =>
  axios.post(REST_USER_API_URL + "/login", loginData);

export const getUser = (userId) => {
  axios.get(REST_USER_API_URL + "/" + userId);
};
