import { Routes, Route } from "react-router-dom";
import Login from "../pages/login";
import Home from "../pages";
import Admin from "../pages/admin";
import RequireAuth from "./RequireAuth";
import Unauthorized from "../pages/unauthorized";
import Register from "../pages/register";

const RoutesManager = () => {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="unauthorized" element={<Unauthorized />} />
      <Route path="" element={<Home />} />
      <Route path="admin" element={<RequireAuth allowedRoles={["admin"]} />}>
        <Route path="" element={<Admin />} />
      </Route>
    </Routes>
  );
};

export default RoutesManager;
