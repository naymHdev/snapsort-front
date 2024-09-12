import axios from "axios";

const PublicAxios = axios.create({
  baseURL: import.meta.env.VITE_API_LOCALHOST,
  withCredentials: true,
});

export default PublicAxios;
