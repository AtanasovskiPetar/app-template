import { Routes, Route } from "react-router-dom";

import {
  URL_ADMIN,
  URL_AUTH_CALLBACK,
  URL_AUTH_LOGIN,
  URL_AUTH_REGISTER,
  URL_HOME,
  URL_UNAUTHORIZED,
} from "../constants/urls";
import Home from "../pages";
import Admin from "../pages/admin";
import Callback from "../pages/auth/callback";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import Unauthorized from "../pages/unauthorized";
import { Role } from "../types/custom";

import RequireAuth from "./RequireAuth";

const RoutesManager = () => {
  return (
    <Routes>
      {/* AUTH */}
      <Route path={URL_AUTH_LOGIN} element={<Login />} />
      <Route path={URL_AUTH_REGISTER} element={<Register />} />
      <Route path={URL_AUTH_CALLBACK} element={<Callback />} />
      <Route path={URL_UNAUTHORIZED} element={<Unauthorized />} />

      {/* HOME */}
      <Route path={URL_HOME} element={<Home />} />

      {/* ADMIN */}
      <Route
        path={URL_ADMIN}
        element={<RequireAuth allowedRoles={[Role.ADMIN]} />}
      >
        <Route path="" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default RoutesManager;
