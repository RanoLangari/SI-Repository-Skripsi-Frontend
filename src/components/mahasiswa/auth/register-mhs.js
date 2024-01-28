import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const RegisterMahasiswa = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [nim, setNim] = useState("");
  const [nama, setNama] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [semester, setSemester] = useState("");
  const [status_kelulusan, setStatusKelulusan] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setConfirmPassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const data = {
      nim,
      nama,
      jurusan,
      semester,
      status_kelulusan,
      password,
      confirm_password,
    };
    try {
      const response = await axios.post(
        `${backendUrl}/api/mahasiswa/register`,
        data
      );
      Swal.close();
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Register berhasil!",
          timer: 1000,
        }).then(() => {
          navigate("/login-mhs");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Register gagal!",
        text: error.response.data.message,
      });
    }
  };
  return (
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="flex items-center justify-center bg-gray-200">
        <div className="w-full max-w-md ml-4 mr-4">
          <div className="flex justify-center mb-4">
            <img src="./FEB.png" alt="" className="mx-auto mb-4" />
          </div>

          <form
            className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
            onSubmit={handleRegister}
          >
            <div
              className="text-gray-800 text-2xl flex justify-center py-2 mb-8"
              style={{ fontFamily: "Roboto, sans-serif" }}
            >
              Register Mahasiswa
            </div>
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col w-full md:w-1/2 md:pr-2">
                <label className="text-gray-700 dark:text-gray-200 text-left">
                  NIM
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  onChange={(e) => setNim(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2 md:pl-2">
                <label className="text-gray-700 dark:text-gray-200 text-left">
                  Jurusan
                </label>
                <select
                  name="jurusan"
                  id="jurusan"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  required
                  onChange={(e) => {
                    setJurusan(e.target.value);
                  }}
                >
                  <option value={""}>-- Pilih Jurusan --</option>
                  <option value={"Manajemen"}>Manajemen</option>
                  <option value={"Akuntansi"}>Akuntansi</option>
                  <option value={"Ekonomi Pembangunan"}>
                    Ekonomi Pembangunan
                  </option>
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col w-full md:w-1/2 md:pr-2">
                <label className="text-gray-700 dark:text-gray-200 text-left">
                  Nama
                </label>
                <input
                  type="text"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  onChange={(e) => setNama(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2 md:pl-2">
                <label className="text-gray-700 dark:text-gray-200 text-left">
                  Semester
                </label>
                <select
                  name="semester"
                  id="semester"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  required
                  onChange={(e) => {
                    setSemester(e.target.value);
                  }}
                >
                  <option value={""}>-- Pilih Semester --</option>
                  {[...Array(14)].map((_, index) => (
                    <option key={index + 1} value={(index + 1).toString()}>
                      {index + 1}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col w-full md:w-1/2 md:pr-2">
                <label className="text-gray-700 dark:text-gray-200 text-left">
                  Password
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col w-full md:w-1/2 md:pl-2">
                <label className="text-gray-700 dark:text-gray-200 text-left">
                  Konfirmasi Password
                </label>
                <input
                  type="password"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  value={confirm_password}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>

            {/* status kelulusan */}
            <div className="flex flex-col md:flex-row">
              <div className="flex flex-col w-full md:w-1/2 md:pr-2">
                <label className="text-gray-700 dark:text-gray-200 text-left">
                  Status Kelulusan
                </label>
                <select
                  name="status_kelulusan"
                  id="status_kelulusan"
                  className="border rounded-lg px-3 py-2 mt-1 mb-5 text-sm w-full"
                  required
                  onChange={(e) => {
                    setStatusKelulusan(e.target.value);
                  }}
                >
                  <option value={""}>-- Pilih Status Kelulusan --</option>
                  <option value={"Lulus"}>Lulus</option>
                  <option value={"Tidak Lulus"}>Tidak Lulus</option>
                </select>
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
              <a
                className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
                href="login-mhs"
              >
                Login Mahasiswa
              </a>
            </div>
          </form>
          <p className="text-center text-gray-500 text-xs">
            &copy;2023 FEB UNDANA. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterMahasiswa;
