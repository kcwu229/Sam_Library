import axios from "axios";

const REST_API_URL = "localhost:8080";

axios.defaults.baseURL = REST_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const request = (method, url, data) => {
  return axios({
    method,
    url,
    data,
  });
};
