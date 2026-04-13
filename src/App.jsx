import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Achievements from "./pages/Achievements";
import Profile from "./pages/Profile";
import Verify from "./pages/Verify";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import AddUser from "./pages/AddUser";
import CursorGlow from "./components/CursorGlow";
import AddProject from "./pages/AddProject";
import GenerateCertificate from "./pages/GenerateCertificate";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <BrowserRouter>
      <CursorGlow />
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#1f2937",
            color: "#fff",
            border: "1px solid rgba(255,255,255,0.1)",
          },
        }}
      />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/achievements" element={<Achievements />} />
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/verify" element={<Verify />} />
        <Route path="/admin" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-user" element={<AddUser />} />
        <Route path="/add-project" element={<AddProject />} />
        <Route path="/generate" element={<GenerateCertificate />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
