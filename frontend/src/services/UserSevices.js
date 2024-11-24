import axios from "axios";

const REST_USER_API_URL = "http://localhost:8080/api/users";

export const getUser = (userId) => {
  axios.get(REST_USER_API_URL + "/" + userId);
};
