import { useNavigate } from "react-router-dom";
import { useUsers } from "../../context/useUsers";

export default function Users() {
  const navigate = useNavigate();

  const { users, deleteUser } = useUsers(); 

  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: "20px" }}>
      
      {/* GREY SECTION */}
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
            alignItems: "center",
          }}
        >
          <div>
            <h3 style={{ margin: 0 }}>Users</h3>
            <p style={{ margin: 0, color: "#555", fontSize: "14px" }}>
              Manage all users
            </p>
          </div>

          <button
            onClick={() => navigate("/admin/add-user")}
            style={{
              padding: "10px 16px",
              background: "#4f46e5",
              color: "#fff",
              border: "none",
              borderRadius: "10px",
              cursor: "pointer",
            }}
          >
            + Add User
          </button>
        </div>

        {/* WHITE CARD */}
        <div
          style={{
            background: "#fff",
            borderRadius: "20px",
            padding: "25px",
            boxShadow: "0 10px 40px rgba(0,0,0,0.08)",
          }}
        >
          {users.length === 0 ? (
            <div style={{ textAlign: "center", color: "#777" }}>
              No users found
            </div>
          ) : (
            users.map((user, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  padding: "15px 0",
                  borderBottom: "1px solid #eee",
                }}
              >
                {/* USER INFO */}
                <div>
                  <div style={{ fontWeight: "600" }}>{user.name}</div>
                  <div style={{ fontSize: "13px", color: "#666" }}>
                    {user.designation}
                  </div>
                  <div style={{ fontSize: "13px", color: "#666" }}>
                    {user.email}
                  </div>
                </div>

                {/* DELETE BUTTON */}
                <button
                  onClick={() => deleteUser(i)} 
                  style={{
                    background: "#ef4444",
                    color: "#fff",
                    border: "none",
                    padding: "6px 12px",
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}