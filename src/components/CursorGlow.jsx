import { useEffect, useState } from "react";

const CursorGlow = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const move = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", move);

    return () => {
      window.removeEventListener("mousemove", move);
    };
  }, []);

  return (
    <div
      className="pointer-events-none fixed top-0 left-0 w-80 h-80 bg-purple-600 opacity-30 rounded-full blur-3xl z-50 transition-transform duration-100"
      style={{
        transform: `translate(${position.x - 160}px, ${position.y - 160}px)`,
      }}
    />
  );
};

export default CursorGlow;