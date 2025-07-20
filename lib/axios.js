import axios from "axios";

const api = axios.create({
  baseURL: "https://panda-market-api.vercel.app",
  // withCredentials: true,
});

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

// API 서버의 CORS 설정??? 오류가 있습니다....
// api.interceptors.response.use(
//   response => response,
//   async error => {
//     const originalRequest = error.config;
//     if (
//       error.response &&
//       error.response.status === 401 &&
//       !originalRequest._retry
//     ) {
//       originalRequest._retry = true;
//       try {
//         const res = await api.post("/auth/refresh-token");
//         const { accessToken } = res.data;
//         localStorage.setItem("accessToken", accessToken);
//         originalRequest.headers.Authorization = "Bearer " + accessToken;
//         return api(originalRequest);
//       } catch (err) {
//         localStorage.removeItem("accessToken");
//         window.location.href = "/login";
//         return Promise.reject(err);
//       }
//     }
//     return Promise.reject(error);
//   }
// );

export default api;
