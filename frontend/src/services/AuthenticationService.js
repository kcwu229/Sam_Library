import axios from "axios";
import { axiosInstance } from "../axioConfig";

const REST_AUTH_API_URL = "/auth";

export const registrateUser = (registerData) =>
  axiosInstance.post(`${REST_AUTH_API_URL}/register`, registerData);

export const authenticateUser = (loginData) =>
  axiosInstance.post(`${REST_AUTH_API_URL}/login`, loginData);
