import { useNavigate } from "react-router-dom";
import { useAchievements } from "../../../context/useAchievements";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function Achievements() {
  const navigate = useNavigate();
  const { achievements, deleteAchievement, toggleFeatured } = useAchievements();

  const [search, setSearch] = useState("");

  const filtered = achievements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: "20px" }}>
      <div
        style={{
          background: "#c8d8e8",
          borderRadius: "18px",
          minHeight: "calc(100vh - 40px)",
          padding: "20px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          <div>
            <h1
              style={{
                fontSize: "30px",
                fontWeight: "700",
                color: "#1e293b",
                marginBottom: "6px",
              }}
            >
              Achievements
            </h1>

            <p
              style={{
                color: "#64748b",
                fontSize: "16px",
                margin: 0,
              }}
            >
              Manage all achievements
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-achievement")}
            style={{
              background: "#4f46e5",
              color: "#fff",
              textDecoration: "none",
              padding: "12px 18px",
              borderRadius: "12px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            + Add Achievement
          </button>
        </div>

        {/* SEARCH */}
        <input
          placeholder="Search achievement..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            marginBottom: "15px",
            padding: "10px",
            width: "250px",
            borderRadius: "8px",
            border: "1px solid #ccc",
          }}
        />

        {/* TABLE */}
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "20px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          {filtered.length === 0 ? (
            <div style={{ textAlign: "center", color: "#777" }}>
              No achievements found
            </div>
          ) : (
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead>
                <tr style={{ background: "#e2e8f0", textAlign: "left" }}>
                  <th style={{ padding: "12px" }}>Title</th>
                  <th style={{ padding: "12px" }}>Type</th>
                  <th style={{ padding: "12px" }}>Organization</th>
                  <th style={{ padding: "12px" }}>Featured</th>
                  <th style={{ padding: "12px" }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} style={{ borderBottom: "1px solid #ddd" }}>
                    <td style={{ padding: "12px" }}>{a.title}</td>
                    <td style={{ padding: "12px" }}>{a.type}</td>
                    <td style={{ padding: "12px" }}>{a.organization}</td>

                    <td style={{ padding: "12px" }}>
                      <input
                        type="checkbox"
                        checked={a.featured}
                        onChange={() => toggleFeatured(a.id)}
                      />
                    </td>

                    {/* ACTIONS */}
                    <td style={{ padding: "12px" }}>
                      <div className="action-box">
                        {/* EDIT */}
                        <button
                          onClick={() =>
                            navigate(`/admin/edit-achievement/${a.id}`)
                          }
                          style={{
                            background: "#4f46e5",
                            color: "#fff",
                            border: "none",
                            padding: "10px 16px",
                            borderRadius: "10px",
                            cursor: "pointer",
                            fontSize: "14px",
                            fontWeight: "600",
                          }}
                        >
                          Edit
                        </button>

                        {/* DELETE (hover show) */}
                        <button
                          className="delete-btn"
                          onClick={() => {
                            if (
                              window.confirm("Are you sure you want to delete?")
                            ) {
                              deleteAchievement(a.id);
                              toast.success("Achievement deleted successfully");
                            }
                          }}
                        >
                          🗑
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* SAME CSS AS USERS */}
      <style>
        {`
        .action-box {
          display: flex;
          gap: 14px;
        }

        .delete-btn {
          opacity: 0;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 16px;
        }

        .action-box:hover .delete-btn {
          opacity: 1;
        }
      `}
      </style>
    </div>
  );
}
