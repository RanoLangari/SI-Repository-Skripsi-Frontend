import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Swal from "sweetalert2";

const Navbar = ({
  showMenu,
  toggleDropdown,
  dropdownVisible,
  showMenuToggle,
}) => {
  const Navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div className="flex space-x-7">
                <a href="#" className="flex items-center py-4">
                  <img
                    src="https://feb.undana.ac.id/wp-content/uploads/2023/02/LOGO-FEB-black.png"
                    alt="FEB"
                    className="w-32"
                  />
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <a href="#" className="flex items-center py-4">
                  <span className="font-semibold text-gray-500 text-lg">
                    Sistem Informasi Repository Skripsi
                  </span>
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="/admin/dashboard"
                  className={`py-4 px-2 font-semibold hover:text-yellow-300 transition duration-300 ${
                    location.pathname === "/admin/dashboard"
                      ? "text-yellow-300 border-b-4 border-yellow-300"
                      : "text-gray-500"
                  }`}
                >
                  Beranda
                </a>
                <a
                  className={`py-4 px-2 font-semibold hover:text-yellow-300 transition duration-300 ${
                    location.pathname === "/admin/dosen"
                      ? "text-yellow-300 border-b-4 border-yellow-300"
                      : "text-gray-500"
                  }`}
                  href="/admin/dosen"
                >
                  Dosen
                </a>
              </div>
            </div>
            <div className="hidden md:flex items-center space-x-3 ">
              <div className="flex flex-col md:flex-row items-center md:space-x-3 ">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      onClick={toggleDropdown}
                    >
                      <span>Profile</span>
                      {/* chevron down icon */}
                      <svg
                        className="w-5 h-5 ml-2 -mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        {/* chevron down icon */}
                        <path
                          fillRule="evenodd"
                          d="M6.293 6.293a1 1 0 011.414 0L10
                    8.586l2.293-2.293a1 1 0 111.414 1.414l-3
                    3a1 1 0 01-1.414 0l-3-3a1 1 0
                    010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  {/* dropdown profile items */}
                  <div
                    className={`origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
                      dropdownVisible ? "block" : "hidden"
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="py-1" role="none">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-300 hover:text-white transition duration-300 w-full text-left"
                        role="menuitem"
                        onClick={() => Navigate("/admin/profile")}
                      >
                        Profile
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-300 hover:text-white transition duration-300 w-full text-left"
                        role="menuitem"
                        onClick={() => {
                          localStorage.removeItem("token");
                          Swal.fire({
                            title: "Berhasil Log Out",
                            icon: "success",
                            timer: 800,
                          }).then(() => {
                            Navigate("/login-admin");
                          });
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                className="outline-none mobile-menu-button"
                onClick={showMenuToggle}
              >
                <svg
                  className="w-6 h-6 text-gray-500 hover:text-yellow-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {showMenu ? (
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
          {/* mobile menu */}
          {showMenu && (
            <div className="md:hidden mt-2">
              <a
                onClick={() => Navigate("/admin/dashboard")}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Beranda
              </a>
              <a
                onClick={() => Navigate("/admin/dosen")}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Dosen
              </a>

              <a
                onClick={() => Navigate("/admin/profile")}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Profile
              </a>
              <a
                onClick={() => {
                  localStorage.removeItem("token");
                  Swal.fire({
                    title: "Berhasil Log Out",
                    icon: "success",
                    timer: 800,
                    timerProgressBar: true,
                  }).then(() => {
                    Navigate("/login-admin");
                  });
                }}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Log out
              </a>
            </div>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;
