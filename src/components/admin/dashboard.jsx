import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import axios from "axios";
import NavbarAdminTemplate from "./template/NavbarAdmin";
import FooterAdmin from "./template/FooterAdmin";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [dataChart, setDataChart] = useState([]);
  const [dataSkripsi, setDataSkripsi] = useState([]);
  const [mhsJurusan, setMhsJurusan] = useState([]);
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await axios.get(
          `${backendUrl}/api/admin/get-data-mhs-for-chart`,
          config
        );
        setDataChart(Object.values(response.data.data.dataMhsSkripsi));
        setDataSkripsi(Object.values(response.data.data.dataSkripsi));
        setMhsJurusan(Object.values(response.data.data.dataMhsJurusan));
        setLoading(true);
      } catch (error) {
        navigate("/login-admin");
      }
    };
    fetchData();
  }, []);
  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: dataChart,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
      labels: [
        "Total Mahasiswa",
        "Total Mahasiswa Yang Telah Lulus",
        "Total Mahasiswa Yang Belum Lulus",
      ],
    },
  };
  const chartSkripsiConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: dataSkripsi,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
      labels: [
        "Total Skripsi",
        "Total Skripsi Yang telah Diajukan Admin Dan Belum DIajukan Oleh Mahasiswa",
        "Total Skripsi Yang Ditolak Admin",
        "Total Skripsi Yang Menunggu Verifikasi Admin",
        "Total Skripsi Yang Telah Terverifikasi",
      ],
    },
  };

  const chartJurusanConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: mhsJurusan,
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: "",
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617", "#ff8f00", "#00897b", "#1e88e5", "#d81b60"],
      legend: {
        show: false,
      },
      labels: [
        "Total Mahasiswa Akuntansi",
        "Total Mahasiswa Manajemen",
        "Total Mahasiswa Ekonomi Pembangunan",
      ],
    },
  };
  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <>
      <div className="flex flex-col w-full min-h-screen bg-gray-100">
        <NavbarAdminTemplate />
        <div className="container mx-auto">
          <section>
            <div className="flex justify-center py-12 px-4 sm:px-6 lg:px-8">
              <div className="max-w-md w-full space-y-8">
                <div>
                  <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Halaman Beranda Operator
                  </h2>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 items-center">
              <Card>
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                >
                  <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                    <Square3Stack3DIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Chart Mahasiswa Berdasarkan Kelulusan
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="max-w-sm font-normal"
                    >
                      Rekap data Mahasiswa Yang Ada Dalam Sistem
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody className="mt-4 grid place-items-center px-2">
                  <Chart {...chartConfig} />
                </CardBody>
              </Card>
              <Card>
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                >
                  <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                    <Square3Stack3DIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Chart Skripsi
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="max-w-sm font-normal"
                    >
                      Rekap Data Skripsi Yang Ada Dalam Sistem
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody className="mt-4 grid place-items-center px-2">
                  <Chart {...chartSkripsiConfig} />
                </CardBody>
              </Card>
              <Card>
                <CardHeader
                  floated={false}
                  shadow={false}
                  color="transparent"
                  className="flex flex-col gap-4 rounded-none md:flex-row md:items-center"
                >
                  <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
                    <Square3Stack3DIcon className="h-6 w-6" />
                  </div>
                  <div>
                    <Typography variant="h6" color="blue-gray">
                      Chart Mahasiswa Berdasarkan Jurusan
                    </Typography>
                    <Typography
                      variant="small"
                      color="gray"
                      className="max-w-sm font-normal"
                    >
                      Rekap Data Mahasiswa Berdasarkan Jurusan Yang Ada Dalam
                      Sistem
                    </Typography>
                  </div>
                </CardHeader>
                <CardBody className="mt-4 grid place-items-center px-2">
                  <Chart {...chartJurusanConfig} />
                </CardBody>
              </Card>
            </div>
          </section>
        </div>
      </div>
      <FooterAdmin />
    </>
  );
};

export default AdminDashboard;
