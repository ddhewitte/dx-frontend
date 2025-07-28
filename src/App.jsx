import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import DashboardAdmin from "./pages/DashboardAdmin";
import DashboardUser from "./pages/DashboardUser";
import AuthLogout from "./services/AuthLogout";
import GuardRoute from './components/GuardRoute';
import AdminHome from "./pages/AdminHome";
import AdminDataKaryawan from "./pages/AdminDataKaryawan";
import AdminDataAbsensi from "./pages/AdminDataAbsensi";

export default function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}></Route>

        <Route path="/admin" element={
           <GuardRoute allowedRole="ADMIN">
              <DashboardAdmin />
           </GuardRoute>
          }>
            <Route index element={<AdminHome />} />
            <Route path="karyawan" element={<AdminDataKaryawan />} />
            <Route path="absensi" element={<AdminDataAbsensi />} />
        </Route>

        <Route path="/user" element={
          <GuardRoute allowedRole="USER">
              <DashboardUser />
           </GuardRoute>
        } />
        <Route path="/logout" element={<AuthLogout />} />
      </Routes>
    </BrowserRouter>
  )
}