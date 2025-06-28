import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./AuthProvider";
import { URL_AUTH_LOGIN, URL_UNAUTHORIZED } from "../constants/urls";
import { Role } from "../types/custom";

interface RequireAuthProps {
  allowedRoles: Role[];
}

const RequireAuth = ({ allowedRoles }: RequireAuthProps) => {
  const { user, loading, error } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !user) {
    return <Navigate to={URL_AUTH_LOGIN} state={{ from: location }} replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to={URL_UNAUTHORIZED} replace />;
  }

  return <Outlet />;
};

export default RequireAuth;
