import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../setup/AuthProvider";
import { URL_HOME } from "../../../constants/urls";

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
