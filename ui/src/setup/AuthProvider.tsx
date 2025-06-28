import React, { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { User } from "../types/custom";

type AuthContextType = {
  user: User | null;
  loading: boolean;
  token: string;
  error: string;
  login: (token: string) => void;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  token: "",
  error: "",
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string>(
    () => localStorage.getItem("token") || ""
  );
  const [user, setUser] = useState<User | null>(null);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (token && !user) {
      try {
        const decodedUser = jwtDecode<User>(token);
        setUser(decodedUser);
      } catch (error: any) {
        setError(error.toString());
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
        error,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
