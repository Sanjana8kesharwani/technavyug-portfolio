import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Users() {
  const navigate = useNavigate();

  const [users, setUsers] = useState([
    {
      name: "Riya",
      designation: "Frontend Developer",
      email: "riya@gmail.com",
    },
    {
      name: "Aman",
      designation: "UI Designer",
      email: "aman@gmail.com",
    },
  ]);

  const handleDelete = (index) => {
    setUsers((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div
      style={{
        background: "#fff",
        borderRadius: "18px",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#c8d8e8",
          borderRadius: "18px",
          padding: "20px",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "20px",
          }}
        >
          <div>
            <h2 style={{ margin: 0 }}>Users Management</h2>
            <p style={{ margin: 0, fontSize: "13px", color: "#555" }}>
              Manage all registered users
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-user")}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #4f46e5)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
              fontWeight: "500",
            }}
          >
            + Add User
          </button>
        </div>

        {/* USERS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: "20px",
          }}
        >
          {users.map((user, i) => (
            <div
              key={i}
              style={{
                background: "#fff",
                borderRadius: "16px",
                padding: "16px",
                boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
                transition: "0.2s",
              }}
            >
              {/* USER TOP */}
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div
                  style={{
                    width: "45px",
                    height: "45px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #6366f1, #4f46e5)",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "600",
                  }}
                >
                  {user.name.charAt(0)}
                </div>

                <div>
                  <div style={{ fontWeight: "600" }}>{user.name}</div>
                  <div style={{ fontSize: "12px", color: "#777" }}>
                    {user.designation}
                  </div>
                </div>
              </div>

              {/* EMAIL */}
              <div style={{ marginTop: "10px", fontSize: "13px", color: "#444" }}>
                {user.email}
              </div>

              {/* ACTIONS */}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                }}
              >
                <button
                  style={{
                    padding: "6px 10px",
                    borderRadius: "8px",
                    background: "#e0e7ff",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(i)}
                  style={{
                    padding: "6px 10px",
                    borderRadius: "8px",
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    cursor: "pointer",
                    fontSize: "12px",
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* EMPTY STATE */}
        {users.length === 0 && (
          <div
            style={{
              marginTop: "20px",
              textAlign: "center",
              color: "#777",
            }}
          >
            No users found
          </div>
        )}
      </div>
    </div>
  );
}