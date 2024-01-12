import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaFilePdf } from "react-icons/fa";

const DetailDataSkripsi = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const Navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [data, setData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isReady, setIsReady] = useState(false);

  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    Swal.fire({
      title: "Loading Data",
      text: "Please wait ...",
      showConfirmButton: false,
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });

    const token = localStorage.getItem("token");
    const id_mhs = window.location.pathname.split("/")[3];
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${backendUrl}/api/mahasiswa/detail-skripsi/${id_mhs}`, config)
      .then((res) => {
        setIsReady(true);
        setData(res.data.data);
      })
      .then(() => {
        Swal.close();
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="bg-gray-100 w-full min-h-screen">
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
                          Navigate("/login-admin");
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
                Dashboard
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
      <section>
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col w-full sm:w-2/8 md:w-3/4 lg:w-1/2 mt-10">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold text-gray-700 mb-5">
                Detail Skripsi
              </h1>
            </div>
            <div className="flex flex-col bg-white shadow-md rounded my-2">
              <div className="flex flex-col justify-center p-5 border-b border-gray-100">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">
                    {data.judul_skripsi}
                  </span>
                  <span className="text-sm text-black"> Oleh {data.nama}</span>
                </div>
              </div>
              <div className="flex flex-col px-10 py-5">
                <span className="text-sm text-black">Abstract</span>
                <br />
                <span className="text-sm text-black">{data.abstract}</span>
              </div>
              <div className="flex flex-col px-10 py-5">
                <div class="flex flex-direction-row justify-content-space-between">
                  <div class="w-1/2">
                    <div className="flex flex-row">
                      <span className="text-sm text-black">
                        Pembimbing 1 :{" "}
                      </span>
                      <br />
                      <span className="text-sm text-black">
                        {data.pembimbing1}
                      </span>
                    </div>
                    <div className="flex flex-row">
                      <span className="text-sm text-black">
                        Pembimbing 2 :{" "}
                      </span>
                      <br />
                      <span className="text-sm text-black">
                        {data.pembimbing2}
                      </span>
                    </div>
                    <div className="flex flex-row">
                      <span className="text-sm text-black">Penguji 1 : </span>
                      <br />
                      <span className="text-sm text-black">{data.penguji}</span>
                    </div>
                  </div>
                  <div class="flex w-1/2 justify-end items-end">
                    {" "}
                    <div className="flex flex-row items-center">
                      <a href={`${data.skripsi_url}`} target="_blank">
                        <FaFilePdf className="text-5xl text-red-400" />
                        <span className="text-sm text-black">Full View</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center bg-gray-100">
        <p className="text-gray-500 text-xs">
          &copy;2023 FEB UNDANA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default DetailDataSkripsi;
