import MainLayout from "../layouts/MainLayout";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Home = () => {
  const navigate = useNavigate();

  const words = ["Build", "Showcase", "Verify"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <MainLayout>

      {/* HERO */}
      <div className="relative h-screen">

        {/* VIDEO */}
        <video
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover"
        >
          <source src="/hero.mp4" type="video/mp4" />
        </video>

        {/* OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">

          <h1 className="text-5xl md:text-7xl font-bold">

            <span key={index} className="fade-text text-blue-400">
              {words[index]}
            </span>{" "}
            your future

          </h1>

          <p className="mt-6 text-gray-300 max-w-xl">
            Showcase your work, verify certificates and grow your digital identity.
          </p>

          <div className="flex gap-4 mt-8">

            <button
              onClick={() => navigate("/achievements")}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600"
            >
              Explore
            </button>

            <button
              onClick={() => navigate("/verify")}
              className="px-8 py-3 border border-white/30 rounded-xl"
            >
              Verify
            </button>

          </div>

        </div>

      </div>

    </MainLayout>
  );
};

export default Home;