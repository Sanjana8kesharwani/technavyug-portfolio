import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import projects from "../data/projectsData"; // ✅ your file

// ─── SHIMMER COMPONENTS ───────────────────────────────────────────
function ShimmerHero() {
  return (
    <div className="w-full bg-blue-600 px-8 py-16 animate-pulse">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">
        <div className="flex-1 space-y-4">
          <div className="h-6 bg-blue-500 rounded-full w-36" />
          <div className="h-12 bg-blue-500 rounded w-3/4" />
          <div className="h-12 bg-blue-500 rounded w-2/3" />
          <div className="h-4 bg-blue-500 rounded w-full mt-4" />
          <div className="h-4 bg-blue-500 rounded w-5/6" />
          <div className="flex gap-3 mt-6">
            <div className="h-9 bg-blue-500 rounded-full w-32" />
            <div className="h-9 bg-blue-500 rounded-full w-40" />
            <div className="h-9 bg-blue-500 rounded-full w-32" />
          </div>
          <div className="h-11 bg-blue-500 rounded-xl w-36 mt-4" />
        </div>
        <div className="w-full md:w-[420px] h-64 bg-blue-500 rounded-2xl" />
      </div>
    </div>
  );
}

function ShimmerBody() {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10 grid md:grid-cols-[1fr_300px] gap-8 animate-pulse">
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-3">
            <div className="h-6 bg-gray-200 rounded w-40" />
            <div className="h-4 bg-gray-200 rounded w-full" />
            <div className="h-4 bg-gray-200 rounded w-5/6" />
            <div className="h-4 bg-gray-200 rounded w-4/6" />
          </div>
        ))}
      </div>
      <div className="space-y-4">
        <div className="h-11 bg-gray-200 rounded-xl w-full" />
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 space-y-3">
          <div className="h-5 bg-gray-200 rounded w-24" />
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gray-200 rounded-xl" />
              <div className="h-4 bg-gray-200 rounded w-40" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────
export default function ProjectDetail() {
  const { id } = useParams();

  // ❌ पहले गलत था (|| {})
  // ✅ अब सही
  const project = projects.find((p) => p.id === id);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, [id]);

  // ✅ पहले loading check
  if (loading) {
    return (
      <MainLayout>
        <div className="pt-16">
          <ShimmerHero />
          <ShimmerBody />
        </div>
      </MainLayout>
    );
  }

  // ✅ फिर project check
  if (!project) {
    return (
      <MainLayout>
        <div className="pt-20 text-center text-red-500">
          Project not found
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="pt-16">

        {/* HERO */}
        <div className="bg-blue-600 text-white px-6 py-16">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row gap-10 items-center">

            <div className="flex-1">
              <span className="inline-block border border-white/50 text-white text-xs px-4 py-1.5 rounded-full mb-4 font-medium">
                {project.category}
              </span>

              <h1 className="text-3xl md:text-4xl font-extrabold leading-tight mb-4">
                {project.title}
              </h1>

              <p className="text-blue-100 text-sm leading-relaxed mb-6 max-w-lg">
                {project.overview}
              </p>

              <button className="bg-blue-500 hover:bg-blue-400 text-white font-bold px-6 py-3 rounded-xl transition flex items-center gap-2 border border-white/30">
                Enroll Now →
              </button>
            </div>

            <div className="w-full md:w-[420px] rounded-2xl overflow-hidden shadow-2xl flex-shrink-0">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-64 object-cover"
              />
            </div>

          </div>
        </div>

      </div>
    </MainLayout>
  );
}