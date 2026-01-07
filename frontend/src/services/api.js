import axios from "axios";

const api = axios.create({
  baseURL: "https://catalogo-filmes-qb8e.onrender.com"
  // para local: http://localhost:3001
});

export default api;
