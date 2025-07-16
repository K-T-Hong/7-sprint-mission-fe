import axios from "axios";

const api = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
});

// 인증 토큰 자동 첨부
api.interceptors.request.use(
  config => {
    const token =
      typeof window !== "undefined"
        ? localStorage.getItem("accessToken")
        : null;
    if (token) config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  error => Promise.reject(error)
);

export default api;
