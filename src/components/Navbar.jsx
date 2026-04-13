const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-10 py-5 bg-white/5 backdrop-blur-lg border-b border-white/10">

      <h1 className="text-2xl font-bold text-blue-400">
        DevFolio
      </h1>

      <div className="flex gap-8 text-gray-300">
        <a href="/" className="hover:text-white transition">Home</a>
        <a href="/achievements" className="hover:text-white transition">Achievements</a>
        <a href="/verify" className="hover:text-white transition">Verify</a>
      </div>

      <button className="px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition">
        Login
      </button>

    </div>
  );
};

export default Navbar;