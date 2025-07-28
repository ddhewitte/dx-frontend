import { useEffect, useState } from "react";
import axios from "axios";

const API_ENDPOINT = 'http://localhost:3000';
const getToken = localStorage.getItem('token');

export default function AdminDataKaryawan() {
    const [karyawan, setKaryawan] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchKaryawan();
    }, []);

    //Get Data Karyawan
    const fetchKaryawan = async () => {
        try {
            const response = await axios.get(`${API_ENDPOINT}/karyawan`, {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                },
            });

            setKaryawan(response.data.data);
            setLoading(false);
        } catch (error) {
            console.error("Data karyawan gagal di load:", error);
            setLoading(false);
        }
    };

    //Delete Data Karyawan
    const handleDelete = async (id) => {
        const konfirmasi = window.confirm("Yakin ingin menghapus data karyawan ini?");
        if (!konfirmasi) return;

        try {
            const response = await axios.delete(`${API_ENDPOINT}/karyawan/${id}`, {
                headers: {
                    Authorization: `Bearer ${getToken}`,
                },
            });
            setKaryawan(prev => prev.filter(k => k.id !== id));
        } catch (error) {
            console.error("Gagal menghapus data karyawan:", error);
            alert("Gagal menghapus data karyawan.");
        }
    };

    return (
        <div className="p-4 bg-white rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Data Karyawan</h2>

            {loading ? (
                <p>Loading...</p>
            ) : (
                <table className="w-full table-auto border border-gray-200">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="border px-4 py-2">#</th>
                            <th className="border px-4 py-2">Nama</th>
                            <th className="border px-4 py-2">Email</th>
                            <th className="border px-4 py-2">No. HP</th>
                            <th className="border px-4 py-2">Jabatan</th>
                            <th className="border px-4 py-2">Foto</th>
                            <th className="border px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {karyawan.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center py-4">
                                    Tidak ada data
                                </td>
                            </tr>
                        ) : (
                            karyawan.map((item, index) => (
                                <tr key={item.id} className="hover:bg-gray-50">
                                    <td className="border px-4 py-2 text-center">{index + 1}</td>
                                    <td className="border px-4 py-2">{item.nama}</td>
                                    <td className="border px-4 py-2">{item.email}</td>
                                    <td className="border px-4 py-2">{item.no_handphone}</td>
                                    <td className="border px-4 py-2">{item.jabatan}</td>
                                    <td className="border px-4 py-2 text-center">
                                        {item.foto ? (
                                            <img
                                                src={item.foto}
                                                alt={item.nama}
                                                className="h-12 w-12 rounded-full object-cover mx-auto"
                                            />
                                        ) : (
                                            <span className="text-gray-400 italic">-</span>
                                        )}
                                    </td>
                                    <td className="border px-4 py-2 text-center space-x-2">
                                        <button
                                            onClick={() => handleEdit(item.id)}
                                            className="bg-yellow-500 text-white px-2 py-1 text-sm rounded hover:bg-yellow-600"
                                        >
                                            Ubah
                                        </button>
                                        <button
                                            onClick={() => handleDelete(item.id)}
                                            className="bg-red-500 text-white px-2 py-1 text-sm rounded hover:bg-red-600"
                                        >
                                            Hapus
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}