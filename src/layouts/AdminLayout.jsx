import { useNavigate, Outlet, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Trophy,
  Rocket,
  FileText,
} from "lucide-react";

const sidebarItems = [
  {
    icon: <LayoutDashboard size={18} />,
    label: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <Users size={18} />,
    label: "Users",
    path: "/admin/users",
  },
  {
    icon: <Trophy size={18} />,
    label: "Achievements",
    path: "/admin/achievements",
  },
  {
    icon: <Rocket size={18} />,
    label: "Projects",
    path: "/admin/projects",
  },
  {
    icon: <FileText size={18} />,
    label: "Certificates",
    path: "/admin/certificates",
  },
];

export default function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  const path = location.pathname;

  let activeNav = "Dashboard";

  if (
    path.includes("/admin/users") ||
    path.includes("/admin/add-user") ||
    path.includes("/admin/edit-user")
  ) {
    activeNav = "Users";
  } else if (
    path.includes("/admin/achievements") ||
    path.includes("/admin/add-achievement") ||
    path.includes("/admin/edit-achievement")
  ) {
    activeNav = "Achievements";
  } else if (
    path.includes("/admin/projects") ||
    path.includes("/admin/add-project") ||
    path.includes("/admin/edit-project")
  ) {
    activeNav = "Projects";
  } else if (
    path.includes("/admin/certificates") ||
    path.includes("/admin/add-certificate") ||
    path.includes("/admin/edit-certificate")
  ) {
    activeNav = "Certificates";
  } else if (path.includes("/admin/profile")) {
    activeNav = "Admin";
  }

  return (
    <div style={{ display: "flex" }}>
      {/* ── SIDEBAR ── */}
      <div
        style={{
          width: "220px",
          minWidth: "220px",
          minHeight: "100vh",
          position: "sticky",
          top: 0,
          alignSelf: "flex-start",
          background: "#fff",
          display: "flex",
          flexDirection: "column",
          padding: "28px 16px",
          borderRight: "1px solid rgba(0,0,0,0.07)",
          boxSizing: "border-box",
        }}
      >
        {/* Logo */}
        <div
          style={{
            fontWeight: "900",
            fontSize: "22px",
            marginBottom: "36px",
          }}
        >
          <span style={{ color: "#0f172a" }}>Tech</span>
          <span style={{ color: "#06b6d4" }}>navyug</span>
        </div>

        {/* Nav Items */}
        <div style={{ flex: 1 }}>
          {sidebarItems.map((item) => (
            <div
              key={item.label}
              onClick={() => navigate(item.path)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                padding: "12px 16px",
                borderRadius: "10px",
                cursor: "pointer",
                marginBottom: "6px",
                fontSize: "14px",
                fontWeight: "500",
                background:
                  activeNav === item.label
                    ? "linear-gradient(135deg, #0f766e, #14b8a6)"
                    : "transparent",
                color: activeNav === item.label ? "#fff" : "#475569",
              }}
            >
              {item.icon}
              {item.label}
            </div>
          ))}
        </div>

        {/* Admin */}
        <div
          onClick={() => navigate("/admin/profile")}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "10px",
            padding: "12px 14px",
            borderRadius: "14px",
            cursor: "pointer",
            background:
              activeNav === "Admin"
                ? "linear-gradient(135deg, #0f766e, #14b8a6)"
                : "#f3f4f6",
          }}
        >
          <div
            style={{
              width: "36px",
              height: "36px",
              borderRadius: "50%",
              background: "linear-gradient(135deg, #667eea, #764ba2)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontWeight: "700",
              fontSize: "13px",
            }}
          >
            AD
          </div>

          <div>
            <p
              style={{
                margin: 0,
                fontWeight: "600",
                fontSize: "14px",
                color:
                  activeNav === "Admin"
                    ? "#fff"
                    : "#0f172a",
              }}
            >
              Admin
            </p>

            <p
              style={{
                margin: 0,
                fontSize: "12px",
                color:
                  activeNav === "Admin"
                    ? "rgba(255,255,255,0.8)"
                    : "#64748b",
              }}
            >
              Super Admin
            </p>
          </div>
        </div>
      </div>

      {/* ── MAIN CONTENT ── */}
      <div style={{ flex: 1 }}>
        <Outlet />
      </div>
    </div>
  );
}