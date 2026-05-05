import { useParams, useNavigate } from "react-router-dom";
import { useAchievements } from "../../context/useAchievements";
import { useState, useMemo } from "react";
import { toast } from "react-hot-toast";

export default function EditAchievement() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { achievements, updateAchievement } = useAchievements();

  const existing = useMemo(
    () => achievements.find((a) => a.id?.toString() === id),
    [achievements, id]
  );

  const [form, setForm] = useState({
    title: existing?.title || "",
    type: existing?.type || "",
    description: existing?.description || "",
    organization: existing?.organization || "",
    featured: !!existing?.featured,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
  e.preventDefault();

  if (!form.title.trim()) {
    toast.error("Title is required");
    return;
  }

  if (!form.type) {
    toast.error("Please select achievement type");
    return;
  }

  if (!form.organization.trim()) {
    toast.error("Organization is required");
    return;
  }

  if (form.description.trim().length < 10) {
    toast.error("Description must be at least 10 characters");
    return;
  }

  updateAchievement(id.toString(), form);
  toast.success("Achievement updated successfully");

  navigate("/admin/achievements");
};

  if (!existing) return <div style={{ padding: "20px" }}>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: "24px" }}>
      
      {/* MAIN WRAPPER */}
      <div
        style={{
          background: "#c8d8e8",
          borderRadius: "20px",
          padding: "28px",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: "24px" }}>
          <h2 style={{ marginBottom: "4px" }}>Edit Achievement</h2>
          <p style={{ color: "#555", fontSize: "14px" }}>
            Update achievement details
          </p>
        </div>

        {/* FORM CARD */}
        <form
          onSubmit={handleSubmit}
          style={{
            background: "#fff",
            borderRadius: "16px",
            padding: "24px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.08)",
          }}
        >
          {/* ROW 1 */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginBottom: "20px",
            }}
          >
            <div>
              <label style={labelStyle}>Achievement Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div>
              <label style={labelStyle}>Type</label>
              <select
                name="type"
                value={form.type}
                onChange={handleChange}
                style={inputStyle}
              >
                <option value="">Select Type</option>
                <option>Award</option>
                <option>Recognition</option>
                <option>Milestone</option>
                <option>Honor</option>
                <option>Research</option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              style={{ ...inputStyle, height: "100px" }}
            />
          </div>

          {/* ORGANIZATION */}
          <div style={{ marginBottom: "20px" }}>
            <label style={labelStyle}>Organization</label>
            <input
              name="organization"
              value={form.organization}
              onChange={handleChange}
              style={inputStyle}
            />
          </div>

          {/* FEATURED */}
          <div style={{ marginBottom: "24px" }}>
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="checkbox"
                name="featured"
                checked={form.featured}
                onChange={handleChange}
              />
              Featured Achievement
            </label>
          </div>

          {/* BUTTON RIGHT */}
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              style={{
                background: "#4f46e5",
                color: "#fff",
                padding: "10px 20px",
                borderRadius: "10px",
                border: "none",
                cursor: "pointer",
                fontWeight: "500",
              }}
            >
              Update Achievement
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

const labelStyle = {
  fontSize: "14px",
  fontWeight: "500",
  display: "block",
  marginBottom: "6px",
};

const inputStyle = {
  width: "100%",
  padding: "10px 12px",
  borderRadius: "8px",
  border: "1px solid #d1d5db",
  outline: "none",
};