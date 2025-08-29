import axios from "axios";

const api = axios.create({
  baseURL: "https://front-end-wine-xi.vercel.app/api/users",
});

export default api;
