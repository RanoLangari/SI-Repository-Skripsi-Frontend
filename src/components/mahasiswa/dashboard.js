import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

const MhsDashboard = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const Navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState([]);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const fetchData = async () => {
    try {
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
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${backendUrl}/api/mahasiswa/check-login`,
        config
      );

      if (response.status === 200) {
        const res = await axios.get(
          `${backendUrl}/api/mahasiswa/get-skripsi`,
          config
        );
        setData(res.data.data);
        Swal.close();
      }
    } catch (err) {
      Swal.close();
      Navigate("/login-mhs");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const SkripsiItem = ({ item }) => (
    <div className="w-full lg:max-w-full lg:flex mt-10 rounded-lg shadow-xl">
      <div className="h-20 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden rounded-lg">
        <img
          src={`https://feb.undana.ac.id/wp-content/uploads/2023/02/LOGO-FEB-black.png`}
          alt=""
          className=" w-100 h-100 rounded-lg"
        />
      </div>
      <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <button
            className=" text-black flex items-center align-middle text-bold font-bold uppercase text-start"
            onClick={() => Navigate(`/mhs/detail-skripsi/${item.id}`)}
          >
            {item.judul_skripsi}
          </button>
        </div>
        <div className="flex">
          <div className="text-sm">
            <p className="text-gray-600 text-start">Oleh {item.nama}</p>
            <p className="text-gray-600 text-start">
              Program Studi {item.jurusan}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            <div className="flex space-x-7">
              <div>
                <a href="#" className="flex items-center py-4">
                  <span className="font-semibold text-gray-500 text-lg">
                    Sistem Informasi Repository Skripsi
                  </span>
                </a>
              </div>
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="/mhs/dashboard"
                  className="py-4 px-2 text-yellow-300 border-b-4 border-yellow-300 font-semibold"
                >
                  Dashboard
                </a>
                <a
                  className="py-4 px-5 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300"
                  href="/mhs/upload-skripsi"
                >
                  Upload Skripsi
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
                        onClick={() => Navigate("/mhs/profile")}
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
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-semibold text-center">
            Masukan Judul Skripsi
          </h2>
          <div className="flex items-center mt-12">
            <div className="w-full">
              <div className="relative">
                <div className="absolute top-4 left-3">
                  <svg
                    className="w-6 h-6 text-gray-400"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M9 21h6M19 19l-6-6M10 8a2 2
                      0 100-4 2 2 0 000 4z"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full bg-white rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:shadow-outline text-gray-600 font-medium"
                  placeholder="Search"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-5xl font-semibold text-center">Daftar Skripsi</h2>
          <div className="flex items-center mt-12"></div>
        </div>

        <div className="container mx-auto px-4">
          <div className="p-10 bg-white rounded shadow-xl">
            {filteredData.map((item) => (
              <SkripsiItem key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <div className="flex justify-center bg-gray-100">
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 FEB UNDANA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default MhsDashboard;
