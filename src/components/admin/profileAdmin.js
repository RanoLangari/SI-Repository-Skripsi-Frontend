import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "@material-tailwind/react";
import { Input } from "@material-tailwind/react";
import { FaUserCircle } from "react-icons/fa";
import validator from "validator";
import Navbar from "./template/Navbar";

const ProfileMahasiswa = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  function showMenuToggle() {
    setShowMenu(!showMenu);
  }
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  function toggleDropdown() {
    setDropdownVisible(!dropdownVisible);
  }

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
        `${backendUrl}/api/admin/change-password`,
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

  const UpdateProfile = async (e) => {
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
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.put(
        `${backendUrl}/api/admin/profile`,
        {
          username: data.username,
          email: data.email,
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
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(`${backendUrl}/api/admin/getadmin`, config);
        if(res.status === 200){
          setData(res.data.data);
          setLoading(true);
        }
      } catch (err) {
        Navigate("/login-admin");
      }
    };
    fetchData();
  }, []);

  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <div className="bg-gray-100 w-full min-h-screen">
      <Navbar
        showMenu={showMenu}
        showMenuToggle={showMenuToggle}
        toggleDropdown={toggleDropdown}
        dropdownVisible={dropdownVisible}
      />
      <div className="pt-20 bg-gray-100 items-center justify-center">
        <div className="bg-white dark:bg-gray-800 w-11/12 md:w-1/2 lg:w-1/3 mx-auto rounded-lg shadow">
          <div className="py-4 px-8 mt-3">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4 text-center">
                Profile Admin
              </h1>
            </div>
          </div>
          <div className="border-b px-4 pb-6">
            <div className="text-center my-4">
              <div className="h-28 w-28 mx-auto my-4">
                <FaUserCircle className="h-full w-full text-gray-300" />
              </div>
              <div className="py-2">
                <h3 className="font-bold text-2xl text-gray-800 dark:text-white mb-1">
                  {data.username}
                </h3>
              </div>
            </div>
            <div className="flex justify-center">
              <form className="w-full max-w-lg" onSubmit={UpdateProfile}>
                <div className="flex flex-col">
                  <div className="flex flex-col md:flex-row mb-4">
                    <div className="flex flex-col w-full md:w-1/2 md:pr-2 mb-4">
                      <Input
                        color="yellow"
                        size="regular"
                        outline={true}
                        placeholder="Email"
                        label="Email"
                        value={data.email}
                        onChange={(e) =>
                          setData({ ...data, email: e.target.value })
                        }
                        required
                      />
                      {!validator.isEmail(data.email) && data.email && (
                        <p className="text-red-500 text-xs italic text-left mt-1">
                          Alamat email tidak valid
                        </p>
                      )}
                    </div>
                    <div className="flex flex-col w-full md:w-1/2 md:pl-2">
                      <Input
                        color="yellow"
                        size="regular"
                        outline={true}
                        placeholder="Username"
                        label="Username"
                        value={data.username}
                        onChange={(e) =>
                          setData({ ...data, username: e.target.value })
                        }
                        required
                      />
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
            <div className="flex justify-center items-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4 text-center">
                Ganti Password
              </h1>
            </div>
          </div>
          <div className="border-b px-4 pb-6">
            <div className="flex justify-center">
              <form className="w-full max-w-lg" onSubmit={UpdatePassword}>
                <div className="flex flex-col">
                  <div className="flex flex-col mb-4">
                    <Input
                      color="yellow"
                      size="regular"
                      outline={true}
                      placeholder="Password Lama"
                      label="Password Lama"
                      value={old_password}
                      onChange={(e) => setOldPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <Input
                      color="yellow"
                      size="regular"
                      type="password"
                      outline={true}
                      placeholder="Password Baru"
                      label="Password Baru"
                      value={new_password}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="flex flex-col mb-4">
                    <Input
                      type="password"
                      color="yellow"
                      size="regular"
                      outline={true}
                      placeholder="Konfirmasi Password Baru"
                      label="Konfirmasi Password Baru"
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
        <div className="bg-white dark:bg-gray-800 w-11/12 md:w-1/2 lg:w-1/3 mx-auto rounded-lg shadow mt-5"></div>
        <div className="flex justify-center items-center h-24 bg-gray-100">
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              &copy;2024 FEB UNDANA. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileMahasiswa;
