import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";

export default function UserAbsensi() {
  const API_ENDPOINT = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");
  const userId = parseInt(localStorage.getItem("userId"));
  
  const [karyawanId, setKaryawanId] = useState(null);
  const [statusHariIni, setStatusHariIni] = useState({});

  const today = dayjs().format("YYYY-MM-DD");

  // --- ambil status localStorage ---
  const loadLocalStatus = () => {
    const data = JSON.parse(localStorage.getItem("absensiStatus") || "{}");
    return data[today] || {};
  };

  // --- simpan status ke localStorage ---
  const saveLocalStatus = (status) => {
    const all = JSON.parse(localStorage.getItem("absensiStatus") || "{}");
    const existing = all[today] || {};
    all[today] = { ...existing, [status]: true };
    localStorage.setItem("absensiStatus", JSON.stringify(all));
    setStatusHariIni(all[today]);
  };

  // --- ambil karyawanId berdasarkan userId ---
  const fetchKaryawan = async () => {
    try {
      const res = await axios.get(`${API_ENDPOINT}/karyawan/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setKaryawanId(res.data?.data?.id);
    } catch (err) {
      console.error("Gagal ambil karyawan:", err);
    }
  };

  useEffect(() => {
    fetchKaryawan();
    setStatusHariIni(loadLocalStatus());
  }, []);

  const handleAbsen = async (status) => {
    const currentStatus = loadLocalStatus();

    if (currentStatus[status]) {
      alert(`Kamu sudah absen ${status} hari ini!`);
      return;
    }

    const now = new Date().toISOString();

    try {
      await axios.post(
        `${API_ENDPOINT}/absensi`,
        {
          tanggal: now,
          waktu: now,
          status,
          karyawanId,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      saveLocalStatus(status);
      alert(`Absen ${status} berhasil!`);
    } catch (err) {
      console.error("Gagal absen:", err);
      alert("Gagal absen");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 mt-10 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-4 text-center">Absensi Hari Ini</h2>

      <div className="flex flex-col gap-4">
        <button
          onClick={() => handleAbsen("MASUK")}
          disabled={statusHariIni.MASUK}
          className={`py-2 px-4 rounded ${
            statusHariIni.MASUK
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
        >
          {statusHariIni.MASUK ? "Sudah Absen Masuk" : "Absen Masuk"}
        </button>

        <button
          onClick={() => handleAbsen("PULANG")}
          disabled={statusHariIni.PULANG}
          className={`py-2 px-4 rounded ${
            statusHariIni.PULANG
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-green-600 text-white hover:bg-green-700"
          }`}
        >
          {statusHariIni.PULANG ? "Sudah Absen Pulang" : "Absen Pulang"}
        </button>
      </div>
    </div>
  );
}
