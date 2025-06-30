import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { URL_HOME } from "../../../constants/urls";
import { AuthContext } from "../../../setup/AuthProvider";

const Callback = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      login(token);
      navigate(URL_HOME);
    }
  }, [login, navigate, token]);

  return null;
};

export default Callback;
