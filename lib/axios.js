import axios from "axios";

const instance = axios.create({
  baseURL: "https://be-render-t3g5.onrender.com",
});

export default instance;
