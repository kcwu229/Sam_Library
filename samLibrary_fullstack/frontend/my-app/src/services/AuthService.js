import axios from "axios";

const REST_API_URL = "http://localhost:8080";

axios.defaults.baseURL = REST_API_URL;
axios.defaults.headers.post["Content-Type"] = "application/json";

export const login = (user) => axios.post(REST_API_URL + "/login", user);
