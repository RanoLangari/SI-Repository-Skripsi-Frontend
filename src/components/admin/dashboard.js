import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaEye } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";
import NavbarAdminTemplate from "./template/NavbarAdmin";
import CustomMaterialTable from "../CustomMaterialTable";
import { fetchSkripsiData } from "../../services/adminDataServices";
import { createMRTColumnHelper } from "material-react-table";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [dataSkripsiProses, setDataSkripsiProses] = useState([]);
  const [dataSkripsiVerified, setDataSkripsiVerified] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const columnHelper = createMRTColumnHelper();
  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const dataProses = await fetchSkripsiData(
          process.env.REACT_APP_API_URL,
          "get-skripsi-process",
          token
        );
        const dataVerified = await fetchSkripsiData(
          process.env.REACT_APP_API_URL,
          "get-mahasiswa-skripsi-verified",
          token
        );
        setDataSkripsiProses(dataProses);
        setDataSkripsiVerified(dataVerified);
        setLoading(true);
      } catch (error) {
        navigate("/login-admin");
      }
    };
    fetchData();
  }, [navigate]);

  // Define columns for CustomMaterialTable
  const columnsSkripsiProses = [
    {
      accessorKey: "nim",
      header: "NIM",
      size: 150,
    },
    {
      accessorKey: "nama",
      header: "Nama Mahasiswa",
      size: 150,
    },
    {
      accessorKey: "judul",
      header: "Judul Skripsi",
      size: 200,
    },
    {
      accessorKey: "jurusan",
      header: "Jurusan",
      size: 150,
    },
    {
      accessorKey: "status",
      header: "Status",
      size: 150,
    },
    {
      header: "Action",
      size: 150,
      Cell: ({ row }) => (
        <div>
          <button
            onClick={() => {
              window.location.href = `/admin/detail-skripsi/${row.original.id}`;
            }}
            className="bg-yellow-300 hover:bg-yellow-400 text-white font-bold py-2 px-4 rounded inline-flex items-center"
          >
            <FaEye />
          </button>
        </div>
      ),
    },
  ];
  // Similar to previous implementation but using CustomMaterialTable
  const columnsSkripsiVerified = [
    columnHelper.accessor("nama", {
      header: "Nama Mahasiswa",
      size: 40,
    }),
    columnHelper.accessor("jurusan", {
      header: "Jurusan",
      size: 120,
    }),
    columnHelper.accessor("nim", {
      header: "NIM",
      size: 120,
    }),
    columnHelper.accessor("semester", {
      header: "Semester",
      size: 60,
    }),
    columnHelper.accessor("judul_skripsi", {
      header: "Judul Skripsi",
      size: 220,
    }),
    columnHelper.accessor("pembimbing1", {
      header: "Pembimbing 1",
      size: 220,
    }),
    columnHelper.accessor("pembimbing2", {
      header: "Pembimbing 2",
      size: 220,
    }),
    columnHelper.accessor("penguji", {
      header: "Penguji",
      size: 220,
    }),
  ];
  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <div className="bg-gray-100">
      <NavbarAdminTemplate
      />
      <div className="container mx-auto">
      <section>
          <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Beranda Admin
                </h2>
              </div>
            </div>
          </div>
        </section>
        <section className="bg-white">
          <div className="items-center px-10 py-10">
            <div className=" w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900 mt-8">
                  Data Skripsi yang Belum Terkonfirmasi
                </h2>
              </div>
              <div className="flex flex-col ext-center text-xl font-extrabold text-gray-900">
                <CustomMaterialTable
                  columns={columnsSkripsiProses}
                  data={dataSkripsiProses}
                />
              </div>
            </div>
          </div>
          <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-2">
            <div className=" w-full space-y-8 px-10">
              <div>
                <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                  Data Skripsi yang telah Terkonfirmasi
                </h2>
              </div>
              <div className="flex flex-col ext-center text-xl font-extrabold text-gray-900">
                <CustomMaterialTable
                  columns={columnsSkripsiVerified}
                  data={dataSkripsiVerified}
                />
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminDashboard;
