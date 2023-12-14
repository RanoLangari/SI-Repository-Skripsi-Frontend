import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginMhs from "./components/mahasiswa/auth/login-mhs";
import RegisterMahasiswa from "./components/mahasiswa/auth/register-mhs";
import LoginAdmin from "./components/admin/auth/loginAdmin";
import Dashboard from "./components/mahasiswa/dashboard";
import UploadSkripsi from "./components/mahasiswa/uploadSkripsi";
import "./index.css";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login-mhs" element={<LoginMhs />} />
          <Route path="/login-admin" element={<LoginAdmin />} />
          <Route path="/register-mhs" element={<RegisterMahasiswa />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/upload-skripsi" element={<UploadSkripsi />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
