import { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Rocket,
  FileText,
} from "lucide-react";

const sidebarItems = [
  { icon: <LayoutDashboard size={18} />, label: "Dashboard" },
  { icon: <Users size={18} />, label: "Users" },
  { icon: <Trophy size={18} />, label: "Achievements" },
  { icon: <Rocket size={18} />, label: "Projects" },
  { icon: <FileText size={18} />, label: "Certificates" },
];

export default function AdminLayout() {
  const [activeNav, setActiveNav] = useState("Dashboard");
  const navigate = useNavigate();

  return (
    <div style={{ display: "flex" }}>

      {/* ── SIDEBAR ── */}
      <div style={{width: "220px", minWidth: "220px", height: "100vh",background: "#fff", display: "flex",
      flexDirection: "column", padding: "28px 16px", borderRight: "1px solid rgba(0,0,0,0.07)",boxSizing: "border-box",}}>
        
        {/* Logo */}
        <div style={{ fontWeight: "900", fontSize: "22px", marginBottom: "36px" }}>
          <span style={{ color: "#0f172a" }}>Tech</span>
          <span style={{ color: "#06b6d4" }}>navyug</span>
        </div>

        {/* Nav Items */}
        <div style={{ flex: 1 }}>
          {sidebarItems.map((item) => (
            <div key={item.label} onClick={() => {setActiveNav(item.label);
 
                if (item.label === "Dashboard") navigate("/admin/dashboard");
                if (item.label === "Users") navigate("/admin/users");
                if (item.label === "Projects") navigate("/admin/add-project");
                if (item.label === "Achievements") navigate("/admin/achievements");
                if (item.label === "Certificates") navigate("/admin/generate");
              }}
              style={{display: "flex", alignItems: "center", gap: "12px", padding: "12px 16px", borderRadius: "10px",
                cursor: "pointer", marginBottom: "6px", fontSize: "14px", fontWeight: "500", background: activeNav === item.label
                 ? "linear-gradient(135deg, #0f766e, #14b8a6)": "transparent", color: activeNav === item.label ? "#fff" : "#475569",}}>
                
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>

        {/* Admin */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px", padding: "12px 14px", borderRadius: "14px", background: "#f3f4f6",}}>

          <div style={{width: "36px", height: "36px", borderRadius: "50%",background: "linear-gradient(135deg, #667eea, #764ba2)",
           display: "flex", alignItems: "center", justifyContent: "center",color: "#fff", fontWeight: "700", fontSize: "13px",}}>AD</div>
          <span style={{ fontWeight: "600", fontSize: "14px" }}>Admin</span>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>

    </div>
  );
}