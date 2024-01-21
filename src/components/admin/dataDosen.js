import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Dialog,
  Card,
  CardBody,
  CardFooter,
  Typography,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import axios from "axios";
import Swal from "sweetalert2";
import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { FaPencilAlt, FaRegTrashAlt } from "react-icons/fa";

const DataDosen = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const Navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen((cur) => !cur);

  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const addDosen = () => {
    handleOpen();
    console.log("add dosen");
    const data = {
      nama: document.getElementById("namaDosen").value,
      jurusan: document.getElementById("jurusanDosen").value,
    };
    if (data.nama === "") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Nama Dosen tidak boleh kosong",
      });
      return;
    }
    if (data.jurusan === "") {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: "Jurusan tidak boleh kosong",
      });
      return;
    }
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
        });
        window.location.reload();
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Data gagal ditambahkan",
        });
      });
  };

  const deleteDosen = (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .put(`${backendUrl}/api/admin/delete-dosen/${id}`, {}, config)
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: "Data berhasil dihapus",
        });
        window.location.reload();
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
      // set number column
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
            {/* button edit */}
            <button
              onClick={() => {
                //  modal edit
                Swal.fire({
                  title: "Edit Data Dosen",
                  html: `<div class="flex flex-col gap-4">
                  <div class="flex flex-col gap-2">
                    <label for="nama" class="text-sm">Nama Dosen</label>
                    <input type="text" id="nama" class="text-sm border rounded-md px-2 py-1" value="${
                      row.original.nama
                    }">
                  </div>
                  <div class="flex flex-col gap-2">
                    <label for="jurusan" class="text-sm">Jurusan</label>
                    <select id="jurusan" class="text-sm border rounded-md px-2 py-1">
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
                    axios
                      .put(
                        `${backendUrl}/api/admin/edit-dosen/${row.original.id}`,
                        data,
                        config
                      )
                      .then((res) => {
                        Swal.fire({
                          icon: "success",
                          title: "Berhasil",
                          text: "Data berhasil diubah",
                        });
                        window.location.reload();
                      })
                      .catch((err) => {
                        Swal.fire({
                          icon: "error",
                          title: "Gagal",
                          text: "Data gagal diubah",
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
      <nav className="bg-white shadow-lg">
        <div className="max-w-6xl mx-auto px-4">
          <div className="flex justify-between">
            {/* set logo FEB.png */}
            <div className="flex space-x-7">
              <div>
                {/* image icon */}
                <a href="#" className="flex items-center py-4">
                  <span className="font-semibold text-gray-500 text-lg">
                    Sistem Informasi Repository Skripsi
                  </span>
                </a>
              </div>
              {/* primary navbar items */}
              <div className="hidden md:flex items-center space-x-1">
                <a
                  href="/admin/dashboard"
                  className="py-4 px-5 text-gray-500 font-semibold hover:text-yellow-200 transition duration-300"
                >
                  Beranda
                </a>
                <a
                  className="py-4 px-2 text-yellow-300 border-b-4 border-yellow-300 font-semibold"
                  href="/admin/dosen"
                >
                  Dosen
                </a>
              </div>
            </div>
            {/* secondary navbar items */}
            <div className="hidden md:flex items-center space-x-3 ">
              {/* dropdown profile list item */}
              <div className="flex flex-col md:flex-row items-center md:space-x-3 ">
                <div className="relative inline-block text-left">
                  <div>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
                      id="options-menu"
                      aria-haspopup="true"
                      aria-expanded="true"
                      onClick={toggleDropdown}
                    >
                      <span>Profile</span>
                      {/* chevron down icon */}
                      <svg
                        className="w-5 h-5 ml-2 -mr-1"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        {/* chevron down icon */}
                        <path
                          fillRule="evenodd"
                          d="M6.293 6.293a1 1 0 011.414 0L10
                          8.586l2.293-2.293a1 1 0 111.414 1.414l-3
                          3a1 1 0 01-1.414 0l-3-3a1 1 0
                          010-1.414z"
                          clipRule="evenodd"
                        ></path>
                      </svg>
                    </button>
                  </div>
                  {/* dropdown profile items */}
                  <div
                    className={`origin-top-right absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none ${
                      dropdownVisible ? "block" : "hidden"
                    }`}
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="options-menu"
                  >
                    <div className="py-1" role="none">
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-300 hover:text-white transition duration-300 w-full text-left"
                        role="menuitem"
                        onClick={() => Navigate("/admin/profile")}
                      >
                        Profile
                      </button>
                      <button
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-yellow-300 hover:text-white transition duration-300 w-full text-left"
                        role="menuitem"
                        onClick={() => {
                          localStorage.removeItem("token");
                          Navigate("/login-admin");
                        }}
                      >
                        Log out
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                className="outline-none mobile-menu-button"
                onClick={showMenuToggle}
              >
                <svg
                  className="w-6 h-6 text-gray-500 hover:text-yellow-300"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  {showMenu ? (
                    <path d="M6 18L18 6M6 6l12 12"></path>
                  ) : (
                    <path d="M4 6h16M4 12h16M4 18h16"></path>
                  )}
                </svg>
              </button>
            </div>
          </div>
          {/* mobile menu */}
          {showMenu && (
            <div className="md:hidden mt-2">
              <a
                onClick={() => Navigate("/admin/dashboard")}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Beranda
              </a>
              <a
                onClick={() => Navigate("/admin/dosen")}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Dosen
              </a>

              <a
                onClick={() => Navigate("/admin/profile")}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Profile
              </a>
              <a
                onClick={() => {
                  localStorage.removeItem("token");
                  Navigate("/login-mhs");
                }}
                className="block py-2 px-4 text-sm text-gray-500 hover:bg-yellow-300 hover:text-white transition duration-300"
              >
                Log out
              </a>
            </div>
          )}
        </div>
      </nav>
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
                <Button onClick={handleOpen}>Tambah Dosen</Button>
                <Dialog
                  size="xs"
                  open={open}
                  handler={handleOpen}
                  className="bg-transparent shadow-none"
                >
                  <Card className="mx-auto w-full max-w-[24rem]">
                    <CardBody className="flex flex-col gap-4">
                      <Typography
                        variant="h4"
                        color="blue-gray"
                        className="flex justify-center"
                      >
                        Tambah Data Dosen
                      </Typography>
                      <Typography className="-mb-2" variant="h6">
                        Nama Dosen
                      </Typography>
                      <Input
                        label="Nama Dosen"
                        size="lg"
                        required
                        id="namaDosen"
                        type="text"
                      />
                      <Typography className="-mb-2" variant="h6">
                        Jurusan
                      </Typography>
                      <Select
                        size="regular"
                        outline={false}
                        placeholder="Jurusan"
                        className="text-sm"
                        label="Pilih Jurusan"
                        required
                        id="jurusanDosen"
                      >
                        <Option value={"Manajemen"}>Manajemen</Option>
                        <Option value={"Akuntansi"}>Akuntansi</Option>
                        <Option value={"Ekonomi Pembangunan"}>
                          Ekonomi Pembangunan
                        </Option>
                      </Select>
                    </CardBody>
                    <CardFooter className="pt-0">
                      <Button
                        variant="gradient"
                        type="submit"
                        fullWidth
                        onClick={addDosen}
                      >
                        Tambah
                      </Button>
                    </CardFooter>
                  </Card>
                </Dialog>
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
          &copy;2023 FEB UNDANA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default DataDosen;
