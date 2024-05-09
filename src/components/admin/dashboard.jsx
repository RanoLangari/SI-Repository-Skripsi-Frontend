import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
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
  const [loading, setLoading] = useState(true);
  const chartConfigBar = {
    type: "bar",
    height: 240,
    series: [
      {
        name: "Sales",
        data: [50, 40, 300, 320, 500, 350, 200, 230, 500],
      },
    ],
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
      colors: ["#020617"],
      plotOptions: {
        bar: {
          columnWidth: "40%",
          borderRadius: 2,
        },
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "Apr",
          "May",
          "Jun",
          "Jul",
          "Aug",
          "Sep",
          "Oct",
          "Nov",
          "Dec",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };
  const chartConfig = {
    type: "pie",
    width: 280,
    height: 280,
    series: [44, 55, 13, 43, 22],
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
    },
  };
  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <div className="flex flex-col w-full min-h-screen bg-gray-100">
      <NavbarAdminTemplate />
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
                  Pie Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Visualize your data in a simple way using the
                  @material-tailwind/react chart plugin.
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
          <Card className="mt-8">
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
                  Pie Chart
                </Typography>
                <Typography
                  variant="small"
                  color="gray"
                  className="max-w-sm font-normal"
                >
                  Visualize your data in a simple way using the
                  @material-tailwind/react chart plugin.
                </Typography>
              </div>
            </CardHeader>
            <CardBody className="mt-4 grid place-items-center px-2">
              <Chart {...chartConfig} />
            </CardBody>
          </Card>
        </section>
      </div>
      <section>
        <FooterAdmin />
      </section>
    </div>
  );
};

export default AdminDashboard;
