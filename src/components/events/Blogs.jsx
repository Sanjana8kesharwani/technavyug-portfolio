import { useNavigate } from "react-router-dom";
import { blogsData } from "../../data/blogData";

export default function Blogs() {
  const navigate = useNavigate();

  return (
    <div className="space-y-8">
      {blogsData.map((blog) => (
        <div key={blog.id}>
          <h3>{blog.title}</h3>

          <span onClick={() => navigate(`/blog/${blog.id}`, { state: blog })} className="text-blue-600 cursor-pointer">
            Read More...
          </span>
        </div>
      ))}
    </div>
  );
}