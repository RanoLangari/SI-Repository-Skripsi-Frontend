import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { Input, Button } from "@material-tailwind/react";
import validator from "validator";

const LupaPassword = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPasword, setConfirmPassword] = useState("");
  const [active, setActive] = useState(false);
  const [verified, setVerified] = useState(false);

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
  const handleOTP = async (e) => {
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
      otp,
    };
    try {
      const response = await axios.post(
        `${backendUrl}/api/mahasiswa/verify-otp`,
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
          setVerified(true);
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

  const handleResetPassword = async (e) => {
    e.preventDefault();
    Swal.fire({
      title: "Loading...",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
    if (password !== confirmPasword) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Password dan Konfirmasi Password tidak sama!",
        timer: 1000,
      });
      return;
    }
    const data = {
      email,
      password,
    };
    try {
      const response = await axios.post(
        `${backendUrl}/api/mahasiswa/reset-password`,
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
          navigate("/login-mhs");
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
            Reset Password Mahasiswa
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
                {...(active && { disabled: true })}
              />
              <Button
                size="sm"
                color={email ? "blue" : "blue-gray"}
                disabled={!email}
                className="!absolute right-1 top-1 rounded"
                onClick={handleLupaPassword}
                {...(active && { disabled: true })}
              >
                Kirim OTP
              </Button>
            </div>
            {!validator.isEmail(email) && email && (
              <p className="text-red-500 text-xs italic text-left mt-1">
                Alamat email tidak valid
              </p>
            )}
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
                  {...(verified && { disabled: true })}
                />
                <Button
                  size="sm"
                  color={otp ? "blue" : "blue-gray"}
                  disabled={!otp}
                  className="!absolute right-1 top-1 rounded"
                  onClick={handleOTP}
                  {...(verified && { disabled: true })}
                >
                  Verifikasi OTP
                </Button>
              </div>
            )}
            {verified && (
              <>
                <div className="mt-8">
                  <Input
                    type="password"
                    label="Password Baru"
                    containerProps={{
                      className: "min-w-0",
                    }}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <Input
                    type="password"
                    label="Konfirmasi Password"
                    containerProps={{
                      className: "min-w-0",
                    }}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </div>
                <div className="mt-4 flex items-start">
                  <Button color="blue" onClick={handleResetPassword}>
                    Reset Password
                  </Button>
                </div>
              </>
            )}
          </div>
          <div className="flex items-end justify-end mt-4">
            <a
              className=" align-baseline font-normal text-sm text-blue-500 hover:text-blue-800 text-right"
              href="../register-mhs"
            >
              Register Mahasiswa
            </a>
          </div>
          <div className="flex items-end justify-end mt-4">
            <a
              className="inline-block align-baseline font-normal text-sm text-blue-500 hover:text-blue-800"
              href="/login-mhs"
            >
              Login Mahasiswa
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
