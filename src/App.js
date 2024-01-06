import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginMhs from "./components/mahasiswa/auth/login-mhs";
import RegisterMahasiswa from "./components/mahasiswa/auth/register-mhs";
import LoginAdmin from "./components/admin/auth/loginAdmin";
import Dashboard from "./components/mahasiswa/dashboard";
import UploadSkripsi from "./components/mahasiswa/uploadSkripsi";
import DetailSkripsi from "./components/mahasiswa/detailSkripsi";
import ProfileMahasiswa from "./components/mahasiswa/profileMahasiswa";
import { useNavigate } from "react-router-dom";
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
          <Route path="/mhs/dashboard" element={<Dashboard />} />
          <Route path="/mhs/profile" element={<ProfileMahasiswa />} />
          <Route path="/mhs/upload-skripsi" element={<UploadSkripsi />} />
          <Route path="/mhs/detail-skripsi/:id" element={<DetailSkripsi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
