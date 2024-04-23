import React, {useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Input } from "@material-tailwind/react";

const LoginMhs = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();
  const [nim, setNim] = useState("");
  const [password, setPassword] = useState("");
  const handleLogin = async (e) => {
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
      password,
    };
    try {
      const response = await axios.post(
        `${backendUrl}/api/mahasiswa/login`,
        data
      );
      Swal.close();
      if (response.status === 200) {
        localStorage.clear();
        localStorage.setItem("token", response.data.data.token);
        Swal.fire({
          icon: "success",
          title: "Login berhasil!",
          timer: 1000,
        }).then(() => {
          navigate("/mhs/dashboard");
        });
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
    <div className="flex items-center justify-center h-screen bg-gray-200">
      <div className="w-full max-w-md ml-4 mr-4">
        <img src="./FEB.png" alt="" className="mx-auto mb-4" />

        <form
          className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          onSubmit={handleLogin}
        >
          <div
            className="text-gray-800 text-2xl flex justify-center  py-2 mb-8"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Login Mahasiswa
          </div>
          <div className="mb-6">
            <Input
              label="NIM"
              required
              onChange={(e) => {
                setNim(e.target.value);
              }}
            />
          </div>
          <div className="mb-6">
            <div className="flex items-end justify-end text-sm text-blue-500 hover:text-blue-800">
              <a href="mhs/lupa-password">Lupa Password?</a>
            </div>
            <Input
              type="password"
              label="Password"
              required
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Login
            </button>
            <a
              className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
              href="register-mhs"
            >
              Register Mahasiswa
            </a>
          </div>
          <div className="flex items-end justify-end mt-4">
            <a
              className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
              href="/login-admin"
            >
              Login Admin
            </a>
          </div>
        </form>
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 FEB UNDANA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default LoginMhs;
