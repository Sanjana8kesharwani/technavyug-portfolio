import { Link } from "react-router-dom";
import { Menu } from "lucide-react";

const Navbar = ({ setOpen }) => {
  return (
    <div className="fixed top-4 w-full z-50 flex justify-center">

      <div
        className="w-[95%] max-w-7xl 
        bg-white/60 backdrop-blur-xl 
        border border-white/30
        shadow-lg hover:shadow-xl
        rounded-full px-8 py-3 
        flex items-center justify-between 
        transition-all duration-300"
      >

        {/* 🔥 Left: Menu + Logo */}
        <div className="flex items-center gap-4">

          {/* ☰ Hamburger */}
          <button onClick={() => setOpen(true)}>
            <Menu className="text-gray-800" />
          </button>

          {/* 🔥 Logo Circle */}
          <div className="w-10 h-10 rounded-full overflow-hidden border border-gray-200">
            <img
              src="/Technavyug Logo.jpeg"
              alt="logo"
              className="w-full h-full object-cover"
            />
          </div>

          <h1 className="text-lg font-semibold text-gray-800 tracking-wide">
            Technavyug
          </h1>

        </div>

        {/* 🔥 Menu (Desktop) */}
        <div className="hidden md:flex gap-8 text-gray-700 font-medium">

          <Link to="/" className="nav-link hover:text-blue-600 transition">Home</Link>
          <Link to="/about" className="nav-link hover:text-blue-600 transition">About</Link>
          <Link to="/projects" className="nav-link hover:text-blue-600 transition">Projects</Link>
          <Link to="/achievements" className="nav-link hover:text-blue-600 transition">Achievements</Link>
          <Link to="/verify" className="nav-link hover:text-blue-600 transition">Verify</Link>
          <Link to="/contact" className="nav-link hover:text-blue-600 transition">Contact</Link>
          

        </div>

       <div className="flex items-center gap-3">

  {/* Login Button */}
  <Link 
    to="/admin"
    className="px-4 py-2 rounded-full border border-blue-300 text-gray-700 hover:bg-blue-100 transition"
  >
    Login
  </Link>

  {/* Get Started Button */}
  <button className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 py-2 rounded-full hover:scale-105 transition shadow-md">
    Get Started
  </button>

</div>

      </div>

    </div>
  );
};

export default Navbar;