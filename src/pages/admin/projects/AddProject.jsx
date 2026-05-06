import { useState } from "react";
import { useProjects } from "../../../provider/useProjects";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function AddProject() {
  const { addProject } = useProjects();
  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [form, setForm] = useState({
    title: "",
    category: "",
    shortDesc: "",
    fullDesc: "",
    status: "",
    featured: false,
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    if (name === "thumbnail") {
      const file = files[0];

      if (file) {
        if (!file.type.startsWith("image/")) {
          toast.error("Only image files allowed");
          return;
        }

        if (file.size > 2 * 1024 * 1024) {
          toast.error("Image must be under 2MB");
          return;
        }

        setPreview(URL.createObjectURL(file));
        setForm({ ...form, thumbnail: file });
      }
    } else {
      setForm({
        ...form,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Project title is required");
      return;
    }

    if (!form.category) {
      toast.error("Please select category");
      return;
    }

    if (!form.shortDesc.trim()) {
      toast.error("Short description is required");
      return;
    }

    if (form.shortDesc.length > 200) {
      toast.error("Max 200 characters allowed");
      return;
    }

    if (!form.fullDesc.trim()) {
      toast.error("Full description is required");
      return;
    }

    if (!form.status) {
      toast.error("Select project status");
      return;
    }

    if (!form.thumbnail) {
      toast.error("Thumbnail image is required");
      return;
    }

    addProject(form);
    toast.success("Project added successfully");

    navigate("/admin/projects");
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="bg-[#c8d8e8] rounded-2xl p-6 min-h-[calc(100vh-40px)]">
        
        {/* HEADER */}
        <div className="mb-6">
          <h2 className="text-xl font-semibold">Add Project</h2>
          <p className="text-sm text-gray-600">
            Manage projects and details
          </p>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow-md space-y-5"
        >
          {/* ROW 1 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">
                Project Title
              </label>
              <input
                name="title"
                placeholder="Enter title"
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              />
            </div>

            <div>
              <label className="text-sm font-medium">
                Category
              </label>
              <select
                name="category"
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="">Select Category</option>
                <option>AI</option>
                <option>IoT</option>
                <option>Research</option>
              </select>
            </div>
          </div>

          {/* SHORT DESC */}
          <div>
            <label className="text-sm font-medium">
              Short Description
            </label>
            <textarea
              name="shortDesc"
              placeholder="Max 200 characters"
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg"
            />
          </div>

          {/* FULL DESC */}
          <div>
            <label className="text-sm font-medium">
              Full Description
            </label>
            <textarea
              name="fullDesc"
              placeholder="Enter full description"
              onChange={handleChange}
              className="w-full mt-1 p-2 border rounded-lg h-24"
            />
          </div>

          {/* ROW 2 */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Status</label>
              <select
                name="status"
                onChange={handleChange}
                className="w-full mt-1 p-2 border rounded-lg"
              >
                <option value="">Select Status</option>
                <option>Ongoing</option>
                <option>Completed</option>
                <option>On Hold</option>
              </select>
            </div>

            {/* THUMBNAIL */}
            <div>
              <label className="text-sm font-medium">
                Thumbnail Image
              </label>

              <div className="mt-2 flex items-center gap-4">
                
                {/* Upload Box */}
                <label className="w-32 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-indigo-500 transition">
                  <span className="text-xs text-gray-500 text-center">
                    Upload Image
                  </span>
                  <input
                    type="file"
                    name="thumbnail"
                    onChange={handleChange}
                    className="hidden"
                  />
                </label>

                {/* Preview */}
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-32 h-24 object-cover rounded-lg border"
                  />
                )}
              </div>
            </div>
          </div>

          {/* FEATURED */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="featured"
              onChange={handleChange}
            />
            <label>Featured Project</label>
          </div>

          {/* BUTTON */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700"
            >
              Save Project
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}