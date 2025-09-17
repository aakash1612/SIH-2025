import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const links = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About us" },
    { to: "/team", label: "Our Team" },
    { to: "/vision", label: "Our Vision" },
  ];

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="fixed top-0 left-0 w-full z-20 bg-black bg-opacity-70 text-white px-6 py-3 flex items-center justify-between backdrop-blur-md">
      {/* Center Links */}
      <div className="flex space-x-6">
        {links.map((link) => {
          const isActive = location.pathname === link.to;
          return (
            <div key={link.to} className="relative">
              <Link
                to={link.to}
                className={`pb-1 hover:text-gray-300 transition ${
                  isActive ? "text-white" : "text-gray-300"
                }`}
              >
                {link.label}
              </Link>
              {isActive && (
                <div className="absolute left-0 bottom-0 w-full h-[2px] bg-amber-300"></div>
              )}
            </div>
          );
        })}
      </div>

      {/* Right - Auth Links */}
      <div className="flex space-x-4">
        {token ? (
          <button
            onClick={handleLogout}
            className="text-sm font-medium bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
          >
            Logout
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm font-medium my-auto hover:text-amber-300"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="text-sm font-medium bg-amber-400 text-black px-3 py-1 rounded-md hover:bg-amber-500 transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
