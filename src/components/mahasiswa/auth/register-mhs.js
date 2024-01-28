import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Input, Select, Option } from "@material-tailwind/react";
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
    console.log(data);
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
    <div className="flex items-center justify-center bg-gray-200 w-full min-h-screen">
      <div className="w-full max-w-lg">
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
              <Input
                label="NIM"
                required
                onChange={(e) => {
                  setNim(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 md:pl-2 mt-6 md:mt-0">
              <Select
                label="Pilih Jurusan"
                onChange={(value) => setJurusan(value)}
              >
                <Option value="Manajemen">Manajemen</Option>
                <Option value="Akuntansi">Akuntansi</Option>
                <Option value="Ekonomi Pembangunan">Ekonomi Pembangunan</Option>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-6">
            <div className="flex flex-col w-full md:w-1/2 md:pr-2">
              <Input
                label="Nama"
                required
                onChange={(e) => {
                  setNama(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 md:pl-2 mt-6 md:mt-0">
              <Select
                label="Pilih Semester"
                onChange={(value) => setSemester(value)}
              >
                {[...Array(14)].map((_, index) => (
                  <Option key={index + 1} value={(index + 1).toString()}>
                    {index + 1}
                  </Option>
                ))}
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row mt-6">
            <div className="flex flex-col w-full md:w-1/2 md:pr-2">
              <Input
                type="password"
                label="Password"
                required
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />
            </div>
            <div className="flex flex-col w-full md:w-1/2 md:pl-2 mt-6 md:mt-0">
              <Input
                type="password"
                label="Confirm Password"
                required
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                }}
              />
            </div>
          </div>
          <div className="flex flex-col md:flex-row mt-6">
            <div className="flex flex-col w-full md:w-1/2 md:pr-2">
              <Select
                label="Pilih Status Kelulusan"
                onChange={(value) => setStatusKelulusan(value)}
              >
                <Option value="Lulus">Lulus</Option>
                <Option value="Belum Lulus">Belum Lulus</Option>
              </Select>
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
  );
};

export default RegisterMahasiswa;
