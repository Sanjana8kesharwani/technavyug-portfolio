import { useState } from "react";
import {
  useNavigate,
  Navigate,
} from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const token =
    localStorage.getItem("token");

  if (token) {
    return (
      <Navigate to="/admin/dashboard" />
    );
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (
      email === "admin@gmail.com" &&
      password === "1234"
    ) {
      localStorage.setItem(
        "token",
        "dummy"
      );

      navigate("/admin/dashboard");
    } else {
      setError(
        "Invalid email or password"
      );
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexWrap: "wrap",
        background:
          "linear-gradient(to right, #0f2747 50%, #c7d8ef 50%)",
      }}
    >
      {/* LEFT SIDE */}
      <div
        style={{
          flex: "1 1 500px",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          boxSizing: "border-box",
        }}
      >
        <div>
          <h1
            style={{
              fontSize: "clamp(60px, 10vw, 110px)",
              fontWeight: "900",
              color: "#fff",
              lineHeight: "0.95",
              marginBottom: "20px",
            }}
          >
            TECH
            <br />
            NAVYUG
          </h1>

          <p
            style={{
              color: "#fff",
              fontSize: "clamp(18px, 2vw, 28px)",
              letterSpacing: "1px",
            }}
          >
            Admin Panel Management
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div
        style={{
          flex: "1 1 420px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "30px",
          boxSizing: "border-box",
        }}
      >
        <form
          onSubmit={handleLogin}
          style={{
            width: "100%",
            maxWidth: "480px",
            background: "#fff",
            borderRadius: "30px",
            padding: "45px 35px",
            boxShadow:
              "0 15px 45px rgba(0,0,0,0.15)",
            boxSizing: "border-box",
          }}
        >
          <h2
            style={{
              fontSize: "clamp(36px, 5vw, 52px)",
              fontWeight: "800",
              color: "#0f2747",
              marginBottom: "35px",
              textAlign: "center",
            }}
          >
            Login Account
          </h2>

          {/* Email */}
          <div style={{ marginBottom: "24px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Email ID
            </label>

            <input
              type="email"
              placeholder="admin@gmail.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              style={inputStyle}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "10px" }}>
            <label
              style={{
                display: "block",
                marginBottom: "10px",
                fontWeight: "600",
                color: "#334155",
              }}
            >
              Password
            </label>

            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
              style={inputStyle}
            />
          </div>

          {/* Forgot */}
          <div
            style={{
              textAlign: "right",
              marginBottom: "18px",
            }}
          >
            <span
              style={{
                color: "#4f46e5",
                fontSize: "14px",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Forgot Password?
            </span>
          </div>

          {/* Error */}
          {error && (
            <p
              style={{
                color: "red",
                fontSize: "14px",
                marginBottom: "18px",
              }}
            >
              {error}
            </p>
          )}

          {/* Button */}
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#0f2747",
              color: "#fff",
              border: "none",
              padding: "16px",
              borderRadius: "14px",
              fontSize: "20px",
              fontWeight: "700",
              cursor: "pointer",
            }}
          >
            Login
          </button>

          <p
            style={{
              marginTop: "30px",
              textAlign: "center",
              color: "#64748b",
              fontWeight: "500",
              fontSize: "15px",
            }}
          >
            Powered by TechNavyug
          </p>
        </form>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "16px",
  borderRadius: "14px",
  border: "1px solid #dbe2ea",
  outline: "none",
  fontSize: "16px",
  boxSizing: "border-box",
};