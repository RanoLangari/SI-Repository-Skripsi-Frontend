import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NotFound from "./components/NotFound";
import LoginMhs from "./components/mahasiswa/auth/login-mhs";
import RegisterMahasiswa from "./components/mahasiswa/auth/register-mhs";
import LoginAdmin from "./components/admin/auth/loginAdmin";
import MhsDashboard from "./components/mahasiswa/dashboard";
import UploadSkripsi from "./components/mahasiswa/uploadSkripsi";
import DetailSkripsi from "./components/mahasiswa/detailSkripsi";
import ProfileMahasiswa from "./components/mahasiswa/profileMahasiswa";
import AdminDashboard from "./components/admin/dashboard";
import ProfileAdmin from "./components/admin/profileAdmin";
import DetailDataSkripsi from "./components/admin/detailDataSkripsi";
import DataDosen from "./components/admin/dataDosen";
import LupaPassword from "./components/mahasiswa/auth/lupa-password";
import LupaPasswordAdmin from "./components/admin/auth/lupa-password";
import "./index.css";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LoginMhs />} />
          <Route path="/login-mhs" element={<LoginMhs />} />
          <Route path="/mhs/lupa-password" element={<LupaPassword />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/admin/lupa-password" element={<LupaPasswordAdmin />} />
          <Route path="/register-mhs" element={<RegisterMahasiswa />} />
          <Route path="/mhs/dashboard" element={<MhsDashboard />} />
          <Route path="/mhs/profile" element={<ProfileMahasiswa />} />
          <Route path="/mhs/upload-skripsi" element={<UploadSkripsi />} />
          <Route path="/mhs/detail-skripsi/:id" element={<DetailSkripsi />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/profile" element={<ProfileAdmin />} />
          <Route
            path="/admin/detail-skripsi/:id"
            element={<DetailDataSkripsi />}
          />
          <Route path="/admin/dosen" element={<DataDosen />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
