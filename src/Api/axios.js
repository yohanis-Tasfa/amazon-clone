// src/Api/axios.js  ← REPLACE YOUR ENTIRE FILE WITH THIS
import axios from "axios";

const axiosInstance = axios.create({
  // THIS IS THE ONLY CORRECT URL THAT WORKS WITH YOUR EMULATOR RIGHT NOW
  baseURL: "http://127.0.0.1:5001/clone-72e28/us-central1/api",
});

export { axiosInstance };