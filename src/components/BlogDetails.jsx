import { useParams, useLocation, useNavigate } from "react-router-dom";
import { blogsData } from "../data/blogData";
import ScrollToTopButton from "../components/ScrollToTopButton";

export default function BlogDetails() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();


  let blog = location.state;


  if (!blog) {
    blog = blogsData.find((b) => String(b.id) === String(id));
  }


  if (!blog) {
    return (
      <div className="text-center mt-10">
        <h2>No Blog Data Found</h2>
        <button onClick={() => navigate("/events-media")} className="mt-4 text-blue-600">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <>
    <div className="max-w-5xl mx-auto py-10 px-4">

      {/* Back */}
      <button onClick={() => navigate(-1)} className="mb-4 text-blue-600">
        ← Back
      </button>

      {/* Hero */}
      <div className="relative rounded-xl overflow-hidden mb-6">
        <img src={blog.image} alt={blog.title} className="w-full h-64 object-cover"/>
        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
          <h1 className="text-white text-2xl md:text-3xl font-bold text-center px-4">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* Title + Date */}
      <div className="flex justify-between mb-4">
        <h2 className="text-xl font-semibold">{blog.title}</h2>
        <span className="text-gray-400">{blog.date}</span>
      </div>

      {/* Content */}
      <p className="text-gray-700 leading-7 text-sm">
        {blog.content}
      </p>

      {/* Author */}
      <div className="mt-10 p-6 bg-gray-100 rounded-xl shadow">
        <p className="text-gray-500">Blog Author</p>
      </div>
    </div>
    <ScrollToTopButton />
    </>
    
  );
}