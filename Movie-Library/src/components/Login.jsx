
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (localStorage.getItem("loggedInUser")) {
    return <Navigate to="/" replace />;
  }

  const handleLogin = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    fetch("http://localhost:3000/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to load users");
        }
        return res.json();
      })
      .then((users) => {
        const user = users.find(
          (item) =>
            item.id === userId.trim() &&
            item.password === password
        );

        if (user) {
          localStorage.setItem(
            "loggedInUser",
            JSON.stringify({
              id: user.id,
              name: user.name,
            })
          );

          navigate("/", { replace: true });
        } else {
          setError("Invalid ID or Password!");
        }
      })
      .catch(() => {
        setError("Server error. Please start JSON Server.");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card p-4 shadow"
        style={{
          width: "100%",
          maxWidth: "400px",
          background: "#1c1c24",
          color: "white",
          borderRadius: "15px",
          border: "1px solid #34343f",
        }}
      >
        <h2 className="text-center mb-2">Movie Library</h2>

        <p className="text-center text-secondary mb-4">
          Login to continue
        </p>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">User ID</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your ID"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <p className="text-danger text-center">{error}</p>
          )}

          <button
            type="submit"
            className="btn w-100 text-white"
            style={{ background: "#ec3767" }}
            disabled={loading}
          >
            {loading ? "Checking..." : "Login"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
