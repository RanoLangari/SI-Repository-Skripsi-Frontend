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

const DataDosen = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const Navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const tambahDataDosen = () => {
    Swal.fire({
      title: "Tambah Data Dosen",
      html: `<div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="nama" class="text-sm">Nama Dosen</label>
          <input type="text" id="nama" class="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex flex-col gap-2">
          <label for="jurusan" class="text-sm">Jurusan</label>
          <select id="jurusan" class="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
          <option value="">Pilih Jurusan</option>
            <option value="Manajemen">Manajemen</option>
            <option value="Akuntansi">Akuntansi</option>
            <option value="Ekonomi Pembangunan">Ekonomi Pembangunan</option>
          </select>
        </div>
      </div>`,
      showCancelButton: true,
      confirmButtonText: "Simpan",
      cancelButtonText: "Batal",
      showLoaderOnConfirm: true,
      preConfirm: () => {
        const nama = Swal.getPopup().querySelector("#nama").value;
        const jurusan = Swal.getPopup().querySelector("#jurusan").value;
        if (nama === "" || jurusan === "") {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "Data tidak boleh kosong",
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
        const data = {
          nama: nama,
          jurusan: jurusan,
        };
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        axios
          .post(`${backendUrl}/api/admin/add-dosen`, data, config)
          .then((res) => {
            Swal.fire({
              icon: "success",
              title: "Berhasil",
              text: "Data berhasil ditambahkan",
              timer: 1000,
            }).then(() => {
              window.location.reload();
            });
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Gagal",
              text: "Data gagal ditambahkan",
              timer: 1000,
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  const UploadDataDosen = () => {
    Swal.fire({
      title: "Upload Data Dosen",
      html: `<div class="flex flex-col gap-4">
        <div class="flex flex-col gap-2">
          <label for="file" class="text-sm">File Excel</label>
          <input type="file" id="file" class="shadow appearance-none border rounded w-full py-2 px-2 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
        </div>
        <div class="flex flex-col gap-2">
          <a href="../template-upload-dosen.xlsx" download class="text-blue-500">Download Template Excel</a>
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
        if (!file.name.includes(".xls") && !file.name.includes(".xlsx")) {
          Swal.fire({
            icon: "error",
            title: "Gagal",
            text: "File harus berformat .xls atau .xlsx",
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
            "Content-Type": "multipart/form-data",
          },
        };
        axios
          .post(`${backendUrl}/api/admin/import-excel-dosen`, formData, config)
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
              timer: 3000,
            });
          });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    });
  };
  const deleteDosen = (id) => {
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
      .delete(`${backendUrl}/api/admin/delete-dosen/${id}`, config)
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
      .get(`${backendUrl}/api/admin/get-dosen`, config)
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
        accessorKey: "nama",
        header: "Nama Dosen",
        size: 150,
      },
      {
        accessorKey: "jurusan",
        header: "Jurusan",
        size: 150,
      },
      {
        header: "Action",
        size: 150,
        Cell: ({ row }) => (
          <div>
            <button
              onClick={() => {
                Swal.fire({
                  title: "Edit Data Dosen",
                  html: `<div class="flex flex-col gap-4">
                  <div class="flex flex-col gap-2">
                    <label for="nama" class="text-sm">Nama Dosen</label>
                    <input type="text" id="nama" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" value="${
                      row.original.nama
                    }">
                  </div>
                  <div class="flex flex-col gap-2">
                    <label for="jurusan" class="text-sm">Jurusan</label>
                    <select id="jurusan" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                      <option value="Manajemen" ${
                        row.original.jurusan === "Manajemen" ? "selected" : ""
                      }>Manajemen</option>
                      <option value="Akuntansi" ${
                        row.original.jurusan === "Akuntansi" ? "selected" : ""
                      }>Akuntansi</option>
                      <option value="Ekonomi Pembangunan" ${
                        row.original.jurusan === "Ekonomi Pembangunan"
                          ? "selected"
                          : ""
                      }>Ekonomi Pembangunan</option>
                    </select>
                  </div>
                </div>`,
                  showCancelButton: true,
                  confirmButtonText: "Simpan",
                  cancelButtonText: "Batal",
                  showLoaderOnConfirm: true,
                  preConfirm: () => {
                    const nama = Swal.getPopup().querySelector("#nama").value;
                    const jurusan =
                      Swal.getPopup().querySelector("#jurusan").value;
                    const data = {
                      nama: nama,
                      jurusan: jurusan,
                    };
                    const token = localStorage.getItem("token");
                    const config = {
                      headers: {
                        Authorization: `Bearer ${token}`,
                      },
                    };
                    Swal.fire({
                      title: "Loading Data",
                      text: "Please wait ...",
                      showConfirmButton: false,
                      allowOutsideClick: false,
                      willOpen: () => {
                        Swal.showLoading();
                      },
                    });
                    axios
                      .put(
                        `${backendUrl}/api/admin/edit-dosen/${row.original.id}`,
                        data,
                        config
                      )
                      .then((res) => {
                        Swal.close();
                        Swal.fire({
                          icon: "success",
                          title: "Berhasil",
                          text: "Data berhasil diubah",
                          timer: 1000,
                        }).then(() => {
                          window.location.reload();
                        });
                      })
                      .catch((err) => {
                        Swal.close();
                        Swal.fire({
                          icon: "error",
                          title: "Gagal",
                          text: "Data gagal diubah",
                          timer: 1000,
                        });
                      });
                  },
                  allowOutsideClick: () => !Swal.isLoading(),
                });
              }}
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
                    deleteDosen(row.original.id);
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
                <h2 className="mt-6 text-center text-4xl font-extrabold text-gray-900">
                  Data Dosen
                </h2>
              </div>
              <div className="flex justify-start">
                <div className="flex flex-row gap-4">
                  <button
                    onClick={tambahDataDosen}
                    className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                  >
                    Tambah Data Dosen
                  </button>
                </div>
                <button
                  onClick={UploadDataDosen}
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
        </section>
        <section>
          <FooterAdmin />
        </section>
      </div>
    </div>
  );
};

export default DataDosen;
