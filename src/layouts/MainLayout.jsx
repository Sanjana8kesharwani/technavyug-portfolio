const MainLayout = ({ children }) => {
  return (
    <div className="bg-gradient-to-br from-gray-900 via-black to-gray-950 text-white min-h-screen">
      <main className="px-6 py-4">{children}</main>
    </div>
  );
};

export default MainLayout; 