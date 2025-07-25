import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  API_AUTH_GOOGLE,
  API_AUTH_LOGIN,
  URL_AUTH_REGISTER,
  URL_HOME,
} from "../../../constants/urls";
import useMutation from "../../../hooks/useMutation";
import { AuthContext } from "../../../setup/AuthProvider";

import type { LoginRequest, LoginResponse } from "../../../types/custom";


const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutateAsync: loginRequest,
    error: loginError,
    isPending: isLoginPending,
  } = useMutation<LoginResponse, LoginRequest>({
    url: API_AUTH_LOGIN,
    method: "POST",
    onSuccess: (res) => {
      login(res.data.token);
      navigate(URL_HOME);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await loginRequest({ email, password });
  };

  return (
    <div>
      <h2>Login</h2>
      {loginError && <p style={{ color: "red" }}>{loginError.message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" disabled={isLoginPending}>
          {isLoginPending ? "Logging in..." : "Login"}
        </button>
      </form>
      <button onClick={() => navigate(URL_AUTH_REGISTER)}>Register</button>
      <button
        onClick={async () =>
          (window.location.href =
            import.meta.env.VITE_API_URL + API_AUTH_GOOGLE)
        }
      >
        Continue with google
      </button>
    </div>
  );
};

export default Login;
