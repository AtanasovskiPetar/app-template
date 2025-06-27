import { useContext } from "react";
import useFetch from "../../hooks/useFetch";
import { AuthContext } from "../../setup/AuthProvider";

const Admin = () => {
  const { logout } = useContext(AuthContext);

  useFetch<void>({
    key: "auth-req",
    url: `user`,
  });

  return (
    <>
      <div>Admin page, authenticated and authorized</div>
      <button onClick={logout}>logout</button>
    </>
  );
};

export default Admin;
