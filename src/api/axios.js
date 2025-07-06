import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8000", // Your Django backend URL
});

export default API;
