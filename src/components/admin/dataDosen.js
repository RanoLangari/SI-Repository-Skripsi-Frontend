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
import Navbar from "./template/Navbar";

const DataDosen = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const Navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState([]);
  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
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
      .get(`${backendUrl}/api/admin/check-login`, config)
      .then((res) => {
        Swal.close();
      })
      .catch((err) => {
        Navigate("/login-admin");
        Swal.close();
      });
  }, []);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get(`${backendUrl}/api/admin/get-dosen`, config).then((res) => {
      setData(res.data.data);
      for (let i = 0; i < res.data.data.length; i++) {
        res.data.data[i].no = i + 1;
      }
    });
  }, []);

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
            <span className="mx-2"></span>
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

  return (
    <div className="bg-gray-100 w-full min-h-screen">
      <Navbar
        showMenu={showMenu}
        showMenuToggle={showMenuToggle}
        toggleDropdown={toggleDropdown}
        dropdownVisible={dropdownVisible}
      />
      <div className="bg-gray-100 p-10">
        <section>
          <div className="flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-2">
            <div className=" w-full space-y-8 px-10">
              <div>
                <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                  Data Dosen
                </h2>
              </div>
              <div className="flex justify-start">
                <button
                  onClick={() => {
                    Swal.fire({
                      title: "Tambah Data Dosen",
                      html: `<div class="flex flex-col gap-4">
                      <div class="flex flex-col gap-2">
                        <label for="nama" class="text-sm">Nama Dosen</label>
                        <input type="text" id="nama" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
                      </div>
                      <div class="flex flex-col gap-2">
                        <label for="jurusan" class="text-sm">Jurusan</label>
                        <select id="jurusan" class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline">
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
                        const nama =
                          Swal.getPopup().querySelector("#nama").value;
                        const jurusan =
                          Swal.getPopup().querySelector("#jurusan").value;
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
                          .post(
                            `${backendUrl}/api/admin/add-dosen`,
                            data,
                            config
                          )
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
                  }}
                  className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded inline-flex items-center"
                >
                  Tambah Data Dosen
                </button>
              </div>

              <div className="flex flex-col">
                <MaterialReactTable table={table} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex justify-center bg-gray-100 mb-10">
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 FEB UNDANA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default DataDosen;
