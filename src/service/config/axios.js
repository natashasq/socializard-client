import axios from "axios";

const config = {
  baseURL: process.env.REACT_APP_API_PATH,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 300,
  headers: { Accept: "*", "Content-Type": "application/json; charset=utf-8" },
};

const api = axios.create(config);

export default api;
