import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const ProfileMahasiswa = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get(`${backendUrl}/api/admin/getadmin`, config).then((res) => {
      setData(res.data.data);
    });
  }, []);

  return (
    <div>
      {/* create modern navbar using tailwind */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            {/* set logo FEB.png */}
            <div className="flex space-x-7">
              <div>
                {/* image icon */}
                <a href="#" className="flex items-center py-4">
                  <span className="font-semibold text-gray-500 text-lg">
                    Sistem Informasi Repository Skripsi
                  </span>
                </a>
              </div>
              {/* primary navbar items */}
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="/admin/dashboard"
                  className="py-4 px-2 text-yellow-300 border-b-4 border-yellow-300 font-semibold"
                >
                  Dashboard
                </a>
              </div>
            </div>
            {/* secondary navbar items */}
            <div className="hidden md:flex items-center space-x-3 ">
              {/* dropdown profile list item */}
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
                          Navigate("/login-mhs");
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
                onClick={() => Navigate("/mhs/dashboard")}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Dashboard
              </a>
              <a
                onClick={() => Navigate("/mhs/upload-skripsi")}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Upload Skripsi
              </a>
              <a
                onClick={() => Navigate("/mhs/profile")}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Profile
              </a>
              <a
                onClick={() => {
                  localStorage.removeItem("token");
                  Navigate("/login-mhs");
                }}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Log out
              </a>
            </div>
          )}
        </div>
      </nav>
      <div class="pt-20 bg-gray-200 items-center justify-center w-full h-screen">
        <div class="bg-white dark:bg-gray-800 w-11/12 md:w-1/2 lg:w-1/3 mx-auto rounded-lg shadow">
          <div class="py-4 px-8 mt-3">
            <div class="flex justify-center items-center">
              <h1 class="text-2xl font-bold text-gray-800 dark:text-white mt-4 text-center">
                Profile Admin
              </h1>
            </div>
          </div>
          <div class="border-b px-4 pb-6 mb-10 mt-4">
            <div class="text-center my-4">
              <img
                class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                src="https://randomuser.me/api/portraits/women/21.jpg"
                alt=""
              />
              <div class="py-2">
                <h3 class="text-xl text-gray-800 dark:text-white mb-1">
                  ubah username
                </h3>
              </div>
            </div>

            <div class="flex justify-center">
              <form class="w-full max-w-lg">
                <div className="flex flex-col items-center">
                  <div class="flex flex-row md:flex-row">
                    {/* buat nim dan nama dalam satu baris */}
                    <div class="flex flex-row">
                      <div className="flex flex-col">
                        <label class="text-gray-700 dark:text-gray-200">
                          Username
                        </label>
                        <input
                          type="text"
                          class="border rounded-lg px-3 py-2 mt-1 mb-5  w-full text-center"
                          value={data.username}
                        />
                      </div>
                    </div>
                  </div>
                  {/* button submit */}
                  <div class="flex justify-center">
                    <button
                      class="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full"
                      type="submit"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
          <div class="border-b px-4 pb-6 mt-4">
            <div class="text-center my-4">
              <div class="py-2">
                <h3 class="text-xl text-gray-800 dark:text-white mb-1">
                  ubah password
                </h3>
              </div>
            </div>
            <div className="flex justify-center">
              <form className="w-full max-w-lg">
                <div className="flex flex-col items-center">
                  <div className="flex flex-row md:flex-row ml-4 mr-4">
                    <div className="flex flex-row">
                      <div className="flex flex-col">
                        <label className="text-gray-700 dark:text-gray-200">
                          Password Lama
                        </label>
                        <input
                          type="password"
                          className="border rounded-lg px-3 py-2 mt-1 mb-5  w-full text-center"
                        />
                      </div>
                    </div>

                    <div className="flex flex-row ml-4 mr-4">
                      <div className="flex flex-col">
                        <label className="text-gray-700 dark:text-gray-200">
                          Password Baru
                        </label>
                        <input
                          type="password"
                          className="border rounded-lg px-3 py-2 mt-1 mb-5  w-full text-center"
                        />
                      </div>
                    </div>
                  </div>

                  {/* button submit */}
                  <div class="flex justify-center">
                    <button
                      class="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full"
                      type="submit"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMahasiswa;
