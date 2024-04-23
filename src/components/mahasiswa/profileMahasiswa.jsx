import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "@material-tailwind/react";
import { Input, Select, Option } from "@material-tailwind/react";
import { FaUserCircle } from "react-icons/fa";
import validator from "validator";
import Navbar from "./template/Navbar";

const ProfileMahasiswa = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const Navigate = useNavigate();
  const [nama, setNama] = useState("");
  const [nim, setNim] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [email, setEmail] = useState("");
  const [semester, setSemester] = useState("");
  const [status_kelulusan, setStatusKelulusan] = useState("");
  const [statusSkripsi, setStatusSkripsi] = useState("");
  const [old_password, setOldPassword] = useState("");
  const [new_password, setNewPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
          email: email,
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
        setEmail(res.data.data.email);
      })
      .catch((err) => {
        Navigate("/login-mhs");
      });
  }, [Navigate, backendUrl]);

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
  }, [Navigate, backendUrl]);

  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <div className="bg-gray-100">
      <Navbar status_kelulusan={status_kelulusan} />

      <div className="pt-20 items-center justify-center">
        <div className="bg-white dark:bg-gray-800 w-11/12 md:w-1/2 lg:w-1/3 mx-auto rounded-lg shadow">
          <div className="py-4 px-8 mt-3">
            <div className="flex justify-between items-center">
              <h1 className="text-2xl font-bold text-gray-800 dark:text-white mt-4 text-center">
                Profile Mahasiswa
              </h1>
            </div>
          </div>
          <div className="border-b px-4 pb-6">
            <div className="text-center my-4">
              <div className="h-28 w-28 mx-auto my-4">
                <FaUserCircle className="h-full w-full text-gray-300" />
              </div>
              <div className="py-2">
                <h3 className="font-bold text-xl text-gray-800 dark:text-white mb-1">
                  {nama}
                </h3>
              </div>
            </div>
            <div className="flex justify-center">
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
                        size="md"
                        outline="false"
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
                        size="md"
                        outline="false"
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

                  <div className="flex flex-col md:flex-row mb-6">
                    <div className="flex flex-col w-full md:w-1/2 md:pr-2 mt-6">
                      <Select
                        color="yellow"
                        size="md"
                        outline="false"
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
                    <div className="flex flex-col w-full md:w-1/2 md:pl-2 mt-6">
                      <Input
                        label="Email"
                        required
                        color="yellow"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      {!validator.isEmail(email) && email && (
                        <p className="text-red-500 text-xs italic text-left mt-1">
                          Alamat email tidak valid
                        </p>
                      )}
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
                    <p>
                      {new_password !== confirm_password ? (
                        <span className="text-red-500 text-sm">
                          Password baru dan konfirmasi password tidak sama
                        </span>
                      ) : null}
                    </p>
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
        {status_kelulusan === "Lulus" ? (
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
        ) : null}

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
