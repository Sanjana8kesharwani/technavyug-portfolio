import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAchievements } from "../../../context/useAchievements";
import { toast } from "react-hot-toast";

export default function AddAchievement() {
  const navigate = useNavigate();
  const { addAchievement } = useAchievements();

  const [form, setForm] = useState({
    title: "",
    type: "Award",
    description: "",
    organization: "",
    image: null,
    featured: false,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files, type, checked } = e.target;

    // IMAGE
    if (name === "image") {
      const file = files[0];

      if (file) {
        if (!file.type.startsWith("image/")) {
          toast.error("Only image files allowed");
          return;
        }

        if (file.size > 2 * 1024 * 1024) {
          toast.error("Image must be less than 2MB");
          return;
        }

        setPreview(URL.createObjectURL(file));
        setForm({ ...form, image: file });
      }
    }
    // CHECKBOX
    else if (type === "checkbox") {
      setForm({ ...form, featured: checked });
    }
    // INPUT
    else {
      setForm({ ...form, [name]: value });
    }
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

    addAchievement(form);
    toast.success("Achievement added successfully");

    navigate("/admin/achievements");
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="bg-[#c8d8e8] rounded-2xl p-6 min-h-[calc(100vh-40px)]">
        {/* HEADER */}
        <div className="mb-6">
          <h1
            style={{
              fontSize: "30px",
              fontWeight: "700",
              color: "#1e293b",
              marginBottom: "6px",
            }}
          >
            Add Achievement
          </h1>

          <p
            style={{
              color: "#64748b",
              fontSize: "16px",
              margin: 0,
            }}
          >
            Manage achievements and details
          </p>
        </div>

        {/* FORM CARD */}
        <div className="bg-white rounded-2xl p-8 shadow-md">
          {/* ROW 1 */}
          <div className="flex gap-5 mb-4">
            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Achievement Title
              </label>
              <input
                name="title"
                placeholder="Enter title"
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              />
            </div>

            <div className="flex-1">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Type
              </label>
              <select
                name="type"
                onChange={handleChange}
                className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
              >
                <option>Select Type</option>
                <option>Award</option>
                <option>Recognition</option>
                <option>Milestone</option>
                <option>Honor</option>
                <option>Research</option>
                <option>Other</option>
              </select>
            </div>
          </div>

          {/* DESCRIPTION */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Enter description"
              onChange={handleChange}
              className="w-full p-2.5 border rounded-lg h-24 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* ORGANIZATION */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Organization
            </label>
            <input
              name="organization"
              placeholder="Enter organization"
              onChange={handleChange}
              className="w-full p-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {/* IMAGE */}
          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">
              Badge / Trophy Image (optional)
            </label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="text-sm"
            />

            {preview && (
              <img
                src={preview}
                alt="preview"
                className="mt-3 w-28 h-28 object-cover rounded-lg border"
              />
            )}
          </div>

          {/* FEATURED */}
          <div className="mb-6 flex items-center gap-2">
            <input type="checkbox" name="featured" onChange={handleChange} />
            <span className="text-sm">Featured Achievement</span>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-5 py-2 bg-gradient-to-r from-indigo-600 to-indigo-500 text-white rounded-lg font-medium hover:opacity-90"
            >
              Save Achievement
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
