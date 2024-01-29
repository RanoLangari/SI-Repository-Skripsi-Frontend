import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "@material-tailwind/react";
import { Input, Select, Option } from "@material-tailwind/react";

const ProfileMahasiswa = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const Navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [semester, setSemester] = useState("");
  const [status_kelulusan, setStatusKelulusan] = useState("");
  const [statusSkripsi, setStatusSkripsi] = useState("");
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const handleUpdate = async (e) => {
    try {
      e.preventDefault();
      Swal.fire({
        title: "Loading...",
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${backendUrl}/api/mahasiswa/profile`,
        {
          nama: nama,
          nim: nim,
          jurusan: jurusan,
          semester: semester,
          status_kelulusan: status_kelulusan,
        },
        config
      );
      Swal.close();
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        });
        Navigate("/mhs/profile");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
    }
  };

  const UpdatePassword = async (e) => {
    e.preventDefault();
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
      if (new_password !== confirm_password) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Password baru dan konfirmasi password tidak sama",
          timer: 1500,
        });
        return;
      }
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${backendUrl}/api/mahasiswa/change-password`,
        {
          old_password: old_password,
          new_password: new_password,
        },
        config
      );
      Swal.close();
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Success!",
          text: response.data.message,
          showConfirmButton: false,
          timer: 1500,
        }).then(() => {
          setOldPassword("");
          setNewPassword("");
          setConfirmPassword("");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        timer: 1500,
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${backendUrl}/api/mahasiswa/profile`, config)
      .then((res) => {
        setNama(res.data.data.nama);
        setNim(res.data.data.nim);
        setJurusan(res.data.data.jurusan);
        setSemester(res.data.data.semester);
        setStatusKelulusan(res.data.data.status_kelulusan);
      })
      .then(() => {
        Swal.close();
      })
      .catch((err) => {
        Swal.close();
        Navigate("/login-mhs");
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${backendUrl}/api/mahasiswa/skripsi-status`, config)
      .then((res) => {
        setStatusSkripsi(res.data.data.status_skripsi);
        setLoading(true);
      })
      .catch((err) => {
        Navigate("/login-mhs");
        console.log(err);
      });
  }, []);

  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <div>
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
                {status_kelulusan === "Lulus" ? (
                  <a
                    href="/mhs/upload-skripsi"
                    className="py-4 px-2 text-gray-500 font-semibold hover:text-yellow-300 transition duration-300"
                  >
                    Unggah Skripsi
                  </a>
                ) : null}
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
      <div class="pt-20 bg-gray-100 items-center justify-center">
        <div class="bg-white dark:bg-gray-800 w-11/12 md:w-1/2 lg:w-1/3 mx-auto rounded-lg shadow">
          <div class="py-4 px-8 mt-3">
            <div class="flex justify-between items-center">
              <h1 class="text-2xl font-bold text-gray-800 dark:text-white mt-4 text-center">
                Profile Mahasiswa
              </h1>
            </div>
          </div>
          <div class="border-b px-4 pb-6">
            <div class="text-center my-4">
              <img
                class="h-32 w-32 rounded-full border-4 border-white dark:border-gray-800 mx-auto my-4"
                src="https://randomuser.me/api/portraits/women/21.jpg"
                alt=""
              />
              <div class="py-2">
                <h3 class="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                  {nama}
                </h3>
              </div>
            </div>
            <div class="flex justify-center">
              <form className="w-full max-w-lg" onSubmit={handleUpdate}>
                <div className="flex flex-col">
                  <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col w-full md:w-1/2 md:pr-2 mt-6">
                      <Input
                        label="NIM"
                        required
                        color="yellow"
                        value={nim}
                        onChange={(e) => setNim(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 md:pl-2 mt-6">
                      <Select
                        color="yellow"
                        size="regular"
                        outline={false}
                        label="Jurusan"
                        required
                        onChange={(e) => {
                          setJurusan(e);
                        }}
                        value={jurusan}
                      >
                        <Option value="Manajemen">Manajemen</Option>
                        <Option value="Akuntansi">Akuntansi</Option>
                        <Option value="Ekonomi Pembangunan">
                          Ekonomi Pembangunan
                        </Option>
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row">
                    <div className="flex flex-col w-full md:w-1/2 md:pr-2 mt-6">
                      <Input
                        label="Nama"
                        required
                        color="yellow"
                        value={nama}
                        onChange={(e) => setNama(e.target.value)}
                      />
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 md:pl-2 mt-6">
                      <Select
                        color="yellow"
                        size="regular"
                        outline={false}
                        label="Semester"
                        required
                        onChange={(e) => {
                          setSemester(e);
                        }}
                        value={semester}
                      >
                        {[...Array(14)].map((_, index) => (
                          <Option
                            key={index + 1}
                            value={(index + 1).toString()}
                          >
                            {index + 1}
                          </Option>
                        ))}
                      </Select>
                    </div>
                  </div>

                  <div className="flex flex-col mt-6 mb-6">
                    <div className="flex flex-col w-full">
                      <Select
                        color="yellow"
                        size="regular"
                        outline={false}
                        label="Status Kelulusan"
                        required
                        onChange={(e) => {
                          setStatusKelulusan(e);
                        }}
                        value={status_kelulusan}
                      >
                        <Option value="Lulus">Lulus</Option>
                        <Option value="Belum Lulus">Belum Lulus</Option>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    <button
                      className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full"
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
        <div className="bg-white dark:bg-gray-800 w-11/12 md:w-1/2 lg:w-1/3 mx-auto rounded-lg shadow mt-5">
          <div className="py-4 px-8 mt-3">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4 text-center">
                Ganti Password
              </h1>
            </div>
          </div>
          <div className="border-b px-4 pb-6">
            <div className="flex justify-center">
              <form className="w-full max-w-lg" onSubmit={UpdatePassword}>
                <div className="flex flex-col">
                  <div className="flex flex-col">
                    <Input
                      type="password"
                      required
                      label="Password Lama"
                      color="yellow"
                      value={old_password}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mt-6">
                    <Input
                      type="password"
                      required
                      label="Password Baru"
                      color="yellow"
                      value={new_password}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mt-6 mb-6">
                    <Input
                      type="password"
                      required
                      label="Konfirmasi Password Baru"
                      color="yellow"
                      value={confirm_password}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-center">
                    <button
                      className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-full"
                      type="submit"
                    >
                      Ganti Password
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="bg-white dark:bg-gray-800 w-11/12 md:w-1/2 lg:w-1/3 mx-auto rounded-lg shadow mt-5">
          <div className="py-4 px-8 mt-3">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4 text-center">
                Status Skripsi
              </h1>
            </div>
          </div>
          <div className="border-b px-4 pb-6">
            <h5>
              Status Skripsi Anda <b>{statusSkripsi}</b>
            </h5>
          </div>
        </div>
        <div class="flex justify-center mt-4 text-gray-500">
          <div class="text-center">
            <p>© Sistem Informasi Repository Skripsi 2021</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMahasiswa;
