import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { FaFilePdf } from "react-icons/fa";
import { Spinner } from "@material-tailwind/react";
import Navbar from "./template/Navbar";

const DetailSkripsi = () => {
  const backendUrl = process.env.REACT_APP_API_URL;
  const Navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [data, setData] = useState([]);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status_kelulusan, setStatusKelulusan] = useState("");

  const showMenuToggle = () => {
    setShowMenu(!showMenu);
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const id_mhs = window.location.pathname.split("/")[3];
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    axios.get(`${backendUrl}/api/mahasiswa/profile`, config).then((res) => {
      setStatusKelulusan(res.data.data.status_kelulusan);
    });
    axios
      .get(`${backendUrl}/api/mahasiswa/detail-skripsi/${id_mhs}`, config)
      .then((res) => {
        setData(res.data.data);
        setLoading(true);
      })
      .catch((err) => {
        Navigate("/mhs/dashboard");
      });
  }, []);

  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <div className="bg-gray-100 w-full min-h-screen">
      <Navbar
        status_kelulusan={status_kelulusan}
        showMenu={showMenu}
        toggleDropdown={toggleDropdown}
        dropdownVisible={dropdownVisible}
        showMenuToggle={showMenuToggle}
      />
      <section>
        <div className="flex flex-col items-center justify-center mt-10">
          <div className="flex flex-col w-full sm:w-2/8 md:w-3/4 lg:w-1/2 mt-10">
            <div className="flex flex-col items-center">
              <h1 className="text-2xl font-bold text-gray-700 mb-5">
                Detail Skripsi
              </h1>
            </div>
            <div className="flex flex-col bg-white shadow-md rounded my-2">
              <div className="flex flex-col justify-center p-5 border-b border-gray-100">
                <div className="flex flex-col">
                  <span className="text-lg font-bold">
                    {data.judul_skripsi}
                  </span>
                  <span className="text-sm text-black"> Oleh {data.nama}</span>
                </div>
              </div>
              <div className="flex flex-col px-10 py-5">
                <span className="text-sm text-black">Abstract</span>
                <br />
                <span className="text-sm text-black text-justify">
                  {data.abstract}
                </span>
              </div>
              <div className="flex flex-col px-10 py-5">
                <div className="flex flex-direction-row justify-content-space-between">
                  <div className="flex w-3/4 text-left flex-col">
                    <div className="flex flex-col">
                      <span className="text-sm text-black">
                        Pembimbing 1 :{" "}
                      </span>
                      <span className="text-sm text-black">
                        {data.pembimbing1}
                      </span>
                    </div>
                    <div className="flex flex-col mt-2">
                      <span className="text-sm text-black">
                        Pembimbing 2 :{" "}
                      </span>
                      <span className="text-sm text-black">
                        {data.pembimbing2}
                      </span>
                    </div>
                    <div className="flex flex-col mt-2">
                      <span className="text-sm text-black">Penguji : </span>
                      <span className="text-sm text-black">{data.penguji}</span>
                    </div>
                  </div>
                  <div className="flex w-1/2 justify-end items-end">
                    {" "}
                    <div className="flex flex-row items-center">
                      <a href={`${data.skripsi_url}`} target="_blank">
                        <FaFilePdf className="text-5xl text-red-400" />
                        <span className="text-sm text-black">Full View</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="flex flex-col items-center bg-gray-100">
        <p className="text-gray-500 text-xs">
          &copy;2023 FEB UNDANA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default DetailSkripsi;
