import { useState} from "react";
import { useProjects } from "../../provider/useProjects";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-hot-toast";

export default function EditProject() {
  const { projects, updateProject } = useProjects();
  const { id } = useParams();
  const navigate = useNavigate();

  const existing = projects.find(
    (p) => p.id.toString() === id
  );

  const [form, setForm] = useState(
    existing || {
      title: "",
      category: "",
      shortDesc: "",
      fullDesc: "",
      status: "",
      featured: false,
    }
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.title.trim()) {
      toast.error("Title required");
      return;
    }

    updateProject(id, form);
    toast.success("Project updated");

    navigate("/admin/projects");
  };

  return (
    <div className="min-h-screen bg-white p-5">
      <div className="bg-[#c8d8e8] rounded-2xl p-6">
        
        <h2 className="text-lg font-semibold mb-4">
          Edit Project
        </h2>

        <form className="bg-white p-6 rounded-xl shadow-md space-y-4" onSubmit={handleSubmit}>
          
          <input
            value={form.title}
            onChange={(e) =>
              setForm({ ...form, title: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value })
            }
            className="w-full border p-2 rounded"
          >
            <option>AI</option>
            <option>IoT</option>
          </select>

          <textarea
            value={form.shortDesc}
            onChange={(e) =>
              setForm({ ...form, shortDesc: e.target.value })
            }
            className="w-full border p-2 rounded"
          />

          <button className="bg-indigo-600 text-white px-4 py-2 rounded">
            Update Project
          </button>

        </form>
      </div>
    </div>
  );
}