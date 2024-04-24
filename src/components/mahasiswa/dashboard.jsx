import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ReactPaginate from "react-paginate";
import axios from "axios";
import {
  Button,
  Input,
  Select,
  Option,
  Drawer,
  Typography,
  IconButton,
  Spinner,
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import NavbarMahasiswaTemplate from "./template/Navbar";
import Footer from "./template/Footer";
const MhsDashboard = () => {
  // state Hooks
  const [searchTerm, setSearchTerm] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [peminatan, setPeminatan] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [data, setData] = useState([]);
  const [status_kelulusan, setStatusKelulusan] = useState("");
  const [perPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  // Variable
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const Navigate = useNavigate();
  const peminatanByJurusan = {
    "Ekonomi Pembangunan": [
      "Keuangan Daerah",
      "Perencanaan Pembangunan",
      "Moneter Perbankan",
    ],
    Manajemen: [
      "Manajemen Keuangan",
      "Manajemen Sumberdaya Manusia",
      "Manajemen Pemasaran",
    ],
    Akuntansi: [
      "Akuntansi Keuangan",
      "Akuntansi Sektor Publik",
      "Akuntansi Manajemen",
    ],
  };

  // methods
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };
  const fetchData = async () => {
    try {
      setLoading(false);
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await axios.get(
        `${backendUrl}/api/mahasiswa/profile`,
        config
      );
      if (response.status === 200) {
        const res = await axios.get(
          `${backendUrl}/api/mahasiswa/get-skripsi`,
          config
        );
        setData(res.data.data);
        setStatusKelulusan(response.data.data.status_kelulusan);
        setLoading(true);
      }
    } catch (err) {
      Navigate("/login-mhs");
    }
  };
  const getSkripsiByJurusan = async () => {
    try {
      setLoading(false);
      const token = localStorage.getItem("token");
      const data = {
        jurusan,
        peminatan,
      };
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.post(
        `${backendUrl}/api/mahasiswa/get-skripsi-jurusan`,
        data,
        config
      );
      if (response.status === 200) {
        setData(response.data.data);
        setLoading(true);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getSkripsiByDate = async () => {
    try {
      setLoading(false);
      if (tanggalAwal === "" || tanggalAkhir === "") {
        alert("Tanggal Awal dan Tanggal Akhir Harus Diisi");
        return;
      }

      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${backendUrl}/api/mahasiswa/get-skripsi-date?tanggal_awal=${tanggalAwal}&tanggal_akhir=${tanggalAkhir}`,
        config
      );
      if (response.status === 200) {
        setData(response.data.data);
        setLoading(true);
      }
    } catch (error) {
      setData([]);
      setLoading(true);
    }
  };

  // filter data
  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    )
  );
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const query = {};
    for (let param of params) {
      query[param[0]] = param[1];
    }
    if (query.nama) {
      setSearchTerm(query.nama);
    } else if (query.jurusan) {
      setSearchTerm(query.jurusan);
    } else if (query.peminatan) {
      setSearchTerm(query.peminatan);
    }

    fetchData();
  }, []);

  // pagination
  const indexOfLastItem = (currentPage + 1) * perPage;
  const indexOfFirstItem = indexOfLastItem - perPage;
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // skripsi item component
  const SkripsiItem = ({ item }) => (
    <div className="w-full lg:max-w-full lg:flex mt-10 rounded-lg shadow-xl">
      <div className="h-20 lg:h-auto lg:w-48 flex-none bg-cover rounded-t lg:rounded-t-none lg:rounded-l text-center overflow-hidden rounded-lg">
        <img src="../FEB.png" alt="" className="mx-auto mb-4" />
      </div>
      <div className="bg-white rounded-b lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
        <div className="mb-8">
          <button
            className=" text-black flex items-center align-middle text-bold font-bold uppercase text-start hover:text-yellow-300 transition duration-300 text-sm"
            onClick={() => Navigate(`/mhs/detail-skripsi/${item.id}`)}
          >
            {item.judul_skripsi}
          </button>
        </div>
        <div className="flex">
          <div className="text-sm text-left col-span-2">
            <div className="col-span-2">
              <a
                className="text-gray-600 hover:text-yellow-300 text-start"
                href={`dashboard?nama=${item.nama}`}
              >
                Oleh {item.nama}
              </a>
            </div>
            <div className="col-span-2">
              <a
                className="text-gray-600 hover:text-yellow-300 text-start"
                href={`dashboard?jurusan=${item.jurusan}`}
              >
                Jurusan {item.jurusan}
              </a>
            </div>
            <div className="col-span-2">
              <a
                className="text-gray-600 hover:text-yellow-300 text-start"
                href={`dashboard?peminatan=${item.peminatan}`}
              >
                Peminatan {item.peminatan}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <div className="bg-gray-100 w-full ">
      <NavbarMahasiswaTemplate status_kelulusan={status_kelulusan} />
      <section className="bg-gray-100 py-20">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-2xl font-semibold text-left">
            Masukan Judul Skripsi
          </h2>
          <div className="flex items-center mt-6">
            <div className="w-full">
              <div className="relative">
                <Input
                  color="yellow"
                  outline="false"
                  placeholder="Cari Judul Skripsi"
                  label="Cari Judul Skripsi"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
              <div className="mt-6 flex items-start">
                <div>
                  <Button onClick={openDrawer}>Filter Skripsi</Button>
                  <Drawer open={open} onClose={closeDrawer} className="p-4">
                    <div className="mb-6 flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray">
                        Filter Skripsi
                      </Typography>
                      <IconButton onClick={closeDrawer}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6 text-gray-500 hover:text-yellow-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </IconButton>
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                      <Typography variant="h6" color="blue-gray">
                        Filter Jurusan dan Peminatan
                      </Typography>
                      <Select
                        color="yellow"
                        size="md"
                        outline="false"
                        placeholder="Pilih Jurusan"
                        label="Pilih Jurusan"
                        onChange={(e) => {
                          setJurusan(e);
                        }}
                      >
                        <Option value="Akuntansi">Akuntansi</Option>
                        <Option value="Manajemen">Manajemen</Option>
                        <Option value="Ekonomi Pembangunan">
                          Ekonomi Pembangunan
                        </Option>
                      </Select>
                      <Select
                        color="yellow"
                        size="md"
                        outline="false"
                        placeholder="Pilih Peminatan"
                        label="Pilih Peminatan"
                        onChange={(e) => {
                          setPeminatan(e);
                        }}
                        {...(jurusan === "" && { disabled: true })}
                      >
                        {jurusan &&
                          peminatanByJurusan[jurusan].map((item, index) => (
                            <Option key={index} value={item}>
                              {item}
                            </Option>
                          ))}
                      </Select>
                      <Button
                        color="amber"
                        size="md"
                        className="mb-8"
                        onClick={
                          jurusan === ""
                            ? getSkripsiByJurusan
                            : () => {
                                setSearchTerm("");
                                setJurusan("");
                                getSkripsiByJurusan();
                                closeDrawer();
                              }
                        }
                      >
                        Cari
                      </Button>
                    </div>
                    <div className="flex flex-col gap-2 mt-8">
                      <Typography variant="h6" color="blue-gray">
                        Filter Tanggal
                      </Typography>
                      <Input
                        type="date"
                        color="amber"
                        size="md"
                        outline="false"
                        placeholder="Tanggal Awal"
                        label="Tanggal Awal"
                        onChange={(e) => {
                          setTanggalAwal(e.target.value);
                        }}
                      />
                      s.d.
                      <Input
                        type="date"
                        color="amber"
                        size="md"
                        outline="false"
                        placeholder="Tanggal Akhir"
                        label="Tanggal Akhir"
                        onChange={(e) => {
                          setTanggalAkhir(e.target.value);
                        }}
                      />
                      <Button
                        color="amber"
                        className="mb-8 mt-2"
                        size="md"
                        onClick={getSkripsiByDate}
                      >
                        Cari
                      </Button>
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                      <Button
                        color="amber"
                        size="md"
                        onClick={() => {
                          setSearchTerm("");
                          setJurusan("");
                          setTanggalAwal("");
                          setTanggalAkhir("");
                          fetchData();
                          closeDrawer();
                        }}
                      >
                        Clear Filter
                      </Button>
                    </div>
                  </Drawer>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-100 py-12">
            <div className="max-w-6xl mx-auto px-4">
              <h2 className="text-3xl font-semibold text-center">
                Daftar Skripsi
              </h2>
            </div>
          </div>

          <div className="container mx-auto px-4">
            <div className="p-10 bg-white rounded shadow-xl">
              {currentItems.length === 0 ? (
                <div className="flex justify-center items-center h-20">
                  <p className="text-2xl text-gray-500">Data Tidak Ditemukan</p>
                </div>
              ) : (
                currentItems.map((item, index) => (
                  <SkripsiItem key={index} item={item} />
                ))
              )}
            </div>
            {filteredData.length > 6 && (
              <ReactPaginate
                previousLabel={
                  <Button variant="text" className="flex items-center gap-2">
                    <ArrowLeftIcon strokeWidth={2} className="h-4 w-4" />{" "}
                    Previous
                  </Button>
                }
                nextLabel={
                  <Button variant="text" className="flex items-center gap-2">
                    Next <ArrowRightIcon strokeWidth={2} className="h-4 w-4" />
                  </Button>
                }
                pageCount={Math.ceil(filteredData.length / perPage)}
                onPageChange={handlePageClick}
                containerClassName={
                  "flex items-center justify-center gap-2 mt-4"
                }
                pageClassName={
                  "flex items-center justify-center h-8 w-8 hover:bg-yellow-300 hover:text-white"
                }
                activeClassName={"bg-yellow-300 text-white"}
                previousClassName={
                  "flex items-center justify-center h-8 w-8 mr-14"
                }
                nextClassName={"flex items-center justify-center h-8 w-8 ml-10"}
              />
            )}
          </div>
        </div>
      </section>
      <section>
        <Footer/>
      </section>
    </div>
  );
};

export default MhsDashboard;