import { useParams, useNavigate } from "react-router-dom";
import { useUsers } from "../../context/useUsers";
import { useState } from "react";
import { toast } from "react-hot-toast";

export default function EditUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { users, updateUser } = useUsers();

  const user = users[id];

  // ✅ hooks ALWAYS first
  const [form, setForm] = useState({
    name: user?.name || "",
    designation: user?.designation || "",
    email: user?.email || "",
    phone: user?.phone || "",
    linkedin: user?.linkedin || "",
    photo: user?.photo || null,
  });

  const [, setPreview] = useState(user?.photo || null);
  const [, setErrors] = useState({});

  // ✅ AFTER hooks
  if (!user) return <div>User not found</div>;

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "photo") {
      const file = files[0];
      if (file) setPreview(URL.createObjectURL(file));
      setForm({ ...form, photo: file });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const validate = () => {
    let newErrors = {};

    if (!form.designation.trim())
      newErrors.designation = "Designation required";

    if (form.email && !/\S+@\S+\.\S+/.test(form.email))
      newErrors.email = "Invalid email";

    if (form.phone && form.phone.length < 10)
      newErrors.phone = "Invalid phone";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleUpdate = () => {
    if (!validate()) return;

    updateUser(id, form);
    toast.success("User updated successfully 🎉");

    setTimeout(() => navigate("/admin/users"), 1200);
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Edit User</h2>

      <input value={form.name} disabled />
      <input
        name="designation"
        value={form.designation}
        onChange={handleChange}
      />
      <input
        name="email"
        value={form.email}
        onChange={handleChange}
      />

      <button onClick={handleUpdate}>Save</button>
    </div>
  );
}