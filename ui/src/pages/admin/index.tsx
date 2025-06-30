import { useContext } from "react";

import { API_USER } from "../../constants/urls";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../setup/AuthProvider";

const Admin = () => {
  const { user, logout } = useContext(AuthContext);

  useFetch<void>({
    key: "user",
    url: API_USER,
  });

  return (
    <>
      <div>Admin page, authenticated and authorized</div>
      <div>
        User: {user?.name} - {user?.email} - {user?.role}
      </div>
      <button onClick={logout}>logout</button>
    </>
  );
};

export default Admin;
