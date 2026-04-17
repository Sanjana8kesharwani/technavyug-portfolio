import { useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const MainLayout = ({ children }) => {
  const [open, setOpen] = useState(false);

  return (
    <div>

      {/* Navbar */}
      <Navbar setOpen={setOpen} />

      {/* Sidebar */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* Content */}
      <div className="pt-24">
        {children}
      </div>

    </div>
  );
};

export default MainLayout;