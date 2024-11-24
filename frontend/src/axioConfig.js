import axios from "axios";
import Cookies from "js-cookie";

// ensure all axios requests have applied this config
const axiosInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

// to do list --> store and use jwt token for authentification

axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ensure all axios requests have applied this config
const axiosFileInstance = axios.create({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

// to do list --> store and use jwt token for authentification

axiosFileInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export { axiosFileInstance, axiosInstance };
