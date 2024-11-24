import axios from "axios";

const REST_AUTH_API_URL = "http://localhost:8080/api/auth";

export const registrateUser = (registerData) =>
  axios.post(`${REST_AUTH_API_URL}/register`, registerData);

export const authenticateUser = (loginData) =>
  axios.post(`${REST_AUTH_API_URL}/login`, loginData);
