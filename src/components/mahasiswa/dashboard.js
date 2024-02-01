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
} from "@material-tailwind/react";
import { ArrowRightIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";
import { Spinner } from "@material-tailwind/react";
import Navbar from "./template/Navbar";
import { faker } from "@faker-js/faker";
import Swal from "sweetalert2";
const MhsDashboard = () => {
  // state Hooks
  const [showMenu, setShowMenu] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [jurusan, setJurusan] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [data, setData] = useState([]);
  const [status_kelulusan, setStatusKelulusan] = useState("");
  const [perPage] = useState(6);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  // Variable
  const backendUrl = process.env.REACT_APP_API_URL;
  const Navigate = useNavigate();

  // methods
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
  const handlePageClick = (data) => {
    const selectedPage = data.selected;
    setCurrentPage(selectedPage);
  };
  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };
  // const fetchData = async () => {
  //   const data = [];
  //   for (let i = 0; i < 2000; i++) {
  //     data.push({
  //       id: i,
  //       nama: faker.animal.cat(),
  //       jurusan: faker.company.name(),
  //       judul_skripsi: faker.location.country(),
  //     });
  //   }
  //   setData(data);
  //   setLoading(true);
  // };
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
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await axios.get(
        `${backendUrl}/api/mahasiswa/get-skripsi/${jurusan}`,
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
    console.log(status_kelulusan);
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
            className=" text-black flex items-center align-middle text-bold font-bold uppercase text-start hover:text-yellow-300 transition duration-300"
            onClick={() => Navigate(`/mhs/detail-skripsi/${item.id}`)}
          >
            {item.judul_skripsi}
          </button>
        </div>
        <div className="flex">
          <div className="text-sm">
            <p className="text-gray-600 text-start">Oleh {item.nama}</p>
            <p className="text-gray-600 text-start">
              Program Studi {item.jurusan}
            </p>
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
    <div className="bg-gray-100 w-full min-h-screen">
      <Navbar
        status_kelulusan={status_kelulusan}
        showMenuToggle={showMenuToggle}
        showMenu={showMenu}
        toggleDropdown={toggleDropdown}
        dropdownVisible={dropdownVisible}
      />
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
                  outline={false}
                  placeholder="Cari Judul Skripsi"
                  label="Cari Judul Skripsi"
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                  }}
                />
              </div>
              <div className="mt-6 flex items-start">
                <div>
                  <Button onClick={openDrawer}>Filter Data</Button>
                  <Drawer open={open} onClose={closeDrawer} className="p-4">
                    <div className="mb-6 flex items-center justify-between">
                      <Typography variant="h5" color="blue-gray">
                        Filter Data
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
                        Filter Jurusan
                      </Typography>
                      <Select
                        color="yellow"
                        size="regular"
                        outline={false}
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
                      <Button
                        color="yellow"
                        size="regular"
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
                        color="yellow"
                        size="regular"
                        outline={false}
                        placeholder="Tanggal Awal"
                        label="Tanggal Awal"
                        onChange={(e) => {
                          setTanggalAwal(e.target.value);
                        }}
                      />
                      s.d.
                      <Input
                        type="date"
                        color="yellow"
                        size="regular"
                        outline={false}
                        placeholder="Tanggal Akhir"
                        label="Tanggal Akhir"
                        onChange={(e) => {
                          setTanggalAkhir(e.target.value);
                        }}
                      />
                      <Button
                        color="yellow"
                        className="mb-8 mt-2"
                        size="regular"
                        onClick={getSkripsiByDate}
                      >
                        Cari
                      </Button>
                    </div>
                    <div className="flex flex-col gap-4 mt-8">
                      <Button
                        color="yellow"
                        size="regular"
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
      <div className="flex justify-center bg-gray-100">
        <p className="text-center text-gray-500 text-xs">
          &copy;2023 FEB UNDANA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default MhsDashboard;
