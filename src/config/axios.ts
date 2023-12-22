// api.ts

import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
const token = localStorage.getItem("token");

const defaultConfig: AxiosRequestConfig = {
  baseURL: "/",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  },
};

const axiosInstance: AxiosInstance = axios.create(defaultConfig);

export default axiosInstance;
