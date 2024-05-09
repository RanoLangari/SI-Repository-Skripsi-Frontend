import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Input } from "@material-tailwind/react";
import NavbarAdminTemplate from "./template/NavbarAdmin";
import FooterAdmin from "./template/FooterAdmin";

const TambahDataSkripsi = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const HandleTambahSkripsi = async (e) => {
    try {
      e.preventDefault();
      Swal.fire({
        title: "Loading Data",
        text: "Please wait ...",
        showConfirmButton: false,
        allowOutsideClick: false,
        willOpen: () => {
          Swal.showLoading();
        },
      });
      if (
        data.nim === "" ||
        data.pembimbing1 === "" ||
        data.pembimbing2 === "" ||
        data.penguji === "" ||
        data.judul_skripsi === ""
      ) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Data tidak boleh kosong",
          timer: 1500,
        });
        return;
      }
      if (data.nim.length != 10 || isNaN(data.nim)) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "NIM Tidak Valid",
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
      const response = await axios.post(
        `${backendUrl}/api/admin/tambah-data-skripsi`,
        data,
        config
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data skripsi berhasil ditambahkan",
        timer: 3000,
      }).finally(() => {
        Navigate("/admin/data-skripsi");
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
        timer: 3000,
      });
    }
  };
  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <NavbarAdminTemplate />
      <div className="bg-gray-100 py-20 px-10">
        <div className="container mx-auto">
          <div className="bg-white dark:bg-gray-800 lg:w-1/2 mx-auto rounded-lg shadow">
            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-lg ">
              <div className="md:flex">
                <div className="w-full p-3 px-6 py-10">
                  <div className="text-center mb-10">
                    <h1 className="font-bold text-3xl text-gray-900">
                      Tambah Data Skripsi
                    </h1>
                  </div>
                  <form
                    className="mb-4 md:flex md:flex-wrap md:justify-between"
                    typeof="multipart/form-data"
                    onSubmit={HandleTambahSkripsi}
                  >
                    <div className="flex flex-col mb-6 md:w-full">
                      <Input
                        label="NIM"
                        color="yellow"
                        required
                        onChange={(e) => {
                          setData({ ...data, nim: e.target.value });
                        }}
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <Input
                        label="Pembimbing 1"
                        color="yellow"
                        required
                        onChange={(e) => {
                          setData({ ...data, pembimbing1: e.target.value });
                        }}
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <Input
                        label="Pembimbing 2"
                        color="yellow"
                        required
                        onChange={(e) => {
                          setData({ ...data, pembimbing2: e.target.value });
                        }}
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <Input
                        label="Penguji"
                        color="yellow"
                        required
                        onChange={(e) => {
                          setData({ ...data, penguji: e.target.value });
                        }}
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <Input
                        label="Judul Skripsi"
                        color="yellow"
                        required
                        onChange={(e) => {
                          setData({ ...data, judul_skripsi: e.target.value });
                        }}
                      />
                    </div>
                    <div className="flex flex-row mb-4 md:w-full">
                      <button
                        className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded-md"
                        type="submit"
                      >
                        Tambah Data Skripsi
                      </button>
                      <button
                        onClick={() => Navigate("/admin/data-skripsi")}
                        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-md ml-4"
                      >
                        Batal
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section>
          <FooterAdmin />
        </section>
      </div>
    </div>
  );
};
export default TambahDataSkripsi;
