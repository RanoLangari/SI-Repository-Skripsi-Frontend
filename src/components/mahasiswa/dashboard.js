import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import { Button, Input } from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Spinner } from "@material-tailwind/react";
import { Select, Option } from "@material-tailwind/react";
const MhsDashboard = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const Navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState([]);
  const [perPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);

  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };

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
        setLoading(true);
      }
    } catch (err) {
      Navigate("/login-mhs");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const indexOfLastItem = (currentPage + 1) * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
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

  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
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
                  Beranda
                </a>
                <a
                  className="py-4 px-5 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300"
                  href="/mhs/upload-skripsi"
                >
                  Unggah Skripsi
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
                Beranda
              </a>
              <a
                onClick={() => Navigate("/mhs/upload-skripsi")}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Unggah Skripsi
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
          <h2 className="text-2xl font-semibold text-left">
            Masukan Judul Skripsi
          </h2>
          <div className="flex items-center mt-6">
            <div className="w-full">
              <div className="relative">
                <Input
                  color="yellow"
                  outline={false}
                  placeholder="Cari Judul Skripsi"
                  label="Cari Judul Skripsi"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
              <div className="mt-6 w-2">
                <Select
                  color="yellow"
                  outline={false}
                  placeholder="Pilih Jurusan"
                  label="Pilih Jurusan"
                  dropdownHandle={true}
                  onChange={(e) => {
                    setSearchTerm(e);
                  }}
                >
                  <Option value="">Semua</Option>
                  <Option value="Manajemen">Manajemen</Option>
                  <Option value="Akuntansi">Akuntansi</Option>
                  <Option value="Ekonomi Pembangunan">
                    Ekonomi Pembangunan
                  </Option>
                </Select>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-semibold text-center">
                Daftar Skripsi
              </h2>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="p-10 bg-white rounded shadow-xl">
              {currentItems.length === 0 ? (
                <div className="flex justify-center items-center h-20">
                  <p className="text-2xl text-gray-500">Data Tidak Ditemukan</p>
                </div>
              ) : (
                currentItems.map((item, index) => (
                  <SkripsiItem key={index} item={item} />
                ))
              )}
            </div>
            {filteredData.length > 6 && (
              <ReactPaginate
                previousLabel={
                  <Button variant="text" className="flex items-center gap-2">
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                    Previous
                  </Button>
                }
                nextLabel={
                  <Button variant="text" className="flex items-center gap-2">
                    Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                  </Button>
                }
                pageCount={Math.ceil(filteredData.length / perPage)}
                onPageChange={handlePageClick}
                containerClassName={
                  "flex items-center justify-center gap-2 mt-4"
                }
                pageClassName={
                  "flex items-center justify-center h-8 w-8 hover:bg-yellow-300 hover:text-white"
                }
                activeClassName={"bg-yellow-300 text-white"}
                previousClassName={
                  "flex items-center justify-center h-8 w-8 mr-14"
                }
                nextClassName={"flex items-center justify-center h-8 w-8 ml-10"}
              />
            )}
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
