
import axios from "axios";

// Shared Axios client pointing at the deployed Render backend (not local
// Firebase emulator). The trailing slash is omitted to avoid double slashes
// when joining paths.
const axiosInstance = axios.create({
  baseURL: "https://amazon-clone-backend-4gyc.onrender.com",
});

export { axiosInstance };
