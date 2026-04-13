import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { users } from "../data/dummyData";

const Profile = () => {
  const { id } = useParams();
  const user = users.find((u) => u.id === parseInt(id));

  if (!user) return <div>User not found</div>;

  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto mt-10">

        {/* Top Section */}
        <div className="text-center">
          <img
            src={user.image}
            alt={user.name}
            className="w-40 h-40 mx-auto rounded-full object-cover mb-4"
          />

          <h1 className="text-3xl font-bold">{user.name}</h1>
          <p className="text-gray-400">{user.role}</p>
        </div>

        {/* Bio */}
        <div className="mt-8 text-center text-gray-300">
          {user.bio}
        </div>

        {/* Skills */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Skills</h2>
          <div className="flex flex-wrap gap-3">
            {user.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-blue-500 px-3 py-1 rounded-lg"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Projects */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold mb-3">Projects</h2>
          <div className="grid grid-cols-2 gap-4">
            {user.projects.map((project, i) => (
              <div
                key={i}
                className="bg-white/10 p-4 rounded-lg"
              >
                {project.title}
              </div>
            ))}
          </div>
        </div>

        {/* Certificates */}
        <div className="mt-10 mb-10">
          <h2 className="text-xl font-semibold mb-3">Certificates</h2>
          <ul className="list-disc ml-5 text-gray-300">
            {user.certificates.map((cert, i) => (
              <li key={i}>{cert}</li>
            ))}
          </ul>
        </div>

      </div>
    </MainLayout>
  );
};

export default Profile;