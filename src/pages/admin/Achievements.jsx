import { useNavigate } from "react-router-dom";
import { useAchievements } from "../../context/useAchievements";
import { useState } from "react";

export default function Achievements() {
  const navigate = useNavigate();
  const { achievements, deleteAchievement, toggleFeatured } = useAchievements();

  const [search, setSearch] = useState("");

  const filtered = achievements.filter((a) =>
    a.title.toLowerCase().includes(search.toLowerCase())
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
        {/* Header */}
        <div
          style={{
            marginBottom: "25px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>Achievements</h3>
            <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
              Manage all achievements
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-achievement")}
            style={{
              padding: "10px 16px",
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            + Add Achievement
          </button>
        </div>

        {/* Search */}
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

        {/* Table */}
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
            <table width="100%" style={{ borderCollapse: "collapse" }}>
              <thead style={{ background: "#e5e7eb" }}>
                <tr>
                  <th style={{ padding: "12px" }}>Title</th>
                  <th>Type</th>
                  <th>Organization</th>
                  <th>Featured</th>
                  <th>Actions</th>
                </tr>
              </thead>

              <tbody>
                {filtered.map((a) => (
                  <tr key={a.id} style={{ borderBottom: "1px solid #eee" }}>
                    <td style={{ padding: "12px" }}>{a.title}</td>
                    <td>{a.type}</td>
                    <td>{a.organization}</td>

                    <td>
                      <input
                        type="checkbox"
                        checked={a.featured}
                        onChange={() => toggleFeatured(a.id)}
                      />
                    </td>

                    <td>
                      <button
                        onClick={() =>
                          navigate(`/admin/edit-achievement/${a.id}`)
                        }
                        style={{
                          marginRight: "8px",
                          padding: "5px 10px",
                          borderRadius: "6px",
                          border: "none",
                          background: "#4f46e5",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => deleteAchievement(a.id)}
                        style={{
                          padding: "5px 10px",
                          borderRadius: "6px",
                          border: "none",
                          background: "#ef4444",
                          color: "#fff",
                          cursor: "pointer",
                        }}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}