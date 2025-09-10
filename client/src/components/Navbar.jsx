import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { User, LogOut } from "lucide-react"; // ✅ icons
import { logoutUser } from "@/features/authSlice";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false); // ✅ for profile dropdown
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logoutUser());
    setDropdownOpen(false);
    navigate("/"); // redirect after logout
  };

  return (
    <div className="h-[22vh]">
      <nav className="flex items-center justify-between px-6 md:px-16 lg:px-24 xl:px-32 py-4 border-b border-gray-300 font-medium relative z-10 bg-white/80 backdrop-blur-md">
        {/* Logo */}
        <h1
          onClick={() => navigate("/")}
          className="text-[1.6rem] font-bold cursor-pointer"
        >
          Task Manager
        </h1>

        {/* Hamburger (Mobile) */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-gray-700 focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Nav Links */}
        <ul
          className={`${
            isOpen ? "flex" : "hidden"
          } max-md:absolute top-full left-0 max-md:w-full md:flex md:items-center gap-8 max-md:bg-white max-md:shadow-md max-md:px-6 max-md:py-4 flex-col md:flex-row z-50`}
        >
          <li>
            <button
              onClick={() => navigate("/")}
              className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition"
            >
              Home
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/about")}
              className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition"
            >
              About
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/tasks")}
              className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition"
            >
              Tasks
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/testimonial")}
              className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition"
            >
              Testimonial
            </button>
          </li>
          <li>
            <button
              onClick={() => navigate("/contact")}
              className="hover:text-indigo-500 md:hover:underline underline-offset-8 transition"
            >
              Contact
            </button>
          </li>

          {/* Mobile Auth */}
          <li className="block md:hidden mt-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="group flex items-center gap-2"
                >
                  <User className="w-5 h-5 text-indigo-600" />
                  {user.name || "Profile"}
                </button>
                {dropdownOpen && (
                  <div className="absolute bg-white shadow-md rounded-md mt-2 w-32 z-50">
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100"
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/login")}
                className="group flex items-center gap-2"
              >
                Log In
              </button>
            )}
          </li>
        </ul>

        {/* Desktop Auth */}
        <div className="hidden md:flex items-center gap-4 relative">
          {user ? (
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center gap-2"
              >
                <User className="w-6 h-6 text-indigo-600" />
                {user.name || "Profile"}
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 bg-white shadow-md rounded-md mt-2 w-32 z-50">
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-gray-100"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate("/login")}
              className="group flex items-center gap-2"
            >
              Log In
              <svg
                className="group-hover:translate-x-1 transition pt-0.5"
                width="12"
                height="9"
                viewBox="0 0 12 9"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M1 4.5h10.182m-4-3.5 4 3.5-4 3.5"
                  stroke="#6B7280"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
