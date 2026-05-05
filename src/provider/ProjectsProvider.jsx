import { useState, useEffect } from "react";
import { ProjectsContext } from "../context/ProjectsContext";

export default function ProjectsProvider({ children }) {
  const [projects, setProjects] = useState(() => {
    return JSON.parse(localStorage.getItem("projects")) || [];
  });

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  const addProject = (data) => {
    setProjects((prev) => [...prev, { ...data, id: Date.now() }]);
  };

  const updateProject = (id, updated) => {
    setProjects((prev) =>
      prev.map((p) =>
        p.id.toString() === id.toString() ? { ...p, ...updated } : p
      )
    );
  };

  const deleteProject = (id) => {
    setProjects((prev) =>
      prev.filter((p) => p.id.toString() !== id.toString())
    );
  };

  return (
    <ProjectsContext.Provider
      value={{ projects, addProject, updateProject, deleteProject }}
    >
      {children}
    </ProjectsContext.Provider>
  );
}