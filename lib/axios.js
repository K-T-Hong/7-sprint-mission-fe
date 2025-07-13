import axios from "axios";

const instance = axios.create({
  baseURL: "https://be-render-xvpo.onrender.com",
});

export default instance;
