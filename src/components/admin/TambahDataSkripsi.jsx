import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "@material-tailwind/react";
import NavbarAdminTemplate from "./template/NavbarAdmin";
import FooterAdmin from "./template/FooterAdmin";
import ReactSelect from "react-select";

const TambahDataSkripsi = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const Navigate = useNavigate();
  const [dosen, setDosen] = useState([]);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    nim: "",
    pembimbing1: "",
    pembimbing2: "",
    penguji: "",
  });
  const options = dosen.map((item) => ({ value: item.nama, label: item.nama }));
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
      if (data.nim.toString().length != 10 || isNaN(data.nim)) {
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
      await axios.post(
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const id = window.location.pathname.split("/")[3];
        const response = await axios.get(
          `${backendUrl}/api/admin/get-mhs-add-skripsi/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data.data);
        const responseDosenByJurusan = await axios.get(
          `${backendUrl}/api/admin/get-dosen-by-jurusan?jurusan=${response.data.data.jurusan}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setDosen(responseDosenByJurusan.data.data);
        setLoading(true);
      } catch (error) {
        Navigate("/admin/data-skripsi");
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
                      <label htmlFor="nim" className="mb-2 text-sm ml-2">
                        NIM
                      </label>
                      <input
                        type="number"
                        value={data.nim}
                        className="w-full p-3 py-2 border border-gray-300 rounded-md"
                        placeholder="NIM"
                        readOnly
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <label
                        htmlFor="pembimbing1"
                        className="mb-2 text-sm ml-2"
                      >
                        Pembimbing 1
                      </label>
                      <ReactSelect
                        options={options}
                        required
                        onChange={(selectedOption) => {
                          setData({
                            ...data,
                            pembimbing1: selectedOption.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <label
                        htmlFor="pembimbing2"
                        className="mb-2 text-sm ml-2"
                      >
                        Pembimbing 2
                      </label>

                      <ReactSelect
                        required
                        options={options}
                        onChange={(selectedOption) => {
                          setData({
                            ...data,
                            pembimbing2: selectedOption.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <label htmlFor="penguji" className="mb-2 text-sm ml-2">
                        Penguji
                      </label>
                      <ReactSelect
                        required
                        options={options}
                        onChange={(selectedOption) => {
                          setData({
                            ...data,
                            penguji: selectedOption.value,
                          });
                        }}
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <label
                        htmlFor="judul_skripsi"
                        className="mb-2 text-sm ml-2"
                      >
                        Judul Skripsi
                      </label>
                      <input
                        type="text"
                        onChange={(e) => {
                          setData({ ...data, judul_skripsi: e.target.value });
                        }}
                        className="w-full p-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Judul Skripsi"
                        required
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
