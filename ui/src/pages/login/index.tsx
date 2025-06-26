import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../setup/AuthProvider";
import useMutation from "../../hooks/useMutation";
import { LoginRequest, LoginResponse } from "../../types/custom";

const Login = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as any)?.from?.pathname || "";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    mutateAsync: loginRequest,
    error: loginError,
    isPending,
  } = useMutation<LoginResponse, LoginRequest>({
    url: "auth/login",
    method: "POST",
    onSuccess: (res) => {
      login(res.data.token);
      navigate(from, { replace: true });
    },
    onError: (err) => {
      console.error("Login failed:", err.message);
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

        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Login"}
        </button>
      </form>
    </div>
  );
};

export default Login;
