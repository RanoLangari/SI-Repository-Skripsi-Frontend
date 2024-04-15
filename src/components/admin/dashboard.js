import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useMemo } from "react";
import {
  MaterialReactTable,
  createMRTColumnHelper,
  useMaterialReactTable,
} from "material-react-table";
import { Box, Button } from "@mui/material";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import { FaEye } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";
import Navbar from "./template/Navbar";
import { mkConfig, generateCsv, download } from "export-to-csv";
const columnHelper = createMRTColumnHelper();

const AdminDashboard = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const Navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [dataSkripsiProses, setDataSkripsiProses] = useState([]);
  const [dataSkripsiVerified, setDataSkripsiVerified] = useState([]);
  const [loading, setLoading] = useState(false);
  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };
  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${backendUrl}/api/admin/get-skripsi-process`, config)
      .then((res) => {
        setDataSkripsiProses(res.data.data);
        setLoading(true);
      })
      .catch((err) => {
        Navigate("/login-admin");
      });
  }, []);
  useEffect(() => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios
      .get(`${backendUrl}/api/admin/get-mahasiswa-skripsi-verified`, config)
      .then((res) => {
        setDataSkripsiVerified(res.data.data);
        setLoading(true);
      })
      .catch((err) => {
        Navigate("/login-admin");
      });
  }, []);

  const columnsSkripsiProses = useMemo(
    () => [
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
        accessorKey: "skripsi.judul_skripsi",
        header: "Judul Skripsi",
        size: 200,
      },
      {
        accessorKey: "jurusan",
        header: "Jurusan",
        size: 150,
      },
      {
        accessorKey: "skripsi.status",
        header: "status",
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
    ],
    []
  );

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

  const csvConfig = mkConfig({
    fieldSeparator: ",",
    decimalSeparator: ".",
    useKeysAsHeaders: true,
  });

  const handleExportData = () => {
    const csv = generateCsv(csvConfig)(dataSkripsiVerified);
    download(csvConfig)(csv);
  };

  const tableSkripsiProses = useMaterialReactTable({
    columns: columnsSkripsiProses,
    data: dataSkripsiProses,
  });

  const tableSkripsiVerified = useMaterialReactTable({
    columns: columnsSkripsiVerified,
    data: dataSkripsiVerified,
    columnFilterDisplayMode: "popover",
    paginationDisplayMode: "pages",
    positionToolbarAlertBanner: "bottom",
    renderTopToolbarCustomActions: ({ table }) => (
      <Box
        sx={{
          display: "flex",
          gap: "16px",
          padding: "8px",
          flexWrap: "wrap",
        }}
      >
        <Button
          //export all data that is currently in the table (ignore pagination, sorting, filtering, etc.)
          onClick={handleExportData}
          startIcon={<FileDownloadIcon />}
        >
          Export All Data
        </Button>
      </Box>
    ),
  });

  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <div>
      <Navbar
        showMenu={showMenu}
        toggleDropdown={toggleDropdown}
        dropdownVisible={dropdownVisible}
        showMenuToggle={showMenuToggle}
      />
      <div>
        <section>
          <div className="flex justify-center bg-gray-100 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                  Beranda Admin
                </h2>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-2">
            <div className=" w-full space-y-8 px-10">
              <div>
                <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                  Data Skripsi yang Belum Terkonfirmasi
                </h2>
              </div>
              <div className="flex flex-col ext-center text-xl font-extrabold text-gray-900 px-10">
                <MaterialReactTable table={tableSkripsiProses} />
              </div>
            </div>
          </div>
          <div className="flex justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-2">
            <div className=" w-full space-y-8 px-10">
              <div>
                <h2 className="mt-6 text-center text-xl font-extrabold text-gray-900">
                  Data Skripsi yang telah Terkonfirmasi
                </h2>
              </div>
              <div className="flex flex-col ext-center text-xl font-extrabold text-gray-900 px-10">
                <MaterialReactTable table={tableSkripsiVerified} />
              </div>
            </div>
          </div>
        </section>
      </div>
      <div className="flex justify-center items-center h-24 bg-gray-100">
        <p className="text-center text-gray-500 text-xs">
          &copy;2024 FEB UNDANA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
