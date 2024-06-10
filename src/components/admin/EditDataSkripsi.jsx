import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import NavbarAdminTemplate from "./template/NavbarAdmin";
import FooterAdmin from "./template/FooterAdmin";
import { Spinner } from "@material-tailwind/react";
import ReactSelect from "react-select";

const EditDataSkripsi = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [dosen, setDosen] = useState([]);
  const [loading, setLoading] = useState(false);
  const options = dosen.map((item) => ({ value: item.nama, label: item.nama }));
  const handleUpdateSkripsi = async (e) => {
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
      const token = localStorage.getItem("token");
      const id = window.location.pathname.split("/")[3];
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      await axios.put(
        `${backendUrl}/api/admin/update-skripsi/${id}`,
        data,
        config
      );
      Swal.fire({
        icon: "success",
        title: "Berhasil",
        text: "Data skripsi berhasil ditambahkan",
        timer: 3000,
      }).then(() => {
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
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const id = window.location.pathname.split("/")[3];
        const response = await axios.get(
          `${backendUrl}/api/admin/get-skripsi/${id}`,
          config
        );
        setData(response.data.data);
        const DosenByJurusan = await axios.get(
          `${backendUrl}/api/admin/get-dosen-by-jurusan?jurusan=${response.data.data.jurusan}`,
          config
        );
        setDosen(DosenByJurusan.data.data);
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
                      Ubah Data Skripsi
                    </h1>
                  </div>
                  <form
                    className="mb-4 md:flex md:flex-wrap md:justify-between"
                    typeof="multipart/form-data"
                    onSubmit={handleUpdateSkripsi}
                  >
                    <div className="flex flex-col mb-6 md:w-full">
                      <label htmlFor="nim" className="mb-2 text-sm ml-2">
                        NIM
                      </label>
                      <input
                        type="number"
                        className="w-full p-3 py-2 border border-gray-300 rounded-md"
                        value={data.nim}
                        disabled
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <label htmlFor="nim" className="mb-2 text-sm ml-2">
                        Pembimbing 1
                      </label>
                      <ReactSelect
                        options={options}
                        value={{
                          value: data.pembimbing1,
                          label: data.pembimbing1,
                        }}
                        onChange={(e) => {
                          setData({ ...data, pembimbing1: e.value });
                        }}
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <label htmlFor="nim" className="mb-2 text-sm ml-2">
                        Pembimbing 2
                      </label>
                      <ReactSelect
                        options={options}
                        value={{
                          value: data.pembimbing2,
                          label: data.pembimbing2,
                        }}
                        onChange={(e) => {
                          setData({ ...data, pembimbing2: e.value });
                        }}
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <label htmlFor="nim" className="mb-2 text-sm ml-2">
                        Penguji
                      </label>
                      <ReactSelect
                        options={options}
                        value={{
                          value: data.penguji,
                          label: data.penguji,
                        }}
                        onChange={(e) => {
                          setData({ ...data, penguji: e.value });
                        }}
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <label htmlFor="nim" className="mb-2 text-sm ml-2">
                        Judul Skripsi
                      </label>
                      <input
                        type="text"
                        className="w-full p-3 py-2 border border-gray-300 rounded-md"
                        value={data.judul_skripsi}
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
                        Ubah Data Skripsi
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
export default EditDataSkripsi;
