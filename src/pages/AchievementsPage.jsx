import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import achievements from "../data/achievementsData";

export default function Achievements() {
  const [search, setSearch] = useState("");
  const [domain, setDomain] = useState("All");
  const [year, setYear] = useState("All");

  const navigate = useNavigate();

  const filtered = achievements.filter((item) => {
    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchDomain = domain === "All" || item.domain === domain;
    const matchYear = year === "All" || item.year === year;

    return matchSearch && matchDomain && matchYear;
  });

  return (
    <MainLayout>
      <div className="pt-24 px-6 max-w-7xl mx-auto">

        {/* 🔥 HEADER */}
        <div className="bg-white rounded-2xl p-6 mb-8 shadow-sm border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div>
              <h1 className="text-3xl font-bold">
                Explore <span className="text-blue-600">Achievements</span>
              </h1>
              <p className="text-gray-500 text-sm">
                Discover top achievers and their success stories
              </p>
            </div>

            {/* SEARCH */}
            <input
              type="text"
              placeholder="Search achievers..."
              className="px-4 py-2 border rounded-xl w-full md:w-80 outline-none"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="flex gap-8">

          {/* 🔥 LEFT FILTER PANEL */}
          <div className="w-64 hidden md:block bg-white p-5 rounded-2xl shadow border h-fit">

            <h2 className="font-semibold mb-4">Filters</h2>

            {/* DOMAIN */}
            <div className="mb-6">
              <p className="text-sm font-medium mb-2">Domain</p>
              {["AI", "Web Dev"].map((d) => (
                <div key={d} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    checked={domain === d}
                    onChange={() => setDomain(d)}
                  />
                  <label>{d}</label>
                </div>
              ))}
              <button
                onClick={() => setDomain("All")}
                className="text-xs text-blue-500 mt-2"
              >
                Reset
              </button>
            </div>

            {/* YEAR */}
            <div>
              <p className="text-sm font-medium mb-2">Year</p>
              {["2024", "2023"].map((y) => (
                <div key={y} className="flex items-center gap-2 mb-2">
                  <input
                    type="radio"
                    checked={year === y}
                    onChange={() => setYear(y)}
                  />
                  <label>{y}</label>
                </div>
              ))}
              <button
                onClick={() => setYear("All")}
                className="text-xs text-blue-500 mt-2"
              >
                Reset
              </button>
            </div>

          </div>

          {/* 🔥 RIGHT CONTENT */}
          <div className="flex-1">

            {/* TOP FILTER BUTTONS */}
            <div className="flex gap-3 mb-6 flex-wrap">
              {["All", "AI", "Web Dev"].map((d) => (
                <button
                  key={d}
                  onClick={() => setDomain(d)}
                  className={`px-4 py-2 rounded-full border ${
                    domain === d
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100"
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>

            {/* CARDS */}
            <div className="grid md:grid-cols-3 gap-6">

              {filtered.map((item) => (
                <div
                  key={item.id}
                  onClick={() => navigate(`/achievements/${item.id}`)}
                  className="cursor-pointer bg-white rounded-2xl shadow hover:shadow-lg transition overflow-hidden"
                >
                  <img
                    src={item.image}
                    className="w-full h-48 object-cover"
                  />

                  <div className="p-4">
                    <h3 className="font-semibold text-lg">
                      {item.name}
                    </h3>

                    <p className="text-sm text-gray-500">
                      {item.role}
                    </p>

                    <p className="text-sm mt-2 text-gray-600">
                      {item.highlight}
                    </p>

                    <div className="flex justify-between items-center mt-4 text-xs text-gray-400">
                      <span>{item.domain}</span>
                      <span>{item.year}</span>
                    </div>
                  </div>
                </div>
              ))}

              {filtered.length === 0 && (
                <p className="text-center text-gray-500 col-span-full">
                  No achievers found
                </p>
              )}

            </div>

          </div>
        </div>

      </div>
    </MainLayout>
  );
}