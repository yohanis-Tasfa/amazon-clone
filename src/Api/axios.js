import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://127.0.0.1:5001/clone-72e28/us-central1/api",
     // The API (cloud function) URL
});

export {axiosInstance}
