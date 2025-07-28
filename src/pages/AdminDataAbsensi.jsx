import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { formatDateTime, formatDate } from "../utils/date";

export default function AdminDataAbsensi() {
    const API_ENDPOINT = import.meta.env.VITE_API_URL;
    const getToken = localStorage.getItem('token');
    const navigate = useNavigate();

    const [absensi, setAbsensi] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filterTanggal, setFilterTanggal] = useState("");

    useEffect(() => {
        fetchAbsensi();
    }, []);

    //Get Data absensi
    const fetchAbsensi = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/absensi`, {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                },
            });

            setAbsensi(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Data absensi gagal di load:", error);
            setLoading(false);
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Data Absensi</h2>
            <input
                type="date"
                className="border px-3 py-2 rounded-md mb-2"
                value={filterTanggal}
                onChange={(e) => setFilterTanggal(e.target.value)}
            />

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full table-auto border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Tanggal</th>
                            <th className="border px-4 py-2">Waktu</th>
                            <th className="border px-4 py-2">Status</th>
                            <th className="border px-4 py-2">Karyawan</th>
                        </tr>
                    </thead>
                    <tbody>
                        {absensi.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            absensi
                                .filter((item) => {
                                    const tanggalItem = item.tanggal.split("T")[0];
                                    const matchTanggal = filterTanggal === "" || tanggalItem === filterTanggal;

                                    return matchTanggal;
                                })
                                .map((item, index) => (
                                    <tr key={item.id} className="hover:bg-gray-50">
                                        <td className="border px-4 py-2 text-center">{index + 1}</td>
                                        <td className="border px-4 py-2">{formatDate(item.tanggal)}</td>
                                        <td className="border px-4 py-2">{formatDateTime(item.waktu)}</td>
                                        <td className="border px-4 py-2">{item.status}</td>
                                        <td className="border px-4 py-2">{item.karyawan.nama}</td>
                                    </tr>
                                ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}