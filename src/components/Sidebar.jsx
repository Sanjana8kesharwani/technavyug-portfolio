import { Link } from "react-router-dom";
import { X } from "lucide-react";

const Sidebar = ({ open, setOpen }) => {
  return (
    <>
      {/* Overlay */}
      {open && (
        <div onClick={() => setOpen(false)} className="fixed inset-0 bg-black/40 z-40"/>)}

      {/* Sidebar */}
      <div className={`fixed top-0 left-0 h-full w-72 bg-white z-50 shadow-xl transform transition-transform duration-300 ${ open ? "translate-x-0" : "-translate-x-full" }`}>
        {/* Header */}
        <div className="flex justify-between items-center p-5 border-b">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full overflow-hidden">
              <img
                src="/Technavyug Logo.jpeg"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="font-semibold text-lg">Technavyug</h2>
          </div>

          <button onClick={() => setOpen(false)}>
            <X />
          </button>
        </div>

        {/* Menu */}
        <div className="flex flex-col gap-4 p-6 text-gray-700">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="hover:text-blue-600 transition"
          >
            Home
          </Link>
          <Link to="/about" className="hover:text-blue-600 transition">
            About
          </Link>
          <Link to="/projects" className="hover:text-blue-600 transition">
            Projects
          </Link>
          <Link to="/achievements" className="hover:text-blue-600 transition">
            Achievements
          </Link>
          <Link to="/verify" className="hover:text-blue-600 transition">
            Verify
          </Link>
          <Link to="/Team" className="hover:text-blue-600 transition">
            Team
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Contact & Supports
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Terms & Conditions
          </Link>
          <Link to="/contact" className="hover:text-blue-600 transition">
            Privacy Policy
          </Link>
        </div>

        {/* Social Icons */}
        <div className="flex gap-5 px-6 mt-4 text-gray-600">
          {/* LinkedIn */}
          <a
            href="https://www.linkedin.com/company/technavyug/posts/?feedView=all"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-6 h-6 hover:text-blue-600 transition cursor-pointer"
            >
              <path d="M19 0h-14c-2.8 0-5 2.2-5 5v14c0 2.8 2.2 5 5 5h14c2.8 0 5-2.2 5-5v-14c0-2.8-2.2-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.3c-1 0-1.8-.8-1.8-1.8s.8-1.8 1.8-1.8 1.8.8 1.8 1.8-.8 1.8-1.8 1.8zm13.5 11.3h-3v-5.5c0-1.3-.5-2.2-1.7-2.2-.9 0-1.4.6-1.6 1.1-.1.2-.1.5-.1.8v5.8h-3s.1-9.4 0-10h3v1.4c.4-.6 1.2-1.5 2.9-1.5 2.1 0 3.6 1.4 3.6 4.4v5.7z" />
            </svg>
          </a>

          {/* Website */}
          <a href="https://www.technavyug.com/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.8}
              stroke="currentColor"
              className="w-6 h-6 hover:text-blue-600 transition cursor-pointer"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M3 12h18" />
              <path d="M12 3a15 15 0 0 1 0 18" />
              <path d="M12 3a15 15 0 0 0 0 18" />
            </svg>
          </a>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
