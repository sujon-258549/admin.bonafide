import { useEffect, useState } from "react";
import Header from "../Components/common/Header";
import Sidebar from "../Components/common/Sidebar";
import { Outlet, useLocation } from "react-router";

const MainLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 1024 : true,
  );
  const location = useLocation();

  // Auto-close sidebar on route change for mobile
  useEffect(() => {
    if (typeof window !== "undefined" && window.innerWidth < 1024) {
      setIsSidebarOpen(false);
    }
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Mobile backdrop */}
      {isSidebarOpen && (
        <div
          onClick={() => setIsSidebarOpen(false)}
          className="lg:hidden fixed inset-0 bg-black/40 z-40 transition-opacity"
        />
      )}

      <div
        className={`transition-all duration-300 ${
          isSidebarOpen ? "lg:pl-64" : "lg:pl-20"
        } pl-0`}
      >
        <Header onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
        <div className="p-3 sm:p-4 lg:p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
