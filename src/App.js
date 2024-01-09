import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginMhs from "./components/mahasiswa/auth/login-mhs";
import RegisterMahasiswa from "./components/mahasiswa/auth/register-mhs";
import LoginAdmin from "./components/admin/auth/loginAdmin";
import MhsDashboard from "./components/mahasiswa/dashboard";
import UploadSkripsi from "./components/mahasiswa/uploadSkripsi";
import DetailSkripsi from "./components/mahasiswa/detailSkripsi";
import ProfileMahasiswa from "./components/mahasiswa/profileMahasiswa";
import AdminDashboard from "./components/admin/dashboard";
import DataSkripsi from "./components/admin/dataSkripsi";
import ProfileAdmin from "./components/admin/profileAdmin";
import "./index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginMhs />} />
          <Route path="/login-mhs" element={<LoginMhs />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/register-mhs" element={<RegisterMahasiswa />} />
          <Route path="/mhs/dashboard" element={<MhsDashboard />} />
          <Route path="/mhs/profile" element={<ProfileMahasiswa />} />
          <Route path="/mhs/upload-skripsi" element={<UploadSkripsi />} />
          <Route path="/mhs/detail-skripsi/:id" element={<DetailSkripsi />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/data-skripsi" element={<DataSkripsi />} />
          <Route path="/admin/profile" element={<ProfileAdmin />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
