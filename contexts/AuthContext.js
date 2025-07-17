import { createContext, useContext, useEffect, useState } from "react";
import axios from "@/lib/axios";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(undefined);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) return setUser(null);
    axios
      .get("/users/me", { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setUser(res.data))
      .catch(() => {
        setUser(null);
        localStorage.removeItem("accessToken");
      });
  }, []);

  const login = (accessToken, userData) => {
    localStorage.setItem("accessToken", accessToken);
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
