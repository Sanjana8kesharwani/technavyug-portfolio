import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";

export default function AdminLogin() {
  const navigate = useNavigate();

  // ✅ Hooks हमेशा ऊपर
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const token = localStorage.getItem("token");

  // ✅ condition बाद में
  if (token) {
    return <Navigate to="/admin/dashboard" />;
  }

  const handleLogin = (e) => {
    e.preventDefault();

    if (email === "admin@gmail.com" && password === "1234") {
      localStorage.setItem("token", "dummy");
      navigate("/admin/dashboard");
    } else {
      alert("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white">
      <form onSubmit={handleLogin} className="bg-white/10 p-8 rounded-xl w-80">
        <h2 className="text-2xl mb-6 text-center">Admin Login</h2>

        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-2 rounded bg-black border"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full mb-4 p-2 rounded bg-black border"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-500 py-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}