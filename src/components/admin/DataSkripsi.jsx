import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";
import NavbarAdmin from "./template/NavbarAdmin";
import { Spinner } from "@material-tailwind/react";
import FooterAdmin from "./template/FooterAdmin";
import DataSkripsiTable from "./DataSkripsiTable";

const DataSkripsi = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const UploadDataSkripsi = () => {
    Swal.fire({
      title: "Upload Data Skripsi",
      html: `<div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="file" class="text-sm">File Excel</label>
          <input type="file" id="file" class="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex flex-col gap-2">
          <a href="#" class="text-blue-500">Download Template</a>
        </div>
      </div>`,
      showCancelButton: true,
      confirmButtonText: "Upload",
      cancelButtonText: "Batal",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const file = Swal.getPopup().querySelector("#file").files[0];
        if (!file) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "File tidak boleh kosong",
            timer: 1000,
          });
          return false;
        }
        Swal.fire({
          title: "Loading Data",
          text: "Please wait ...",
          showConfirmButton: false,
          allowOutsideClick: false,
          willOpen: () => {
            Swal.showLoading();
          },
        });
        const formData = new FormData();
        formData.append("file", file);
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${backendUrl}/api/admin/upload-data-skripsi`, formData, config)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil diupload",
              timer: 1000,
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: err.response.data.message,
              timer: 1000,
            });
          });
      },
    });
  };

  const deleteSkripsi = (id) => {
    Swal.close();
    Swal.fire({
      title: "Loading Data",
      text: "Please wait ...",
      showConfirmButton: false,
      allowOutsideClick: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .delete(`${backendUrl}/api/admin/delete-skripsi/${id}`, config)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil dihapus",
          timer: 1000,
        }).then(() => {
          window.location.reload();
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Data gagal dihapus",
        });
      });
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(`${backendUrl}/api/admin/get-all-skripsi`, config)
      .then((res) => {
        const newData = res.data.data.map((item, index) => ({
          ...item,
          no: index + 1,
        }));
        setData(newData);
        setLoading(true);
      })
      .catch((err) => {
        Navigate("/login-admin");
        Swal.close();
      });
  }, [backendUrl, useNavigate]);

  const columns = useMemo(
    () => [
      {
        accessorKey: "no",
        header: "No",
        size: 50,
      },
      {
        accessorKey: "nim",
        header: "NIM",
        size: 50,
      },
      {
        accessorKey: "nama",
        header: "Nama",
        size: 150,
      },
      {
        accessorKey: "jurusan",
        header: "Jurusan",
        size: 150,
      },
      {
        accessorKey: "pembimbing1",
        header: "Pembimbing 1",
        size: 150,
      },
      {
        accessorKey: "pembimbing2",
        header: "Pembimbing 2",
        size: 150,
      },
      {
        accessorKey: "penguji",
        header: "Penguji",
        size: 150,
      },
      {
        accessorKey: "judul_skripsi",
        header: "Judul Skripsi",
        size: 150,
      },
      {
        header: "Action",
        size: 150,
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() =>
                Navigate(`/admin/edit-data-skripsi/${row.original.id}`)
              }
              className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaPencilAlt />
            </button>
            <span className="mx-2" />
            <button
              onClick={() => {
                Swal.fire({
                  title: "Anda Yakin?",
                  text: "Data yang dihapus tidak dapat dikembalikan!",
                  icon: "warning",
                  showCancelButton: true,
                  confirmButtonColor: "#3085d6",
                  cancelButtonColor: "#d33",
                  confirmButtonText: "Ya, Hapus!",
                }).then((result) => {
                  if (result.isConfirmed) {
                    deleteSkripsi(row.original.id);
                  }
                });
              }}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center"
            >
              <FaRegTrashAlt />
            </button>
          </div>
        ),
      },
    ],
    []
  );

  const table = useMaterialReactTable({
    columns,
    data,
  });

  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <div className="bg-gray-100 w-full min-h-screen">
      <NavbarAdmin />
      <div className="container mx-auto mt-8">
        <section>
          <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-2">
            <div className="w-full space-y-8 px-10 bg-white py-10">
              <div>
                <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                  Data Skripsi
                </h2>
              </div>
              <div className="flex justify-start">
                <button
                  onClick={() => Navigate("/admin/tambah-data-skripsi")}
                  className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  Tambah Data Skripsi
                </button>
                <button
                  onClick={UploadDataSkripsi}
                  className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded inline-flex items-center ml-4"
                >
                  Upload Data
                </button>
              </div>

              <div className="flex flex-col">
                <MaterialReactTable table={table} />
              </div>
            </div>
          </div>
          <DataSkripsiTable />
        </section>
        <section>
          <FooterAdmin />
        </section>
      </div>
    </div>
  );
};

export default DataSkripsi;
