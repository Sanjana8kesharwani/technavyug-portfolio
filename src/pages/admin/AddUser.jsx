import { useState } from "react";

export default function AddUser() {
  const [users, setUsers] = useState([
    { name: "Riya", email: "riya@gmail.com" },
    { name: "Aman", email: "aman@gmail.com" },
  ]);

  const [form, setForm] = useState({
    name: "",
    email: "",
  });

  const handleAddUser = () => {
    if (!form.name || !form.email) return;

    setUsers([...users, form]);
    setForm({ name: "", email: "" });
  };

  const handleDelete = (index) => {
    const updated = users.filter((_, i) => i !== index);
    setUsers(updated);
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: "18px",
      padding: "20px",
    }}>

      {/* BLUE SECTION */}
      <div style={{
        background: "#c8d8e8",
        borderRadius: "18px",
        padding: "20px",
      }}>

        {/* HEADER */}
        <h2 style={{ marginBottom: "20px" }}>User Management</h2>

        {/* ADD USER CARD */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "20px",
          marginBottom: "20px",
        }}>
          <h3>Add New User</h3>

          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
            style={{
              display: "block",
              marginBottom: "10px",
              padding: "10px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            style={{
              display: "block",
              marginBottom: "10px",
              padding: "10px",
              width: "100%",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />

          <button
            onClick={handleAddUser}
            style={{
              padding: "10px 16px",
              borderRadius: "10px",
              background: "#1d4ed8",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add User
          </button>
        </div>

        {/* USERS LIST */}
        <div style={{
          background: "#fff",
          borderRadius: "16px",
          padding: "20px",
        }}>
          <h3>All Users</h3>

          {users.map((user, index) => (
            <div
              key={index}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "10px 0",
                borderBottom: "1px solid #eee",
              }}
            >
              <div>
                <div style={{ fontWeight: "600" }}>{user.name}</div>
                <div style={{ fontSize: "12px", color: "#666" }}>
                  {user.email}
                </div>
              </div>

              <button
                onClick={() => handleDelete(index)}
                style={{
                  background: "red",
                  color: "#fff",
                  border: "none",
                  padding: "6px 10px",
                  borderRadius: "6px",
                  cursor: "pointer",
                }}
              >
                Delete
              </button>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}