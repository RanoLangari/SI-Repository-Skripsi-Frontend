import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
const RegisterMahasiswa = () => {
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
        "http://localhost:5001/api/mahasiswa/register",
        data
      );
      Swal.close();
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Register berhasil!",
          showConfirmButton: false,
          timer: 1000,
        });
        console.log(response.data);
        navigate("/login-mhs");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        timer: 1000,
      });
    }
  };
  return (
    <div className="flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-4">
          <img src="./FEB.png" alt="" className="mx-auto mb-4" />
        </div>

        <form
          className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          onSubmit={handleRegister}
        >
          <div
            className="text-gray-800 text-2xl flex justify-center border-b-2 py-2 mb-4"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Register Mahasiswa
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              htmlFor="nim"
            >
              <b>NIM</b>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="nim"
              id="nim"
              type="text"
              placeholder="nim"
              required
              onChange={(e) => {
                setNim(e.target.value);
              }}
            />
          </div>
          {/* nama */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              htmlFor="nama"
            >
              <b>Nama</b>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="nama"
              id="nama"
              type="text"
              placeholder="nama"
              required
              onChange={(e) => {
                setNama(e.target.value);
              }}
            />
          </div>
          {/* jurusan */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              htmlFor="jurusan"
            >
              <b>Jurusan</b>
            </label>
            <select
              name="jurusan"
              id="jurusan"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              onChange={(e) => {
                setJurusan(e.target.value);
              }}
            >
              <option value={""}>-- Pilih Jurusan --</option>
              <option value={"Manajemen"}>Manajemen</option>
              <option value={"Akuntansi"}>Akuntansi</option>
              <option value={"Ekonomi Pembangunan"}>Ekonomi Pembangunan</option>
            </select>
          </div>
          {/* semester */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              htmlFor="semester"
            >
              <b>Semester</b>
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              name="semester"
              id="semester"
              type="text"
              placeholder="semester"
              required
              onChange={(e) => {
                setSemester(e.target.value);
              }}
            />
          </div>
          {/* status kelulusan */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              htmlFor="status_kelulusan"
            >
              <b>Status Kelulusan</b>
            </label>
            <select
              name="status_kelulusan"
              id="status_kelulusan"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              required
              onChange={(e) => {
                setStatusKelulusan(e.target.value);
              }}
            >
              <option value={""}>-- Pilih Status Kelulusan --</option>
              <option value={"Lulus"}>Lulus</option>
              <option value={"Belum Lulus"}>Belum Lulus</option>
            </select>
          </div>
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              htmlFor="password"
            >
              <b>Password</b>
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="password"
              id="password"
              type="password"
              placeholder="******************"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>
          {/* confirm-password */}
          <div className="mb-6">
            <label
              className="block text-gray-700 text-sm font-normal mb-2"
              htmlFor="confirm-password"
            >
              <b>Confirm Password</b>
            </label>
            <input
              className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
              name="confirm-password"
              id="confirm-password"
              type="password"
              placeholder="******************"
              required
              onChange={(e) => {
                setConfirmPassword(e.target.value);
              }}
            />
            <p className="text-red-500 text-xs italic">
              Please choose a password.
            </p>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Daftar Akun
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
  );
};

export default RegisterMahasiswa;
