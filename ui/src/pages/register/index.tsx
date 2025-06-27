import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../setup/AuthProvider";
import useMutation from "../../hooks/useMutation";
import { LoginResponse, RegisterRequest } from "../../types/custom";

const Register = () => {
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");

  const {
    mutateAsync: registerRequest,
    error: registerError,
    isPending,
  } = useMutation<LoginResponse, RegisterRequest>({
    url: "auth/register",
    method: "POST",
    onSuccess: (res) => {
      login(res.data.token);
      console.log("Logged");
      navigate("/");
    },
    onError: (err) => {
      console.error("Register failed:", err.message);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await registerRequest({ name, email, password, role });
  };

  return (
    <div>
      <h2>Register</h2>
      {registerError && <p style={{ color: "red" }}>{registerError.message}</p>}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />

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

        <select value={role} onChange={(e) => setRole(e.target.value)} required>
          <option value="" disabled>
            Select role
          </option>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" disabled={isPending}>
          {isPending ? "Logging in..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
