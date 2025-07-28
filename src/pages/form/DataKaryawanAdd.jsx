import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function DataKaryawanAdd() {

    const API_ENDPOINT = import.meta.env.VITE_API_URL;
    const getToken = localStorage.getItem('token');
    const navigate = useNavigate();

    const [form, setForm] = useState({
        nama: "",
        email: "",
        no_handphone: "",
        jabatan: "",
        userId: "",
    });

    //for user
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const res = await axios.get(API_ENDPOINT+"/auth/users", {
                    headers: {
                        Authorization: `Bearer ${getToken}`,
                    },
                });
                setUsers(res.data.data);
            } catch (error) {
                console.error("Gagal mengambil user", error);
            }
        };

        fetchUsers();
    }, []);


    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setForm({
            ...form,
            [name]: files ? files[0] : value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const dataSend = {
                ...form,
                userId: Number(form.userId),
            };

            await axios.post(API_ENDPOINT+"/karyawan", dataSend, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    Authorization: `Bearer ${getToken}`,
                },
            });

            alert("Data karyawan berhasil ditambahkan!");
            navigate("/admin/karyawan");
        } catch (err) {
            console.error(err);
            alert("Gagal menambahkan data karyawan.");
        }
    };

    return (
        <div className="p-4 bg-white rounded-xl shadow">
            <h2 className="text-xl font-bold mb-4">Tambah Data Karyawan</h2>

            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block font-semibold">Nama</label>
                    <input
                        type="text"
                        name="nama"
                        value={form.nama}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Email</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">No HP</label>
                    <input
                        type="text"
                        name="no_handphone"
                        value={form.no_handphone}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    />
                </div>

                <div>
                    <label className="block font-semibold">Jabatan</label>
                    <select
                        name="jabatan"
                        value={form.jabatan}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">-- Pilih Jabatan --</option>
                        <option value="STAFF">STAFF</option>
                        <option value="HRD">SUPERVISOR</option>
                        <option value="MANAGER">MANAGER</option>
                        <option value="MANAGER">DIREKSI</option>
                    </select>
                </div>

                <div>
                    <label className="block font-semibold">User (Login terkait)</label>
                    <select
                        name="userId"
                        value={form.userId}
                        onChange={handleChange}
                        className="w-full border px-3 py-2 rounded"
                        required
                    >
                        <option value="">-- Pilih User --</option>
                        {users.map((user) => (
                        <option key={user.id} value={user.id}>
                            {user.user} ({user.role})
                        </option>
                        ))}
                    </select>
                    </div>

                <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                >
                    Simpan
                </button>
            </form>
        </div>
    );
}
