import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { URL_HOME } from "../../constants/urls";
import { AuthContext } from "../../setup/AuthProvider";

const Unauthorized = () => {
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <>
      <div>Unauthorized</div>
      <button
        onClick={() => {
          logout();
          navigate(URL_HOME);
        }}
      >
        logout
      </button>
    </>
  );
};

export default Unauthorized;
