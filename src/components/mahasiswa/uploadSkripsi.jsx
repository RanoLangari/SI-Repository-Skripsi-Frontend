import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { Spinner } from "@material-tailwind/react";
import { Select, Textarea, Option, Input } from "@material-tailwind/react";
import Navbar from "./template/Navbar";
import Footer from "./template/Footer";

const UploadSkripsi = () => {
  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const Navigate = useNavigate();
  const [jurusan, setJurusan] = useState("");
  const [peminatan, setPeminatan] = useState("");
  const [abstract, setAbstract] = useState("");
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      if (!peminatan || !abstract) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "Data harus diisi",
          timer: 1000,
        });
        return;
      }

      if (!file) {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "File skripsi harus diisi",
          timer: 1000,
        });
        return;
      }
      if (file.type !== "application/pdf") {
        Swal.fire({
          icon: "error",
          title: "Gagal",
          text: "File skripsi harus berformat pdf",
          timer: 1000,
        });
        return;
      }
      Swal.fire({
        title: "Loading...",
        showConfirmButton: false,
        allowOutsideClick: false,
        timerProgressBar: true,
        didOpen: () => {
          Swal.showLoading();
        },
      });
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const formData = new FormData();
      formData.append("peminatan", peminatan);
      formData.append("abstract", abstract);
      formData.append("file", file);
      const res = await axios.post(
        `${backendUrl}/api/mahasiswa/upload-skripsi`,
        formData,
        config
      );
      Swal.close();
      if (res.status === 200) {
        Swal.fire({
          icon: "success",
          title: "Berhasil",
          text: res.data.message,
          timer: 1000,
        }).then(() => {
          Navigate("/mhs/dashboard");
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Gagal",
        text: error.response.data.message,
        timer: 1000,
      });
    }
  };
  const peminatanByJurusan = {
    "Ekonomi Pembangunan": [
      "Keuangan Daerah",
      "Perencanaan Pembangunan",
      "Moneter Perbankan",
    ],
    Manajemen: ["Keuangan", "Sumberdaya Manusia", "Pemasaran"],
    Akuntansi: ["Keuangan", "Sektor Publik", "Manajemen", "pajak", "Audit"],
  };

  const getProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const profileResponse = await axios.get(
        `${backendUrl}/api/mahasiswa/profile`,
        config
      );
      setData(profileResponse.data.data);
      setJurusan(profileResponse.data.data.jurusan);
      setLoading(true);
    } catch (error) {
      Navigate("/login-mhs");
    }
  };
  useEffect(() => {
    getProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <div className="bg-gray-100 w-full min-h-screen">
      <Navbar status_kelulusan={"Lulus"} />
      <div className="bg-gray-100 py-20 px-10">
        <div className="container mx-auto">
          <div className="bg-white dark:bg-gray-800 lg:w-1/2 mx-auto rounded-lg shadow">
            <div className="max-w-md mx-auto rounded-lg overflow-hidden md:max-w-lg ">
              <div className="md:flex">
                <div className="w-full p-3 px-6 py-10">
                  <div className="text-center mb-4">
                    <h1 className="font-bold text-3xl text-gray-900">
                      Upload Skripsi
                    </h1>
                    <p>Upload Skripsi Anda Disini</p>
                  </div>
                  <form
                    className="mb-4 md:flex md:flex-wrap md:justify-between"
                    typeof="multipart/form-data"
                    onSubmit={handleUpload}
                  >
                    <div className="flex flex-col mb-6 md:w-full">
                      <Select
                        color="yellow"
                        size="md"
                        label="Pilih Peminatan"
                        outline="false"
                        placeholder="Pilih Peminatan"
                        onChange={(e) => setPeminatan(e)}
                      >
                        {peminatanByJurusan[jurusan].map((item) => (
                          <Option key={item} value={item}>
                            {item}
                          </Option>
                        ))}
                      </Select>
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <Textarea
                        color="yellow"
                        size="lg"
                        outline="false"
                        label="Abstrak"
                        onChange={(e) => setAbstract(e.target.value)}
                        required
                      />
                    </div>
                    <div className="flex flex-col mb-6 md:w-full">
                      <label
                        className="mb-2 font-bold text-sm text-gray-900 text-left"
                        htmlFor="file"
                      >
                        File Skripsi
                      </label>
                      <input
                        className="border py-2 px-3 text-gray-700 mb-4 md:mb-0 rounded-lg "
                        type="file"
                        name="file"
                        id="file"
                        placeholder="File Skripsi"
                        onChange={handleFileChange}
                      />
                    </div>
                    <div className="flex flex-col mb-4 md:w-full">
                      <button
                        className="block bg-yellow-300 hover:bg-yellow-400 py-2 px-4 mt-8 rounded-lg shadow-lg uppercase font-semibold ml-4 mr-4"
                        type="submit"
                      >
                        Upload
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <section>
          <Footer />
        </section>
      </div>
    </div>
  );
};
export default UploadSkripsi;
