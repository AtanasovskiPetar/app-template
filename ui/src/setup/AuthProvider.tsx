import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/custom";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  token: string;
  error: Error | null;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  token: "",
  error: null,
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>(
    () => localStorage.getItem("token") || "",
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token && !user) {
      try {
        const decodedUser = jwtDecode<User>(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Error decoding token:", error);
      } finally {
        setLoading(false);
      }
    } else if (!token) {
      setLoading(false);
    }
  }, [token, user]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        token,
        error: null,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
