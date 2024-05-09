// Import komponen dan halaman
import { Routes, Route } from "react-router-dom";
import NotFound from "../components/NotFound";

// Import Komponen Mahasiswa
import LoginMhs from "../components/mahasiswa/auth/login-mhs";
import LupaPassword from "../components/mahasiswa/auth/lupa-password";
import MhsDashboard from "../components/mahasiswa/dashboard";
import ProfileMahasiswa from "../components/mahasiswa/profileMahasiswa";
import UploadSkripsi from "../components/mahasiswa/uploadSkripsi";
import DetailSkripsi from "../components/mahasiswa/detailSkripsi";
import PreviewSkripsi from "../components/mahasiswa/PreviewSkripsi";

// Import Komponen Admin
import LoginAdmin from "../components/admin/auth/loginAdmin";
import LupaPasswordAdmin from "../components/admin/auth/lupa-password";
import AdminDashboard from "../components/admin/dashboard";
import ProfileAdmin from "../components/admin/profileAdmin";
import DetailDataSkripsi from "../components/admin/detailDataSkripsi";
import DataDosen from "../components/admin/dataDosen";
import PreviewSkripsiAdmin from "../components/admin/PreviewSkripsiAdmin";
import DataMahasiswa from "../components/admin/DataMahasiswa";
import DataSkripsi from "../components/admin/DataSkripsi";
import TambahDataSkripsi from "../components/admin/TambahDataSkripsi";
import EditDataSkripsi from "../components/admin/EditDataSkripsi";
const AppRoutes = () => {
  return (
    <Routes>
      {/* Rute Umum */}
      <Route path="*" element={<NotFound />} />

      {/* Rute Mahasiswa */}
      <Route path="/" element={<LoginMhs />} />
      <Route path="/login-mhs" element={<LoginMhs />} />
      <Route path="/mhs/lupa-password" element={<LupaPassword />} />
      <Route path="/mhs/dashboard" element={<MhsDashboard />} />
      <Route path="/mhs/profile" element={<ProfileMahasiswa />} />
      <Route path="/mhs/upload-skripsi" element={<UploadSkripsi />} />
      <Route path="/mhs/detail-skripsi/:id" element={<DetailSkripsi />} />
      <Route path="/mhs/preview/:id" element={<PreviewSkripsi />} />

      {/* Rute Admin */}
      <Route path="/login-admin" element={<LoginAdmin />} />
      <Route path="/admin/lupa-password" element={<LupaPasswordAdmin />} />
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/profile" element={<ProfileAdmin />} />
      <Route path="/admin/detail-skripsi/:id" element={<DetailDataSkripsi />} />
      <Route path="/admin/dosen" element={<DataDosen />} />
      <Route path="/admin/data-mhs" element={<DataMahasiswa />} />
      <Route path="/admin/data-skripsi" element={<DataSkripsi />} />
      <Route path="/admin/preview/:id" element={<PreviewSkripsiAdmin />} />
      <Route
        path="/admin/tambah-data-skripsi"
        element={<TambahDataSkripsi />}
      />
      <Route
        path="/admin/edit-data-skripsi/:id"
        element={<EditDataSkripsi />}
      />
    </Routes>
  );
};

export default AppRoutes;
