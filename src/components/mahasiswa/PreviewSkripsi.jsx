import React, { useState, useEffect } from "react";
import { Spinner } from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PreviewSkripsi = () => {
  const Navigate = useNavigate();
  const [pdfURL, setPdfURL] = useState("");
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const getUrlSkripsi = async () => {
      try {
        const token = localStorage.getItem("token");
        const id = window.location.pathname.split("/")[3];
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const res = await axios.get(
          `${backendUrl}/api/mahasiswa/get-url-skripsi/${id}`,
          config
        );
        setPdfURL(res.data.data);
        setLoading(true);
      } catch (error) {
        Navigate("/mhs/dashboard");
      }
    };
    getUrlSkripsi();
  }, []);

  return !loading ? (
    <div className="flex justify-center items-center h-screen">
      <Spinner className="h-12 w-12" color="amber" />
    </div>
  ) : (
    <div>
      {pdfURL && (
        <iframe
          src={`${pdfURL}#toolbar=0`}
          width="100%"
          height="1000px"
         />
      )}
    </div>
  );
};

PreviewSkripsi.propTypes = {};

export default PreviewSkripsi;
