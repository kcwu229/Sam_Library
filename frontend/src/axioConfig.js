import axios from "axios";

// ensure all axios requests have applied this config
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// to do list --> store and use jwt token for authentification
axiosInstance.interceptors.request.use(
  (config) => {
    const username = process.env.REACT_APP_API_USERNAME;
    const password = process.env.REACT_APP_API_PASSWORD;
    if (username && password) {
      config.auth = {
        username: username,
        password: password,
      };
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
