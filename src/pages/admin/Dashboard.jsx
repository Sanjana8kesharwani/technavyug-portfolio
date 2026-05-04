import {
  Users,
  Award,
  LayoutGrid,
  Trophy,
  Rocket,
  FileText,
} from "lucide-react";

const statCards = [
  {
    label: "Total Users",
    value: "3",
    gradient: "linear-gradient(135deg, rgba(76,175,80,0.75), rgba(102,187,106,0.75))",
    icon: <Users size={20} color="#fff" />,
  },
  {
    label: "Certificates",
    value: "2",
    gradient: "linear-gradient(135deg, rgba(239,83,80,0.75), rgba(229,57,53,0.75))",
    icon: <Award size={20} color="#fff" />,
  },
  {
    label: "Projects",
    value: "5",
    gradient: "linear-gradient(135deg, rgba(255,167,38,0.75), rgba(251,140,0,0.75))",
    icon: <LayoutGrid size={20} color="#fff" />,
  },
  {
    label: "Achievements",
    value: "4",
    gradient: "linear-gradient(135deg, rgba(66,165,245,0.75), rgba(30,136,229,0.75))",
    icon: <Trophy size={20} color="#fff" />,
  },
];

const recentActivity = [
  { text: "New user registered",           time: "2 mins ago",  icon: <Users size={16} color="#6b7280" /> },
  { text: "Certificate generated for Ali", time: "1 hour ago",  icon: <Award size={16} color="#6b7280" /> },
  { text: "Project 'WebApp' created",      time: "3 hours ago", icon: <Rocket size={16} color="#6b7280" /> },
  { text: "Achievement unlocked by Sara",  time: "Yesterday",   icon: <Trophy size={16} color="#6b7280" /> },
];

const topProjects = [
  { name: "Web App",      status: "Active", color: "#34d399" },
  { name: "Mobile UI",   status: "Review", color: "#fb923c" },
  { name: "API Gateway", status: "Done",   color: "#a78bfa" },
];

export default function AdminDashboard() {
  return (
    <div style={{flex: 1, height: "100vh", overflowY: "auto", padding: "28px 32px",boxSizing: "border-box",
      background: "linear-gradient(135deg, #c8d8e8 0%, #d8cce8 50%, #b8ccd8 100%)",fontFamily: "'Segoe UI', system-ui, sans-serif",}}>
      {/* Header */}
      <div style={{ marginBottom: "24px" }}>
        <div style={{ fontSize: "32px", fontWeight: "800", color: "#1a1a2e" }}>Dashboard</div>
      </div>

      {/* ── STAT CARDS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px", marginBottom: "20px" }}>
        {statCards.map((card) => (
          <div key={card.label} style={{
            background: card.gradient,
            borderRadius: "18px",
            padding: "18px 20px 20px",
            color: "#fff",
            position: "relative",
            overflow: "hidden",
            minHeight: "120px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}>
            <div style={{
              position: "absolute", width: "100px", height: "100px",
              borderRadius: "50%", background: "rgba(255,255,255,0.12)",
              right: "-25px", bottom: "-25px",
            }} />
            <div style={{
              position: "absolute", width: "60px", height: "60px",
              borderRadius: "50%", background: "rgba(255,255,255,0.10)",
              right: "30px", bottom: "-10px",
            }} />
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <span style={{ fontSize: "13px", fontWeight: "600", opacity: 0.95 }}>{card.label}</span>
              <div style={{
                width: "40px", height: "40px", borderRadius: "12px",
                background: "rgba(255,255,255,0.28)", backdropFilter: "blur(4px)",
                display: "flex", alignItems: "center", justifyContent: "center",
                boxShadow: "0 2px 8px rgba(0,0,0,0.10)",
              }}>
                {card.icon}
              </div>
            </div>
            <div style={{ fontSize: "40px", fontWeight: "700", letterSpacing: "-1px", lineHeight: 1 }}>
              {card.value}
            </div>
          </div>
        ))}
      </div>

      {/* ── BOTTOM GRID ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* System Overview */}
          <div style={{ background: "#fff", borderRadius: "20px", padding: "22px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "12px" }}>
              <span style={{ fontWeight: "700", fontSize: "16px", color: "#1a1a2e" }}>System Overview</span>
              <span style={{ color: "#10b981", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>View details</span>
            </div>
            <p style={{ color: "#6b7280", fontSize: "13px", margin: "0 0 16px 0" }}>
              Manage users, projects and certificates from one place.
            </p>
            {[
              { label: "Users Active",        val: 75, color: "#a78bfa" },
              { label: "Projects Done",        val: 60, color: "#34d399" },
              { label: "Certificates Issued",  val: 40, color: "#f472b6" },
            ].map((bar) => (
              <div key={bar.label} style={{ marginBottom: "12px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
                  <span>{bar.label}</span>
                  <span style={{ fontWeight: "600" }}>{bar.val}%</span>
                </div>
                <div style={{ height: "7px", background: "#f3f4f6", borderRadius: "6px" }}>
                  <div style={{ height: "7px", width: `${bar.val}%`, background: bar.color, borderRadius: "6px" }} />
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div style={{ background: "#fff", borderRadius: "20px", padding: "22px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontWeight: "700", fontSize: "16px", color: "#1a1a2e" }}>Recent Uploads</span>
              <span style={{ color: "#10b981", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>View all</span>
            </div>
            {recentActivity.map((item, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: "12px",
                padding: "10px 0",
                borderBottom: i < recentActivity.length - 1 ? "1px solid #f3f4f6" : "none",
              }}>
                <div style={{
                  width: "36px", height: "36px", borderRadius: "10px",
                  background: "#f3f4f6", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>{item.icon}</div>
                <div>
                  <div style={{ fontSize: "13px", fontWeight: "600", color: "#1a1a2e" }}>{item.text}</div>
                  <div style={{ fontSize: "11px", color: "#9ca3af" }}>{item.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>

          {/* Top Projects */}
          <div style={{ background: "#fff", borderRadius: "20px", padding: "22px 24px", boxShadow: "0 4px 16px rgba(0,0,0,0.06)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "14px" }}>
              <span style={{ fontWeight: "700", fontSize: "16px", color: "#1a1a2e" }}>Top Projects</span>
              <span style={{ color: "#10b981", fontSize: "13px", fontWeight: "600", cursor: "pointer" }}>View all</span>
            </div>
            {topProjects.map((proj, i) => (
              <div key={proj.name} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "10px 0",
                borderBottom: i < topProjects.length - 1 ? "1px solid #f3f4f6" : "none",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <div style={{ width: "8px", height: "8px", borderRadius: "50%", background: proj.color }} />
                  <span style={{ fontSize: "13px", fontWeight: "600", color: "#374151" }}>{proj.name}</span>
                </div>
                <span style={{
                  fontSize: "11px", fontWeight: "700", color: proj.color,
                  background: proj.color + "22", padding: "3px 10px", borderRadius: "20px",
                }}>{proj.status}</span>
              </div>
            ))}
          </div>

          {/* CTA Banner */}
          <div style={{
            background: "linear-gradient(135deg, #0d9488 0%, #0891b2 60%, #1d4ed8 100%)",
            borderRadius: "20px", padding: "24px", color: "#fff",
            position: "relative", overflow: "hidden",
          }}>
            <div style={{ position: "absolute", right: "20px", top: "-10px", width: "90px", height: "90px", background: "rgba(255,255,255,0.12)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", right: "70px", bottom: "-20px", width: "70px", height: "70px", background: "rgba(255,255,255,0.08)", borderRadius: "50%" }} />
            <div style={{ position: "absolute", right: "16px", bottom: "16px", opacity: 0.2 }}>
              <FileText size={48} color="#fff" />
            </div>
            <div style={{ fontSize: "11px", fontWeight: "600", opacity: 0.7, marginBottom: "6px", letterSpacing: "0.08em" }}>DON'T FORGET</div>
            <div style={{ fontSize: "22px", fontWeight: "800", marginBottom: "16px", lineHeight: "1.3" }}>
              Generate<br />Certificates
            </div>
            <button style={{
              background: "rgba(255,255,255,0.2)",
              border: "1px solid rgba(255,255,255,0.4)",
              color: "#fff", padding: "9px 20px",
              borderRadius: "20px", cursor: "pointer",
              fontWeight: "600", fontSize: "13px",
            }}>
              Generate Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}