import axios from "axios";
const access_token = JSON.parse(localStorage.getItem("access_token"));
const token = access_token?.access_token;
export default axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
