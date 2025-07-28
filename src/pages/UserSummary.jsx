import { useEffect, useState } from "react";
import axios from "axios";

const API_ENDPOINT = import.meta.env.VITE_API_URL;

const UserSummary = () => {
  const getUser = localStorage.getItem("userId");
  const getToken = localStorage.getItem("token");

  const [karyawanId, setKaryawanId] = useState(null);
  const [absensi, setAbsensi] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAbsensi = async (id) => {
    try {
      const response = await axios.get(`${API_ENDPOINT}/absensi/${id}`, {
        headers: {
          Authorization: `Bearer ${getToken}`,
        },
      });
      setAbsensi(response.data.data);
      console.log("RESPON ABSENSI:", response.data);
    } catch (error) {
      console.error("Gagal ambil data absensi:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchKaryawan = async () => {
    try {
      const res = await axios.get(`${API_ENDPOINT}/karyawan/user/${getUser}`, {
        headers: { Authorization: `Bearer ${getToken}` },
      });
      const id = res.data?.data?.id;
      setKaryawanId(id);
      if (id) fetchAbsensi(id);
    } catch (err) {
      console.error("Gagal ambil karyawan:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKaryawan();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">Absensi Saya</h2>

      <table className="table-auto w-full text-left border border-collapse">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 border">Tanggal</th>
            <th className="p-2 border">Waktu</th>
            <th className="p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          {absensi.length === 0 ? (
            <tr>
              <td colSpan={3} className="p-4 text-center">
                Belum ada data absensi.
              </td>
            </tr>
          ) : (
            absensi.map((a) => (
              <tr key={a.id}>
                <td className="p-2 border">
                  {new Date(a.tanggal).toLocaleDateString()}
                </td>
                <td className="p-2 border">
                  {new Date(a.waktu).toLocaleTimeString()}
                </td>
                <td className="p-2 border">{a.status}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserSummary;