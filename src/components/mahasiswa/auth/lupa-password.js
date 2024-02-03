import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Input, Button } from "@material-tailwind/react";

const LupaPassword = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [otp, setOtp] = React.useState("");
  const [active, setActive] = useState(false);

  const handleLupaPassword = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const data = {
      email,
    };
    try {
      const response = await axios.post(
        `${backendUrl}/api/mahasiswa/lupa-password`,
        data
      );
      Swal.close();
      if (response.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil!",
          text: response.data.message,
          timer: 1000,
        }).then(() => {
          setActive(true);
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
        <img src="../FEB.png" alt="" className="mx-auto mb-4" />

        <form
          className="bg-white shadow-lg rounded px-12 pt-6 pb-8 mb-4"
          onSubmit={handleLupaPassword}
        >
          <div
            className="text-gray-800 text-2xl flex justify-center  py-2 mb-8"
            style={{ fontFamily: "Roboto, sans-serif" }}
          >
            Lupa Password Mahasiswa
          </div>
          <div className="mb-6">
            <div className="relative flex w-full max-w-[24rem]">
              <Input
                label="Alamat Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pr-20"
                containerProps={{
                  className: "min-w-0",
                }}
              />
              <Button
                size="sm"
                color={email ? "blue" : "blue-gray"}
                disabled={!email}
                className="!absolute right-1 top-1 rounded"
                onClick={handleLupaPassword}
              >
                Kirim OTP
              </Button>
            </div>
            {active && (
              <div className="relative flex w-full max-w-[24rem] mt-8">
                <Input
                  label="Kode OTP"
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  className="pr-20"
                  containerProps={{
                    className: "min-w-0",
                  }}
                />
                <Button
                  size="sm"
                  color={otp ? "blue" : "blue-gray"}
                  disabled={!otp}
                  className="!absolute right-1 top-1 rounded"
                  onClick={handleLupaPassword}
                >
                  Verifikasi OTP
                </Button>
              </div>
            )}
          </div>
          <div className="flex justify-between">
            {/* <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Kirim OTP
            </button> */}
          </div>
          <div className="flex items-end justify-end mt-2">
            <a
              className=" align-baseline font-normal text-sm text-blue-500 hover:text-blue-800 text-right"
              href="register-mhs"
            >
              Register Mahasiswa
            </a>
          </div>
          <div className="flex items-end justify-end mt-2">
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

export default LupaPassword;
